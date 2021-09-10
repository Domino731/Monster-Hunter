import { potion } from '../../types';

// this array contains data about potions - cost, name, src, properties
const potionsData: potion[] = [
    {
        type: 'potion',
        name: 'Decoction of cactus',
        description: 'Straight from Texas',
        src: './images/shop/potions/physicalEndurance.png',
        initialCost: 5,
        properties: {
            physicalEndurance: 10,
            strength: null,
            luck: null,
            defence: null
        }
    },

    {
        type: 'potion',
        name: 'Kraken blood',
        description: 'It was not easy',
        src: './images/shop/potions/strength.png',
        initialCost: 5,
        properties: {
            strength: 10,
            physicalEndurance: null,
            luck: null,
            defence: null
        }
    },
    {
        type: 'potion',
        name: 'Magic of the forest',
        description: 'Good thing the witch was asleep',
        src: './images/shop/potions/defence.png',
        initialCost: 5,
        properties: {
            defence: 10,
            physicalEndurance: null,
            strength: null,
            luck: null
        }
    },
    {
        type: 'potion',
        name: 'Liquid moon powder',
        description: 'Imported from Area 51, aliens are still looking for it',
        src: './images/shop/potions/superPotion.png',
        initialCost: 5,
        properties: {
            physicalEndurance: 15,
            strength: 15,
            luck: 15,
            defence: 15
        }
    },
    {
        type: 'potion',
        name: 'Mountain rose',
        description: 'Passed down from generation to generation, and the power is the same.',
        src: './images/shop/potions/luck.png',
        initialCost: 5,
        properties: {
            luck: 10,
            physicalEndurance: 0,
            strength: 0,
            defence: 0
        }
    },
];