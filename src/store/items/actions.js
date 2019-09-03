const uuidv4 = require('uuid/v4');

export function createItem({ commit }, itemName) {
    return new Promise((resolve, reject) => {
        commit('addItem', {
            name: itemName,
            id: uuidv4(),
        });
        resolve();
    });
}


export function setItemPropertiesById({ commit }, obj) {
    return new Promise((resolve, reject) => {
        if ('id' in obj) {
            commit('setItemPropertiesById', obj);
            resolve();
        } else {
            reject();
        }
    });
}
