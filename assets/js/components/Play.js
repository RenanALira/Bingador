'use strict'

import play from "../partials/play.js";
import { createElement, getById } from "../helpers/dev.helper.js";
import Configurations from "./Configurations.js";
import History from "./History.js";
import Timer from "./Timer.js";
import Warnings from "./Warnings.js";

export default class Play {
    /**
     * Inicia o jogo (perdi).
     * 
     * @param {HTMLElement} element Elemento da div principal que vai acontecer o jogo.
     * @param {Object} params Parâmetros de configuração do jogo.
     * @param {int} params.from Menor número do intervalo do sorteio.
     * @param {int} params.to Maior número do intervalo do sorteio.
     * @param {int|false} params.seconds Intervalo de segundos em que o sorteio deve acontecer, caso deva sortear automaticamente.
     */
    constructor(element, { from, to, seconds = false } = {}) {
        // Parâmetros de configuração
        this.element = element;
        this.params = {
            from, to, seconds
        };
        this.warnings_div = getById('warning');

        // Carrega o html
        this.element.innerHTML = play;

        // Propriedades do jogo
        this.isAutomatic = seconds > 0;
        this.numbers = this._generateNumbers();
        this.timer = false;

        this._init();
    }

    /**
     * Inicia as funções principais.
     */
    _init() {
        new History(getById('div_history'));

        // Se for automático, exibe e instancia o timer
        if (this.isAutomatic) {
            getById('seconds').innerText = this.params.seconds;
            getById('time_counter').classList.remove('d-none');

            this.timer = new Timer(this.params.seconds, getById('seconds'));
        }

        this._createActionButtons();
    }

    /**
     * Cria os botões de ação do jogo e da página.
     */
    _createActionButtons() {
        // Botões do jogo
        const gameActionsDiv = getById('div_game_actions');
        gameActionsDiv.append(this._createStartButton());

        if (this.isAutomatic) {
            gameActionsDiv.append(this._createPauseButton());
            gameActionsDiv.append(this._createStopButton());
        }

        // Botão de Voltar da página
        getById('div_page_actions')
            .prepend(
                createElement(
                    'button',
                    {
                        type: 'button',
                        innerText: 'Voltar',
                        classList: 'btn btn-secondary btn-sm me-2',
                        id: 'btn_voltar'
                    }
                )
            );

        this._initDefaultListeners();
    }

    /**
     * Cria o botão de start tanto manual quanto automático.
     * 
     * @returns HTMLElement
     */
    _createStartButton() {
        return createElement('button', {
            type: 'button',
            classList: 'btn btn-primary ms-2',
            id: 'btn_start',
            innerHTML: this.isAutomatic ? '<i class="bi bi-play-fill"></i>' : '<i class="bi bi-shuffle"></i>'
        });
    }

    /**
     * Cria o botão de pause.
     * 
     * @returns HTMLElement
     */
    _createPauseButton() {
        const pauseButton = createElement('button', {
            type: 'button',
            classList: 'btn btn-warning ms-2',
            id: 'btn_pause',
            innerHTML: '<i class="bi bi-pause-fill"></i>'
        });

        pauseButton.addEventListener('click', () => {
            this.timer.pause();
        });

        return pauseButton;
    }

    /**
     * Cria o botão de stop.
     * 
     * @returns HTMLElement
     */
    _createStopButton() {
        const stopButton = createElement('button', {
            type: 'button',
            classList: 'btn btn-danger ms-2',
            id: 'btn_stop',
            innerHTML: '<i class="bi bi-stop-fill"></i>'
        });

        stopButton.addEventListener('click', () => {
            this.timer.stop();
        });

        return stopButton;
    }

    /**
     * Inicia os listeners dos botões.
     */
    _initDefaultListeners() {
        getById('btn_restart')
            .addEventListener('click', () => {
                this._resetGame();
            });

        getById('btn_start')
            .addEventListener('click', () => {
                try {
                    this._validateRemainingNumbers();

                    if (this.isAutomatic) {
                        // O primeiro número deve ser sorteado instantaneamente
                        !this.timer.status && this._raffleAndSplice(this.numbers);

                        this.timer.play();

                        return;
                    }

                    this._raffleAndSplice(this.numbers);
                } catch (e) {
                    Warnings.show(this.warnings_div, e);
                }
            });

        getById('btn_voltar')
            .addEventListener('click', ({ currentTarget }) => {
                currentTarget.remove();
                History.destroy();
                Warnings.hide(this.warnings_div);

                this.timer && this.timer.stop();

                new Configurations(this.element);
            });

        getById('seconds')
            .addEventListener('timer.reset', () => {
                this._raffleAndSplice();
            });
    }

    /**
     * Gera o array de números a serem sorteados.
     * 
     * @returns array 
     */
    _generateNumbers() {
        let numbers = [],
            i;

        for (i = this.params.from; i <= this.params.to; i++) {
            numbers.push(i);
        }

        return numbers;
    }

    /**
     * Valida se todos os números já foram sorteados.
     */
    _validateRemainingNumbers() {
        if (this.numbers.length < 1) {
            this.timer && this.timer.stop();
            throw 'Todos os números já foram sorteados.';
        }
    }

    /**
     * Sorteia um número do array de números e remove seu índice para que não haja repetições.
     *
     * @returns void caso todos os números já tenham sido sorteados.
     */
    _raffleAndSplice() {
        try {
            this._validateRemainingNumbers();

            const raffledIndex = Math.floor(Math.random() * this.numbers.length),
                raffledNumberDiv = getById('raffled_number');

            raffledNumberDiv.innerText = this.numbers[raffledIndex];

            History.addToHistory(this.numbers[raffledIndex]);

            this.numbers.splice(raffledIndex, 1);
        } catch (e) {
            Warnings.show(this.warnings_div, e);
        }
    }

    /**
     * Reseta o sorteador;
     */
    _resetGame() {
        this.numbers = this._generateNumbers();

        getById('raffled_number').innerText = '_';

        this.timer && this.timer.stop();

        History.clear();
        Warnings.hide(this.warnings_div);
    }
}