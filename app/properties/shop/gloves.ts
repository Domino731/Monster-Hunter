import { ShopItem } from '../../types';
export const glovesData: ShopItem[] = [

    // common items
    {
        type: 'gloves',
        name: 'Camo Gloves',
        rarity: 'common',
        src: './images/shop/gloves/camo_gloves.png',
        initialCost: 20,
        properties: {
            strength: 20,
            physicalEndurance: null,
            defence: null,
            luck: null
        },
        id: '1be44a1c-8d70-4116-908c-0b73a12b5a94'
    },

    {
        type: 'gloves',
        name: 'Frosty Gloves',
        rarity: 'common',
        src: './images/shop/gloves/frosty_gloves.png',
        initialCost: 30,
        properties: {
            strength: null,
            physicalEndurance: 10,
            defence: 20,
            luck: null
        },
        id: '4c602eda-cfac-4d33-ae77-5d456a1931ff'
    },

    {
        type: 'gloves',
        name: 'Frosty Gloves',
        rarity: 'common',
        src: './images/shop/gloves/frosty_gloves.png',
        initialCost: 50,
        properties: {
            strength: 10,
            physicalEndurance: 10,
            defence: 30,
            luck: null
        },
        id: '23d2dfe9-c7be-4fdc-938a-98bfc157482b'
    },


    {
        type: 'gloves',
        name: 'Heat Gloves',
        rarity: 'common',
        src: './images/shop/gloves/heat_gloves.png',
        initialCost: 30,
        properties: {
            strength: 30,
            physicalEndurance: null,
            defence: null,
            luck: null
        },
        id: 'fc2e3856-cc9c-4ce1-864a-3bed184cbf16'
    },

    {
        type: 'gloves',
        name: 'Fast Gloves',
        rarity: 'common',
        src: './images/shop/gloves/fast_gloves.png',
        initialCost: 50,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: null,
            luck: 50
        },
        id: '255eaa5b-5d72-451f-b101-3bde01bd967f'
    },

    {
        type: 'gloves',
        name: 'Racing Gloves',
        rarity: 'common',
        src: './images/shop/gloves/racing_gloves.png',
        initialCost: 40,
        properties: {
            strength: null,
            physicalEndurance: 40,
            defence: null,
            luck: null
        },
        id: '30f2e62f-5b73-4859-b329-1b484eac7a11'
    },

    {
        type: 'gloves',
        name: 'Stylish Gloves',
        rarity: 'common',
        src: './images/shop/gloves/stylish_gloves.png',
        initialCost: 40,
        properties: {
            strength: 10,
            physicalEndurance: 10,
            defence: 10,
            luck: 10
        },
        id: '372983b7-7e9a-4ad1-967e-aff6c0f23615'
    },

    
    {
        type: 'gloves',
        name: 'Sport Gloves',
        rarity: 'common',
        src: './images/shop/gloves/sport_gloves.png',
        initialCost: 40,
        properties: {
            strength: null,
            physicalEndurance: 70,
            defence: null,
            luck: null
        },
        id: 'c9efdfee-7ccf-4468-a870-47afcbac9753'
    },

    {
        type: 'gloves',
        name: 'Climbing Gloves',
        rarity: 'common',
        src: './images/shop/gloves/climbing_gloves.png',
        initialCost: 100,
        properties: {
            strength: null,
            physicalEndurance: 70,
            defence: null,
            luck: 30
        },
        id: 'bd24a2b5-24fa-4a9c-8072-ac541eb6bfcc'
    },
    
    // legendary
    {
        type: 'gloves',
        name: 'Boxing Gloves',
        description: 'Useful when you get bored with a classic sword',
        rarity: 'legendary',
        src: './images/shop/gloves/boxing_gloves.png',
        initialCost: 120,
        properties: {
            strength: 60,
            physicalEndurance: null,
            defence: 60,
            luck: null
        },
        id: '39c76894-2f73-4a0a-b4ca-7de25066e504'
    },

    {
        type: 'gloves',
        name: 'Football Gloves',
        description: 'The only thing that matters there is luck',
        rarity: 'legendary',
        src: './images/shop/gloves/football_gloves.png',
        initialCost: 110,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: 30,
            luck: 80
        },
        id: '9d992c51-3766-40b7-9917-294efa08a8c6'
    },

    {
        type: 'gloves',
        name: 'Happy Gloves',
        description: 'In combat, they are no longer so happy',
        rarity: 'legendary',
        src: './images/shop/gloves/happy_gloves.png',
        initialCost: 105,
        properties: {
            strength: 70,
            physicalEndurance: 5,
            defence: 5,
            luck: 30
        },
        id: '7674b802-0f6a-4c30-9c85-84b72ea9244e'
    },

    {
        type: 'gloves',
        name: 'Electric Gloves',
        description: 'Hi my name is....',
        rarity: 'legendary',
        src: './images/shop/gloves/electric_gloves.png',
        initialCost: 100,
        properties: {
            strength: 80,
            physicalEndurance: 20,
            defence: 0,
            luck: 0
        },
        id: '36f5e85e-e2bf-46af-94e7-06c28adc6ff9'
    },

    {
        type: 'gloves',
        name: 'Wired Gloves',
        description: 'Created by lightning on Mount Everest',
        rarity: 'legendary',
        src: './images/shop/gloves/wired_gloves.png',
        initialCost: 130,
        properties: {
            strength: 100,
            physicalEndurance: 10,
            defence: 10,
            luck: 0
        },
        id: 'c0376b94-b43d-4b46-9a51-2feddccf4298'
    },

    {
        type: 'gloves',
        name: 'Robot Gloves',
        description: 'Others have cheats, you have this special gloves',
        rarity: 'legendary',
        src: './images/shop/gloves/robot_gloves.png',
        initialCost: 160,
        properties: {
            strength: 80,
            physicalEndurance: 0,
            defence: 0,
            luck: 80
        },
        id: '9be007aa-8402-480f-8ead-760c84d02a27'
    }


]