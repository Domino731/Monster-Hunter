import { chestPlate } from '../../types';
export const chestplatesData: chestPlate[] = [
    {
        type: "chestPlate",
        rarity: 'common',
        name: 'Steel of sea',
        src: './images/shop/chestPlates/steel_of_sea.png',
        initialCost: 2,
        properties: {
            strength: 2,
            physicalEndurance: null,
            defence: null,
            luck: null
        }
    },

    {
        type: "chestPlate",
        name: 'Forest guard',
        rarity: 'common',
        src: './images/shop/chestPlates/forest_guard.png',
        initialCost: 6,
        properties: {
            strength: 4,
            physicalEndurance: 2,
            defence: null,
            luck: null
        }
    },

    {
        type: "chestPlate",
        name: 'Moon rider',
        rarity: 'common',
        src: './images/shop/chestPlates/moon_rider.png',
        initialCost: 24,
        properties: {
            strength: 4,
            physicalEndurance: 10,
            defence: 10,
            luck: null
        }
    },

    {
        type: "chestPlate",
        name: 'Interdimensional traveller',
        rarity: 'common',
        src: './images/shop/chestPlates/interdimensional_traveller.png',
        initialCost: 50,
        properties: {
            strength: 0,
            physicalEndurance: 20,
            defence: 10,
            luck: 20
        }
    },

    
    {
        type: "chestPlate",
        name: 'Castle runner',
        rarity: 'common',
        src: './images/shop/chestPlates/castle_runner.png',
        initialCost: 40,
        properties: {
            strength: 0,
            physicalEndurance: 40,
            defence: 0,
            luck: 0
        }
    },

    {
        type: "chestPlate",
        name: 'Heavy weight',
        rarity: 'common',
        src: './images/shop/chestPlates/heavy_weight.png',
        initialCost: 60,
        properties: {
            strength: 10,
            physicalEndurance: 0,
            defence: 50,
            luck: 0
        }
    },

    {
        type: "chestPlate",
        name: 'Climbing mantis',
        rarity: 'common',
        src: './images/shop/chestPlates/climbing_mantis.png',
        initialCost: 60,
        properties: {
            strength: 0,
            physicalEndurance: 20,
            defence: 0,
            luck: 40
        }
    },


    // legendary chest plates

    {
        type: "chestPlate",
        name: 'Cyberpunk wind',
        description: 'Elegant jacket straight from the future, light and airy with a nice neon collar that will make monsters blind.',
        rarity: 'legendary',
        src: './images/shop/chestPlates/cyberpunk_wind.png',
        initialCost: 125,
        properties: {
            strength: 5,
            physicalEndurance: 70,
            defence: 40,
            luck: 10
        }
    },


    {
        type: "chestPlate",
        name: 'Golden luck',
        description: `And they say that gold doesn't make you happy, it's true, but this golden armour will make every monster want to catch you and you won't be bored.`,
        rarity: 'legendary',
        src: './images/shop/chestPlates/golden_luck.png',
        initialCost: 80,
        properties: {
            strength: 0,
            physicalEndurance: 40,
            defence: 0,
            luck: 40
        }
    },


    
    {
        type: "chestPlate",
        name: 'Light warrior',
        description: 'Armour ideal for gamers, it is transparent and rgb lights illumination. It may not add anything to your stats but it has lights and looks great. ',
        rarity: 'legendary',
        src: './images/shop/chestPlates/light_warrior.png',
        initialCost: 500,
        properties: {
            strength: 0,
            physicalEndurance: 0,
            defence: 0,
            luck: 0
        }
    },

    {
        type: "chestPlate",
        name: 'Night ninja',
        description: 'Straight from Mauna Loa. Created on a volcanic rock, flooded with lava',
        rarity: 'legendary',
        src: './images/shop/chestPlates/night_ninja.png',
        initialCost: 115,
        properties: {
            strength: 60,
            physicalEndurance: 20,
            defence: 30,
            luck: 5
        }
    },

    {
        type: "chestPlate",
        name: 'Fit shadow',
        description: 'fits better than your own skin',
        rarity: 'legendary',
        src: './images/shop/chestPlates/fit_shadow.png',
        initialCost: 120,
        properties: {
            strength: 15,
            physicalEndurance: 90,
            defence: 15,
            luck: 0
        }
    },

    {
        type: "chestPlate",
        name: 'Classic',
        description: 'fits better than your own skin',
        rarity: 'legendary',
        src: './images/shop/chestPlates/classic.png',
        initialCost: 120,
        properties: {
            strength: 40,
            physicalEndurance: 40,
            defence: 40,
            luck: 0
        }
    },

    {
        type: "chestPlate",
        name: 'Samurai blood',
        description: 'Blinds others with its brilliance, and makes others jealous',
        rarity: 'legendary',
        src: './images/shop/chestPlates/samurai_blood.png',
        initialCost: 400,
        properties: {
            strength: 100,
            physicalEndurance: 100,
            defence: 100,
            luck: 100
        }
    },
]