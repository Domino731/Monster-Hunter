// function that return cost of statistic
export const getStatCost = (statAmount: number, guardPayout) : number => {
     let cost : number = Math.ceil(statAmount + (guardPayout * 0.05) * 0.5);
     return cost;
}