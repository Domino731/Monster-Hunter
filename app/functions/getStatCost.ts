// function that return cost of statistic
export const getStatCost = (level: number, statAmount: number, guardPayout) : number => {
     let cost : number = Math.ceil((statAmount * level) + guardPayout * 0.5);
     return cost;
}