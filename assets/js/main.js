import Configurations from "./components/Configurations.js";
import { getById } from "./helpers/dev.helper.js";

document.addEventListener("DOMContentLoaded", function (e) {
    initListeners();
});

/**
 * Inicia as ações principais.
 */
function initListeners() {
    new Configurations(getById('main_div'));

    // Imprimir fichas
    getById('btn_print')
        .addEventListener('click', () => {
            alert('Quem sabe um dia? XD');
        });
}