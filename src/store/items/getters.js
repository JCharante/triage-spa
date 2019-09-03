export function getItems(state) {
    console.log(state.items);
    return state.items;
}

export function getItemById(state, getters) {
    // eslint-disable-next-line func-names
    return function (itemId) {
        return Object.assign({
            id: itemId,
            name: '',
        }, getters.getItems[itemId] || {});
    };
}
