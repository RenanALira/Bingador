'use strict'

import play from "../partials/play.js";
import { createElement, getById } from "../helpers/dev.helper.js";
import Configurations from "./Configurations.js";
import History from "./History.js";
import Timer from "./Timer.js";

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
        this.element = element;

        this.element.innerHTML = play;

        this.params = {
            from, to, seconds
        };

        this.numbers = this._generateNumbers();

        this.timer = false;

        this._init();
    }

    _init() {
        new History(getById('div_history'));

        this._createActionButtons();

        this._initListeners();
    }

    _createActionButtons() {
        getById('btn_start').innerText = this.params.seconds > 0 ? 'Começar' : 'Sortear';

        this._createBackButton();
    }

    _createBackButton() {
        getById('actions_div')
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
    }

    _initListeners() {
        getById('btn_start')
            .addEventListener('click', () => {
                if (this.params.seconds > 0) {
                    this._startAutomatic();
                } else {
                    this._raffleAndSplice(this.numbers);
                }
            });

        getById('btn_voltar')
            .addEventListener('click', ({ currentTarget }) => {
                currentTarget.remove();
                History.destroy();

                if (this.timer) {
                    this.timer.pause();
                }

                new Configurations(this.element);
            });
    }

    _startAutomatic() {
        const timerElement = getById('seconds');
        this.timer = new Timer(this.params.seconds, timerElement);

        getById('time_counter').classList.remove('d-none');

        this._raffleAndSplice(this.numbers);

        timerElement
            .addEventListener('timer.reset', () => {
                this._raffleAndSplice(this.numbers);
            });

        this.timer.play();
    }

    _raffleAndSplice(numbers) {
        if (numbers.length < 1) {
            alert('Todos os números foram sorteados');
            return;
        }

        const raffledIndex = Math.floor(Math.random() * numbers.length),
            raffledNumberDiv = getById('raffled_number');

        raffledNumberDiv.innerText = numbers[raffledIndex];

        History.addToHistory(numbers[raffledIndex]);

        numbers.splice(raffledIndex, 1);
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
}