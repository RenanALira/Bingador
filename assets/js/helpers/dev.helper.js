export function getById(id) {
    return document.getElementById(id);
}

export function createElement(tagName, properties = {}) {
    let element = document.createElement(tagName);

    let propertyList = Object.keys(properties);

    propertyList.forEach(property => {
        element[property] = properties[property];
    });

    return element;
}