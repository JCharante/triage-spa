export function createItem({ commit }, itemName) {
    return new Promise((resolve, reject) => {
        commit('addItem', {
            name: itemName,
        });
        resolve();
    });
}
