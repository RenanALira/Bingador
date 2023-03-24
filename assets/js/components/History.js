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

        this._initSearchListener();
    }

    _initSearchListener() {
        getById('input_search_numbers')
            .addEventListener('input', ({ currentTarget }) => {
                const searchedNumber = currentTarget.value,
                    historyItems = document.getElementsByClassName('history-item');

                for (let historyItem of historyItems) {
                    const classes = ['not-found', 'found'];

                    historyItem.classList.remove(classes[0], classes[1]);

                    if (searchedNumber !== '') {
                        const foundNumberCondition = searchedNumber === historyItem.querySelector('h4').innerText;

                        historyItem.classList.add(classes[+foundNumberCondition]);

                        foundNumberCondition && historyItem.scrollIntoView();
                    }
                }
            });
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
        let historyItem = createElement('div', { classList: 'history-item' }),
            historyItemsCount = document.querySelectorAll('#div_history_items div.history-item').length,
            inputSearch = getById('input_search_numbers');

        historyItem.innerHTML = /*html*/`
            <h4>${numberToInsert}</h4>
            <small>${historyItemsCount + 1}º</small>
        `;

        getById('div_history_items').append(historyItem);

        if (inputSearch.value !== '') {
            inputSearch.dispatchEvent(new Event('input'));
        }
    }

    /**
     * Limpa o histórico.
     */
    static clear() {
        getById('div_history_items').innerHTML = '';
        getById('input_search_numbers').value = '';
    }
}