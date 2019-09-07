import { colors } from 'quasar';

const col = ['#DDD'];
const i = 0;

function changeColor() {
    console.log('Changing Color');
    /*
    if (i < col.length) {
        colors.setBrand('primary', col[i]);
        // eslint-disable-next-line no-plusplus
        i++;
    } else {
        i = 0;
        colors.setBrand('primary', col[i]);
    }
     */
    function getCurTimeAsColor() {
        const e = new Date();
        return `#${('00' + e.getHours().toString(16)).substr(-2)}${('00' + e.getMinutes().toString(16)).substr(-2)}${('00' + e.getSeconds().toString(16)).substr(-2)}`;
    }
    console.log(getCurTimeAsColor());
    colors.setBrand('primary', getCurTimeAsColor());
    setTimeout(changeColor, 1000);
}

// eslint-disable-next-line no-empty-pattern
export default async ({}) => {
    // changeColor();
};
