import { Gloves } from '../../types';
export const glovesData: Gloves[] = [

    // common items
    {
        type: 'gloves',
        name: 'Camo gloves',
        rarity: 'common',
        src: './images/shop/gloves/camo_gloves.png',
        initialCost: 20,
        properties: {
            strength: 20,
            physicalEndurance: null,
            defence: null,
            luck: null
        }
    },

    {
        type: 'gloves',
        name: 'Frosty gloves',
        rarity: 'common',
        src: './images/shop/gloves/frosty_gloves.png',
        initialCost: 30,
        properties: {
            strength: null,
            physicalEndurance: 10,
            defence: 20,
            luck: null
        }
    },

    {
        type: 'gloves',
        name: 'Frosty gloves',
        rarity: 'common',
        src: './images/shop/gloves/frosty_gloves.png',
        initialCost: 50,
        properties: {
            strength: 10,
            physicalEndurance: 10,
            defence: 30,
            luck: null
        }
    },


    {
        type: 'gloves',
        name: 'Heat gloves',
        rarity: 'common',
        src: './images/shop/gloves/heat_gloves.png',
        initialCost: 30,
        properties: {
            strength: 30,
            physicalEndurance: null,
            defence: null,
            luck: null
        }
    },

    {
        type: 'gloves',
        name: 'Fast gloves',
        rarity: 'common',
        src: './images/shop/gloves/fast_gloves.png',
        initialCost: 50,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: null,
            luck: 50
        }
    },

    {
        type: 'gloves',
        name: 'Racing gloves',
        rarity: 'common',
        src: './images/shop/gloves/racing_gloves.png',
        initialCost: 40,
        properties: {
            strength: null,
            physicalEndurance: 40,
            defence: null,
            luck: null
        }
    },

    {
        type: 'gloves',
        name: 'Stylish gloves',
        rarity: 'common',
        src: './images/shop/gloves/stylish_gloves.png',
        initialCost: 40,
        properties: {
            strength: 10,
            physicalEndurance: 10,
            defence: 10,
            luck: 10
        }
    },

    
    {
        type: 'gloves',
        name: 'Sport gloves',
        rarity: 'common',
        src: './images/shop/gloves/sport_gloves.png',
        initialCost: 40,
        properties: {
            strength: null,
            physicalEndurance: 70,
            defence: null,
            luck: null
        }
    },

    {
        type: 'gloves',
        name: 'Climbing gloves',
        rarity: 'common',
        src: './images/shop/gloves/climbing_gloves.png',
        initialCost: 100,
        properties: {
            strength: null,
            physicalEndurance: 70,
            defence: null,
            luck: 30
        }
    },
    
    // legendary
    {
        type: 'gloves',
        name: 'Boxing gloves',
        description: 'Useful when you get bored with a classic sword',
        rarity: 'legendary',
        src: './images/shop/gloves/boxing_gloves.png',
        initialCost: 120,
        properties: {
            strength: 60,
            physicalEndurance: null,
            defence: 60,
            luck: null
        }
    },

    {
        type: 'gloves',
        name: 'Football gloves',
        description: 'The only thing that matters there is luck',
        rarity: 'legendary',
        src: './images/shop/gloves/football_gloves.png',
        initialCost: 110,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: 30,
            luck: 80
        }
    },

    {
        type: 'gloves',
        name: 'Happy gloves',
        description: 'In combat, they are no longer so happy',
        rarity: 'legendary',
        src: './images/shop/gloves/happy_gloves.png',
        initialCost: 105,
        properties: {
            strength: 70,
            physicalEndurance: 5,
            defence: 5,
            luck: 30
        }
    },

    {
        type: 'gloves',
        name: 'Electric gloves',
        description: 'Hi my name is....',
        rarity: 'legendary',
        src: './images/shop/gloves/electric_gloves.png',
        initialCost: 100,
        properties: {
            strength: 80,
            physicalEndurance: 20,
            defence: 0,
            luck: 0
        }
    },

    {
        type: 'gloves',
        name: 'Wired gloves',
        description: 'Created by lightning on Mount Everest',
        rarity: 'legendary',
        src: './images/shop/gloves/wired_gloves.png',
        initialCost: 130,
        properties: {
            strength: 100,
            physicalEndurance: 10,
            defence: 10,
            luck: 0
        }
    },

    {
        type: 'gloves',
        name: 'Robot gloves',
        description: 'Others have cheats, you have this special gloves',
        rarity: 'legendary',
        src: './images/shop/gloves/robot_gloves.png',
        initialCost: 160,
        properties: {
            strength: 80,
            physicalEndurance: 0,
            defence: 0,
            luck: 80
        }
    }


]