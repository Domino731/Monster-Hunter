import { ShopItem } from '../../types';

// this array contains data about potions - cost, name, src, properties
export const potionsData: ShopItem[] = [
    {
        type: 'potion',
        rarity: 'legendary',
        name: 'Decoction of Cactus',
        description: 'Straight from Texas',
        src: './images/shop/potions/physicalEndurance.png',
        initialCost: 5,
        properties: {
            physicalEndurance: 10,
            strength: null,
            luck: null,
            defence: null
        },
        id: 'f07329dd-835a-47a0-986b-70281589fccf'
    },

    {
        type: 'potion',
        rarity: 'legendary',
        name: 'Kraken Blood',
        description: 'It was not easy',
        src: './images/shop/potions/strength.png',
        initialCost: 5,
        properties: {
            strength: 10,
            physicalEndurance: null,
            luck: null,
            defence: null
        },
        id: '76712a9c-705c-4dc6-94eb-7a742b1122fe'
        
    },
    {
        type: 'potion',
        rarity: 'legendary',
        name: 'Magic of the Forest',
        description: 'Good thing the witch was asleep',
        src: './images/shop/potions/defence.png',
        initialCost: 5,
        properties: {
            defence: 10,
            physicalEndurance: null,
            strength: null,
            luck: null
        },
        id: '4a5019c6-092e-4e31-81d4-d46413f3824d'
    },
    {
        type: 'potion',
        rarity: 'legendary',
        name: 'Liquid Moon Powder',
        description: 'Imported from Area 51, aliens are still looking for it',
        src: './images/shop/potions/superPotion.png',
        initialCost: 5,
        properties: {
            physicalEndurance: 15,
            strength: 15,
            luck: 15,
            defence: 15
        },
        id: '8f327e73-d24f-4c22-9099-9efc94ad7bff'
    },
    {
        type: 'potion',
        rarity: 'legendary',
        name: 'Mountain Rose',
        description: 'Passed down from generation to generation, and the power is the same.',
        src: './images/shop/potions/luck.png',
        initialCost: 5,
        properties: {
            luck: 10,
            physicalEndurance: null,
            strength: null,
            defence: null
        },
        id: '1e06bfdb-1326-43a6-991f-b9c6fabdca5c'
    },
];

