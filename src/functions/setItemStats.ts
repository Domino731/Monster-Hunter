/**
 * this function is returning particular item statistics (based on user statistic)
 * @param itemStatistic - statistic that you want to set
 * @param userRawStatistic - needed to set statistic, which is based on this value
 * @returns 
 */
export const setItemStats = (itemStatistic: number | null, userRawStatistic: number): number => {
    if (itemStatistic !== null) {

        // calculate new stat based on raw user statistics
        const userRaw: number = userRawStatistic;
        const itemPercentage: number = itemStatistic;

        // percentage of userRaw stats
        const newStat: number = ((userRaw / 100) * itemPercentage);

        // add a random number to newStats value, in order to have different statistics based on user stats
        let result: number = Math.ceil((newStat + (Math.random() * newStat))) + Math.random() * userRawStatistic;
        result + Math.random() * ((userRawStatistic / 3))

        return Math.ceil(result / 8) + 1;
    }
    else {
        return itemStatistic;
    }
}