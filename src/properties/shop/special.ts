import { ShopItem } from '../../types';
/**
 * array with data about available special items
 */
export const specialItemsData : ShopItem[] = [
    
    {
        type: 'special',
        rarity: 'legendary',
        name: 'Clock',
        description: 'Hurry up',
        src: './images/shop/special/alarm_clock.png',
        initialCost: 30,
        properties: {
            strength: null,
            physicalEndurance: 15,
            defence: null,
            luck: 15
        },
        id: '006761fc-3478-40b5-9161-0eb0ad69828f'
    },
    {
        type: 'special',
        rarity: 'legendary',
        name: 'Clover',
        description: 'Brings happiness where it is lacking',
        src: './images/shop/special/clover.png',
        initialCost: 100,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: 20,
            luck: 80
        },
        id: 'bd33272c-2424-4645-a1b8-269f55b749be'
    },
    {
        type: 'special',
        rarity: 'legendary',
        name: 'Heavy Backpack',
        description: 'Why you need a gym, keep that backpack',
        src: './images/shop/special/bag.png',
        initialCost: 100,
        properties: {
            strength: 50,
            physicalEndurance: 50,
            defence: null,
            luck: null
        },
        id: '55f2a756-682d-4e88-8ffb-4ebfeb2aed66'
    },
    {
        type: 'special',
        rarity: 'legendary',
        name: 'Superhero Comic',
        description: 'Bored? Hold this comic, does not contain pictures',
        src: './images/shop/special/comic_book.png',
        initialCost: 80,
        properties: {
            strength: 20,
            physicalEndurance: 20,
            defence: 20,
            luck: 20
        },
        id: 'f420df5a-8ede-4872-ba86-0370e35dd49d'
    },
    {
        type: 'special',
        rarity: 'legendary',
        name: 'Cookies Jar',
        description: 'Hungry, keep that gluten and sugar free cookies',
        src: './images/shop/special/cookies_jar.png',
        initialCost: 80,
        properties: {
            strength: null,
            physicalEndurance: 90,
            defence: null,
            luck: null
        },
        id: '1d77c1b4-226a-4a00-833a-db1a876aa031'
    },
    {
        type: 'special',
        rarity: 'legendary',
        name: 'Crown',
        description: `This crown is not stolen at all.... well, she was lying next to the throne, but who wouldn't take she`,
        src: './images/shop/special/crown.png',
        initialCost: 160,
        properties: {
            strength: 40,
            physicalEndurance: 40,
            defence: 40,
            luck: 40
        },
        id: '25f5a332-6640-4605-a625-23b0a9d60e1c'
    },
    {
        type: 'special',
        rarity: 'legendary',
        name: 'Diamond',
        description: `Original`,
        src: './images/shop/special/diamond.png',
        initialCost: 10,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: null,
            luck: 10
        },
        id: '6f21084d-208a-4439-8743-ff2a00dd1df5'
    },
    {
        type: 'special',
        rarity: 'legendary',
        name: 'Reaper',
        description: `Your servant, you have to watch out for him`,
        src: './images/shop/special/grim_reaper.png',
        initialCost: 110,
        properties: {
            strength: 100,
            physicalEndurance: null,
            defence: null,
            luck: 10
        },
        id: '388ce7e6-f1cd-4c3d-a6bf-6dfa491a2023'
    },
    {
        type: 'special',
        rarity: 'legendary',
        name: 'Golden Necklace',
        description: `Heavy, but useless`,
        src: './images/shop/special/necklace.png',
        initialCost: 1000,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: null,
            luck: null
        },
        id: '70c90957-7262-4974-a34c-9efd7886962c'
    },
    {
        type: 'special',
        rarity: 'legendary',
        name: 'Octopus',
        description: `It's a prank, for real it's kraken`,
        src: './images/shop/special/octopus.png',
        initialCost: 160,
        properties: {
            strength: 70,
            physicalEndurance: null,
            defence: 90,
            luck: null
        },
        id: '4180cb65-7d07-4c4f-b620-7cac77ad466d'
    },
    {
        type: 'special',
        rarity: 'legendary',
        name: 'Discount',
        description: `Discount for food, everyone wants this discount, and you have to run away`,
        src: './images/shop/special/price_tag.png',
        initialCost: 160,
        properties: {
            strength: null,
            physicalEndurance: 120,
            defence: null,
            luck: null
        },
        id: 'b78fc21a-9132-4181-b7b7-bf77d71ea20f'
    },
    {
        type: 'special',
        rarity: 'legendary',
        name: 'Rabbit',
        description: `Inside is enchanted werewolf, be careful!`,
        src: './images/shop/special/rabbit.png',
        initialCost: 150,
        properties: {
            strength: 50,
            physicalEndurance: 50,
            defence: 50,
            luck: null
        },
        id: '00c71a5f-c772-47a0-8290-c0d6b4bd5c62'
    },
    {
        type: 'special',
        rarity: 'legendary',
        name: 'Socks',
        description: `Red socks = running faster`,
        src: './images/shop/special/socks.png',
        initialCost: 110,
        properties: {
            strength: null,
            physicalEndurance: 80,
            defence: 30,
            luck: null
        },
        id: '2c41ccc2-1947-45ca-8532-39ce4198c408'
    },
    {
        type: 'special',
        rarity: 'legendary',
        name: 'Cola',
        description: `Almost like gold`,
        src: './images/shop/special/soda.png',
        initialCost: 50,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: null,
            luck: 50
        },
        id: 'c8888dc-3197-41c7-b257-6915178d90c0'
    },
    {
        type: 'special',
        rarity: 'legendary',
        name: 'Wings',
        description: `Attack your opponents from above`,
        src: './images/shop/special/wings.png',
        initialCost: 200,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: 100,
            luck: 100
        },
        id: 'ddd3d033-d97c-470f-b376-20db1730d5c3'
    },
];