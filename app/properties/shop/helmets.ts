import { ShopItem } from '../../types';
export const helmetsData: ShopItem[] = [
    // common items
    {
        type: 'helmet',
        rarity: 'common',
        name: 'Behemot',
        src: './images/shop/helmets/behemot.png',
        initialCost: 60,
        properties: {
            strength: 10,
            physicalEndurance: 50,
            defence: null,
            luck: null
        }
    },

    {
        type: 'helmet',
        rarity: 'common',
        name: 'Colossus',
        src: './images/shop/helmets/colossus.png',
        initialCost: 45,
        properties: {
            strength: 15,
            physicalEndurance: 15,
            defence: 15,
            luck: null
        }
    },

    {
        type: 'helmet',
        rarity: 'common',
        name: 'Dark_nightmare',
        src: './images/shop/helmets/dark_nightmare.png',
        initialCost: 50,
        properties: {
            strength: 10,
            physicalEndurance: null,
            defence: 20,
            luck: 20
        }
    },

    
    {
        type: 'helmet',
        rarity: 'common',
        name: 'Door opener',
        src: './images/shop/helmets/door_opener.png',
        initialCost: 60,
        properties: {
            strength: 30,
            physicalEndurance: null,
            defence: 30,
            luck: null
        }
    },

    {
        type: 'helmet',
        rarity: 'common',
        name: 'Full focus',
        src: './images/shop/helmets/full_focus.png',
        initialCost: 40,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: 20,
            luck: 20
        }
    },

    {
        type: 'helmet',
        rarity: 'common',
        name: 'Night rider',
        src: './images/shop/helmets/night_rider.png',
        initialCost: 50,
        properties: {
            strength: 25,
            physicalEndurance: null,
            defence: 25,
            luck: null
        }
    },

    {
        type: 'helmet',
        rarity: 'common',
        name: 'Super vision',
        src: './images/shop/helmets/super_vision.png',
        initialCost: 40,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: 40,
            luck: null
        }
    },

    {
        type: 'helmet',
        rarity: 'common',
        name: 'True warrior',
        src: './images/shop/helmets/true_warrior.png',
        initialCost: 40,
        properties: {
            strength: 10,
            physicalEndurance: 10,
            defence: 10,
            luck: 10
        }
    },

    {
        type: 'helmet',
        rarity: 'common',
        name: 'VR',
        src: './images/shop/helmets/vr.png',
        initialCost: 30,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: 10,
            luck: 20
        }
    },

    // legendary items

    {
        type: 'helmet',
        rarity: 'legendary',
        description: 'A beautiful helmet with a very weak air intakes, causes desire to finish off your opponent as quickly as possible and take this helmet off you head',
        name: 'Super warrior',
        src: './images/shop/helmets/super_warrior.png',
        initialCost: 100,
        properties: {
            strength: 50,
            physicalEndurance: null,
            defence: 50,
            luck: null
        }
    },
    {
        type: 'helmet',
        rarity: 'legendary',
        description: `Is there anything more beautiful than technology? Of course there is, this helmet is filled with technology and spoils so often you can't afford a new one`,
        name: 'Future view',
        src: './images/shop/helmets/future_view.png',
        initialCost: 130,
        properties: {
            strength: 30,
            physicalEndurance: 30,
            defence: 30,
            luck: 40
        }
    },
    {
        type: 'helmet',
        rarity: 'legendary',
        description: `Made of gold, that's all you know, and looks cool`,
        name: 'Golden head',
        src: './images/shop/helmets/golden_head.png',
        initialCost: 150,
        properties: {
            strength: 20,
            physicalEndurance: 20,
            defence: 90,
            luck: 20
        }
    },

    {
        type: 'helmet',
        rarity: 'legendary',
        description: `Useful at night when you can't see anything, when you put him on your head you still can't see anything but if you hit your head on a tree you won't feel anything`,
        name: 'Dark knight',
        src: './images/shop/helmets/dark_knight.png',
        initialCost: 130,
        properties: {
            strength: 30,
            physicalEndurance: 10,
            defence: 60,
            luck: 30
        }
    },
    {
        type: 'helmet',
        rarity: 'legendary',
        description: `Not worth the price, adds nothing to the stats but looks good and has rgb lighting`,
        name: 'PCMR helmet',
        src: './images/shop/helmets/pcmr_helmet.png',
        initialCost: 1000,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: null,
            luck: null
        }
    },
]