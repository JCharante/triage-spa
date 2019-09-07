import { baseItem } from './def';

export function getItems(state) {
    // sort them....
    return state.items;
}

export function getItemById(state, getters) {
    // eslint-disable-next-line func-names
    return function (itemId) {
        return Object.assign(baseItem(), {
            id: itemId,
        }, getters.getItems[itemId] || {});
    };
}
