/**
 * Seleciona um elemento pelo id.
 * 
 * @param {string} id 
 * @returns 
 */
export function getById(id) {
    return document.getElementById(id);
}

/**
 * Cria um elemento HTML.
 * 
 * @param {string} tagName Nome da tag.
 * @param {Object} properties Propriedades que o elemento deve ter. Obs.: a classe toda deve ser enviada como 'classList'.
 * @returns HTMLElement
 */
export function createElement(tagName, properties = {}) {
    let element = document.createElement(tagName);

    let propertyList = Object.keys(properties);

    propertyList.forEach(property => {
        element[property] = properties[property];
    });

    return element;
}