
/**
 * compare statistic between selected and actual item in equipment
 * @param selectedItemStat - selected item statistic
 * @param actualItemStat - actual item in equipment statistic
 */
export const compareStats = (selectedItemStat: number, actualItemStat: number | undefined): string => {

    // calculate difference
    const difference: number = selectedItemStat - actualItemStat;

    if (difference > 0) {
        return `<strong class='better'>/ +${difference}</strong>`;
    }
    else if (difference < 0) {
        return `<strong class='worse'>/ -${difference}</strong>`;
    }
    else {
        return '';
    }
}