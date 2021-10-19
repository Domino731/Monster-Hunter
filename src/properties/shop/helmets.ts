import { ShopItem } from '../../types';

// array with data about available helmets
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
        },
        id: '546263f6-52df-47c5-81c6-169f06b0d107'
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
        },
        id: '9925fa36-6b8b-42af-a508-b59c38434448'
    },

    {
        type: 'helmet',
        rarity: 'common',
        name: 'Dark Nightmare',
        src: './images/shop/helmets/dark_nightmare.png',
        initialCost: 50,
        properties: {
            strength: 10,
            physicalEndurance: null,
            defence: 20,
            luck: 20
        },
        id: '438c85ad-ba49-45a2-9c1a-d1dcbfdf6100'
    },

    
    {
        type: 'helmet',
        rarity: 'common',
        name: 'Door Opener',
        src: './images/shop/helmets/door_opener.png',
        initialCost: 60,
        properties: {
            strength: 30,
            physicalEndurance: null,
            defence: 30,
            luck: null
        },
        id: 'da1cdb9d-1e00-43bb-a296-a5053dee00ee'
    },

    {
        type: 'helmet',
        rarity: 'common',
        name: 'Full Focus',
        src: './images/shop/helmets/full_focus.png',
        initialCost: 40,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: 20,
            luck: 20
        },
        id: '1dca39d6-e322-488a-80e6-e44032db47e1'
    },

    {
        type: 'helmet',
        rarity: 'common',
        name: 'Night Rider',
        src: './images/shop/helmets/night_rider.png',
        initialCost: 50,
        properties: {
            strength: 25,
            physicalEndurance: null,
            defence: 25,
            luck: null
        },
        id: '7f4a46a3-f031-4e44-8751-fb7037179df7'
    },

    {
        type: 'helmet',
        rarity: 'common',
        name: 'Super Vision',
        src: './images/shop/helmets/super_vision.png',
        initialCost: 40,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: 40,
            luck: null
        },
        id: 'b0a6cb0f-9525-4b49-8809-68efbfdbe012'
    },

    {
        type: 'helmet',
        rarity: 'common',
        name: 'True Warrior',
        src: './images/shop/helmets/true_warrior.png',
        initialCost: 40,
        properties: {
            strength: 10,
            physicalEndurance: 10,
            defence: 10,
            luck: 10
        },
        id: 'bc398265-4c7f-4f59-85d0-d2d0a9cb03ba'
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
        },
        id: '111ef6cd-d18a-40b7-8e34-59c8b91e4d2e'
    },

    // legendary items

    {
        type: 'helmet',
        rarity: 'legendary',
        description: 'A beautiful helmet with a very weak air intakes, causes desire to finish off your opponent as quickly as possible and take this helmet off you head',
        name: 'Super Warrior',
        src: './images/shop/helmets/super_warrior.png',
        initialCost: 100,
        properties: {
            strength: 50,
            physicalEndurance: null,
            defence: 50,
            luck: null
        },
        id: '90801753-94ab-48a5-89bc-ff855b748d6d'
    },
    {
        type: 'helmet',
        rarity: 'legendary',
        description: `Is there anything more beautiful than technology? Of course there is, this helmet is filled with technology and spoils so often you can't afford a new one`,
        name: 'Future View',
        src: './images/shop/helmets/future_view.png',
        initialCost: 130,
        properties: {
            strength: 30,
            physicalEndurance: 30,
            defence: 30,
            luck: 40
        },
        id: 'c16b07d1-b0a6-429f-af7b-0c291e565ea7'
    },
    {
        type: 'helmet',
        rarity: 'legendary',
        description: `Made of gold, that's all we know, and looks cool`,
        name: 'Golden Head',
        src: './images/shop/helmets/golden_head.png',
        initialCost: 150,
        properties: {
            strength: 20,
            physicalEndurance: 20,
            defence: 90,
            luck: 20
        },
        id: 'ac96566f-b7e9-458b-9c8b-e09bd3853134'
    },

    {
        type: 'helmet',
        rarity: 'legendary',
        description: `Useful at night when you can't see anything, when you put him on your head you still can't see anything but if you hit your head on a tree you won't feel anything`,
        name: 'Dark Knight',
        src: './images/shop/helmets/dark_knight.png',
        initialCost: 130,
        properties: {
            strength: 30,
            physicalEndurance: 10,
            defence: 60,
            luck: 30
        },
        id: '861a1ade-d969-4107-85ef-14e1193deb60'
    },
    {
        type: 'helmet',
        rarity: 'legendary',
        description: `Not worth the price, adds nothing to the stats but looks good and has rgb lighting`,
        name: 'PCMR Helmet',
        src: './images/shop/helmets/pcmr_helmet.png',
        initialCost: 1000,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: null,
            luck: null
        },
        id: 'bd01be59-ec34-415b-af5b-40892bd1a5a7'
    },
];