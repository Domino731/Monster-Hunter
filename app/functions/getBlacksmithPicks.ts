import { AvailableMarketPicks } from "../types";

// get available blacksmith slots picks, each slot has only 2 picks -> user can only buy 2 items from this slot
export const getBlacksmithPicks = () : AvailableMarketPicks[] => {
    return [
        {
            index: 0,
            picks: 2
        },
        {
            index: 1,
            picks: 2
        },
        {
            index: 2,
            picks: 2
        },
        {
            index: 3,
            picks: 2
        },
        {
            index: 4,
            picks: 2
        },
        {
            index: 5,
            picks: 2
        },
    ];
}