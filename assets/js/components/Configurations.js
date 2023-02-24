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
        // Iniciar o jogo
        getById('config_form')
            .addEventListener('submit', (event) => {
                event.preventDefault();

                Warnings.hide(this.warnings_div);

                try {
                    if (!isValid()) {
                        throw 'O valor inicial precisa ser menor que o final.';
                    }

                    const from = getById('input_from').value,
                        to = getById('input_to').value;

                    new Play(this.element, { from, to });
                } catch (e) {
                    Warnings.show(this.warnings_div, e);
                }
            });
    }
}

/**
 * Valida se o intervalo de números está válido.
 * 
 * @returns {boolean}
 */
function isValid() {
    let fromValue = getById('input_from').value,
        toValue = getById('input_to').value;

    return parseInt(fromValue) < parseInt(toValue);
}