import { getBlacksmithItems } from "../../functions/getBlacksmithItems";
import { getBlacksmithPicks } from "../../functions/getBlacksmithPicks";
import { getNeededExp } from "../../functions/getNeededExp";
import { getRandomShopItem } from "../../functions/getRandomShopItem";
import { getRandomMissions } from "../../functions/missionGenerator";
import { ShopItem, FullUserStats } from '../../types';
import { portraitsData } from "../portraits/portraits";
import { potionsData } from "../shop/potions";

const wizardWheelItems: ShopItem[] = []


// add blacksmith items
const items: ShopItem[] = getBlacksmithItems({
    strength: 50,
    physicalEndurance: 50,
    defence: 50,
    luck: 50
});
// aslo,  user can get gold
const gold: ShopItem = {
    type: 'gold',
    name: 'Gold',
    rarity: 'legendary',
    src: './images/gold_chest.png',
    description: `${300} gold will always comforting`,
    initialCost: 0,
    properties: {
        strength: null,
        physicalEndurance: null,
        luck: null,
        defence: null
    },
    id: ''
}
items.push(gold);

    items.push(getRandomShopItem(potionsData))
// set won item
const magicWheel = {
    items,
    wonItem: items[Math.floor(Math.random() * items.length)]
}
const fullUserStats: FullUserStats = {
    damage: 35,
    health: 35,
    damageReduce: 35,
    critical: 35,
    defence: 50,
    luck: 50,
    physicalEndurance: 50,
    strength: 50
}
export const initialUserProfile = {
    level: 1,
                        guardPayout: 100,
                        gold: 1000,
                        rawStats: {
                            defence: 50,
                            luck: 50,
                            physicalEndurance: 50,
                            strength: 50
                        },
                        stats: {
                            damage: 35,
                            health: 35,
                            damageReduce: 35,
                            critical: 35
                        },
                        shop: {
                            blacksmith: null,
                            wizard: null
                        },
                        shopPicks: {
                            blacksmith: getBlacksmithPicks(),
                            wizard: null
                        },
                        equipmentItems: [],
                        backpackItems: [],
                        status: 'free',
                        guard: {
                            current: null,
                            start: null,
                            end: null,
                            payout: null
                        },
                        pet: null,
                        potions: {
                            first: null,
                            second: null
                        },
                        description: '',
                        portrait: portraitsData[0],
                        exp: 0,
                        wizardWheelSpin: true,
                        magicWheel,
                        nextLevelAt: getNeededExp(1),
                        missionWillingness: 100,
                        currentMission: null,
                        availableMissions: getRandomMissions(10, 100, fullUserStats, null )
}