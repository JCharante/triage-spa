import { date } from 'quasar';
import { baseItem } from './def';

export function calculateDaysUntilRecommendedDeadline(obj) {
    const then = new Date(obj.recommendedDeadline);
    const now = new Date();
    const diff = date.getDateDiff(then, now, 'days');
    return diff;
}

export function getItems(state) {
    return state.items;
}

export function getItemsSorted(state) {
    // starting to just sort by recommended date
    return Object.values(state.items).sort((a, b) => {
        a = Object.assign({}, baseItem(), a);
        b = Object.assign({}, baseItem(), b);
        if (a.recommendedDeadline.length > 0 && b.recommendedDeadline.length > 0) {
            return calculateDaysUntilRecommendedDeadline(a) > calculateDaysUntilRecommendedDeadline(b) ? 1 : -1;
        } else {
            // just return 1
            return 1;
        }
    });
}

export function getItemById(state, getters) {
    // eslint-disable-next-line func-names
    return function (itemId) {
        return Object.assign(baseItem(), {
            id: itemId,
        }, getters.getItems[itemId] || {});
    };
}
