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
