/**
 * function that return cost of statistic
 * @param statAmount - needed to calculate cost
 * @param guardPayout - needed to calculate cost
 * @returns 
 */
export const getStatCost = (statAmount: number, guardPayout) : number => {
     let cost : number = Math.ceil(statAmount + (guardPayout * 0.05) * 0.5);
     return cost;
}