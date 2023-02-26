'use strict'

import configurations from "../partials/configurations.js";
import { getById } from "../helpers/dev.helper.js"
import Play from "./Play.js";
import Warnings from "./Warnings.js";

export default class Configurations {
    /**
     * Inicia o form de configurações.
     * 
     * @param {HTMLElement} element Elemento da div principal que vai receber o form.
     */
    constructor(element) {
        this.element = element;
        this.element.innerHTML = configurations;

        this.warnings_div = getById('warning');

        this._initListeners();
    }

    _initListeners() {
        // Sumir e aparecer div de segundos
        getById('switch_auto_raffle')
            .addEventListener('change', function () {
                let divInputSeconds = getById('seconds_to_raffle'),
                    inputSeconds = divInputSeconds.querySelector('#input_seconds');

                divInputSeconds.classList.add('d-none');
                inputSeconds.value = 0;

                if (this.checked) {
                    divInputSeconds.classList.remove('d-none');
                    inputSeconds.value = 30;
                }
            });

        // Iniciar o jogo
        getById('config_form')
            .addEventListener('submit', (event) => {
                event.preventDefault();

                Warnings.hide(this.warnings_div);

                const from = getById('input_from').value,
                    to = getById('input_to').value,
                    seconds = getById('input_seconds').value;

                try {
                    this._validateConfigs(from, to, seconds);

                    new Play(this.element, { from, to, seconds });
                } catch (e) {
                    Warnings.show(this.warnings_div, e);
                }
            });
    }

    /**
     * Valida as configurações só de meme.
     * 
     * @param {integer} from 
     * @param {integer} to 
     * @param {integer} seconds
     */
    _validateConfigs(from, to, seconds) {
        if (parseInt(to) < parseInt(from)) {
            throw 'O valor inicial precisa ser menor que o final.';
        }
        
        if (from < 0) {
            throw 'Subzero aqui não!';
        }

        if (to > 1000) {
            const messages = [
                'Tá de sacanagem, né?',
                'Que raio de cartela é isso?',
                'É muito. Não deixo não.'
            ];

            throw `${to}? ` + messages[Math.floor(Math.random() * messages.length)];
        }
        
        if (seconds > 60) {
            throw 'Tudo isso de tempo? Vai esperar pra sempre!';
        }
    }
}