/**
 * function that return cost of statistic (based on gaurd payout value and statistic amount)
 * @param statAmount - needed to calculate cost
 * @param guardPayout - needed to calculate cost
 */
export const getStatCost = (statAmount: number, guardPayout: number) : number => {
     let cost : number = Math.ceil(statAmount + (guardPayout * 0.05) * 0.5);
     return cost;
}