// function that return cost of statistic
export const getStatCost = (level: number, statAmount: number, guardPayout) : number => {
     const cost : number = (statAmount * level / 2) + guardPayout * 0.5;
     return cost;
}