import { date } from 'quasar';
import { baseItem } from './def';

export function calculateDaysUntilRecommendedDeadline(obj) {
    const then = new Date(obj.recommendedDeadline);
    const now = new Date();
    const diff = date.getDateDiff(then, now, 'days');
    return diff;
}

export function calcDaysUntilHardDeadline(obj) {
    const then = new Date(obj.hardDeadline);
    const now = new Date();
    const diff = date.getDateDiff(then, now, 'days');
    return diff;
}

export function getItems(state) {
    return state.items;
}

export function getItemsSorted(state) {
    // starting to just sort by recommended date
    const A_IS_FURTHER = 1;
    const B_IS_FURTHER = -1;
    return Object.values(state.items).sort((a, b) => {
        a = Object.assign({}, baseItem(), a);
        b = Object.assign({}, baseItem(), b);
        if (a.hardDeadline.length > 0 && b.hardDeadline.length) { // both have hard deadlines
            if (calcDaysUntilHardDeadline(a) === calcDaysUntilHardDeadline(b)) {
                // Tie breaker is the recommended deadline
                if (a.recommendedDeadline.length > 0 && b.recommendedDeadline.length > 0) {
                    return calculateDaysUntilRecommendedDeadline(a) > calculateDaysUntilRecommendedDeadline(b) ? A_IS_FURTHER : B_IS_FURTHER;
                } else {
                    // just return 1
                    return A_IS_FURTHER;
                }
            } else if (calcDaysUntilHardDeadline(a) > calcDaysUntilHardDeadline(b)) { // A is further
                return A_IS_FURTHER;
            } else { // B is further
                return B_IS_FURTHER;
            }
        }
        if (a.recommendedDeadline.length > 0 && b.recommendedDeadline.length > 0) {
            return calculateDaysUntilRecommendedDeadline(a) > calculateDaysUntilRecommendedDeadline(b) ? A_IS_FURTHER : B_IS_FURTHER;
        } else {
            // just return 1
            return A_IS_FURTHER;
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
