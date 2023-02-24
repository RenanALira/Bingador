'use strict'

export default class Warnings {
    constructor() {
    }

    /**
     * Mostra o alerta e o esconde 5 segundos depois.
     * 
     * @param {HTMLElement} element Elemento do alerta que deverá ser exibido.
     * @param {string} message Mensagem que deve ser exibida.
     */
    static show(element, message) {
        element.innerText = message;
        element.classList.remove('d-none');

        let timeout = setTimeout(() => {
            this.hide(element);

            clearTimeout(timeout);
        }, 3500);
    }

    /**
     * Esconde o alerta e limpa a mensagem.
     * 
     * @param {HTMLElement} element Elemento do alerta que deverá ser escondido.
     */
    static hide(element) {
        element.innerText = '';
        element.classList.add('d-none');
    }
}