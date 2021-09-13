// this function sets item statistics
export const setItemStats = (itemStatistic: number, userRawStatistic: number) : number => {

    // calculate new stat based on raw user statistics
    const userRaw: number = userRawStatistic;
    const itemPercentage: number = itemStatistic;

    // percentage of userRaw
    const newStat: number = ((userRaw / 100) * itemPercentage) / 2;

    // add a random number to newStats variable, in order to have different statistics based on user stats
    const result : number = parseFloat((newStat + (Math.random() * newStat)).toFixed());

    return result
}