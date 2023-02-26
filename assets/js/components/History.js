'use strict'

import { createElement, getById } from "../helpers/dev.helper.js";
import history from "../partials/history.js";

export default class History {
    /**
     * Cria o histórico de números sorteados.
     * 
     * @param {HTMLElement} element Elemento da div que vai receber o histórico.
     */
    constructor(element) {
        this.element = element;

        this.element.innerHTML = history;
    }

    static destroy() {
        getById('accordion_history').remove();
    }

    /**
     * Adiciona os números sorteados ao histórico.
     * 
     * @param {integer} numberToInsert Número a ser inserido.
     */
    static addToHistory(numberToInsert) {
        let historyTr = createElement('tr'),
            historySequenceTd = createElement('td'),
            historyNumberTd = createElement('td'),
            insertedRowsCount = document.querySelectorAll('#history_table tr').length;

        historySequenceTd.innerText = `${insertedRowsCount + 1}º`;
        historyNumberTd.innerText = numberToInsert;

        historyTr.append(historySequenceTd);
        historyTr.append(historyNumberTd);

        getById('history_table').prepend(historyTr);
    }

    /**
     * Limpa o histórico.
     */
    static clear() {
        getById('history_table').innerHTML = '';
    }
}