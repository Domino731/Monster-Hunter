import { ShopItem } from '../../types';

// array with data about available chest plates
export const chestplatesData: ShopItem[] = [
    {
        type: "chestPlate",
        rarity: 'common',
        name: 'Steel of sSea',
        src: './images/shop/chestPlates/steel_of_sea.png',
        initialCost: 2,
        properties: {
            strength: 2,
            physicalEndurance: null,
            defence: null,
            luck: null
        },
        id: 'a34cb696-a8e2-47fb-9784-74be6e922347'
    },

    {
        type: "chestPlate",
        name: 'Forest Guard',
        rarity: 'common',
        src: './images/shop/chestPlates/forest_guard.png',
        initialCost: 6,
        properties: {
            strength: 4,
            physicalEndurance: 2,
            defence: null,
            luck: null
        },
        id: 'f3587feb-e40e-416c-9a74-312ca3fcb3a5'
    },

    {
        type: "chestPlate",
        name: 'Moon Rider',
        rarity: 'common',
        src: './images/shop/chestPlates/moon_rider.png',
        initialCost: 24,
        properties: {
            strength: 4,
            physicalEndurance: 10,
            defence: 10,
            luck: null
        },
        id: '271b6cfd-5539-4e49-a77e-ef50cd23d6b3'
    },

    {
        type: "chestPlate",
        name: 'Interdimensional Traveller',
        rarity: 'common',
        src: './images/shop/chestPlates/interdimensional_traveller.png',
        initialCost: 50,
        properties: {
            strength: 0,
            physicalEndurance: 20,
            defence: 10,
            luck: 20
        },
        id: '2c0fbabd-ac53-449e-b81c-8975e455363f'
    },


    {
        type: "chestPlate",
        name: 'Castle Runner',
        rarity: 'common',
        src: './images/shop/chestPlates/castle_runner.png',
        initialCost: 40,
        properties: {
            strength: 0,
            physicalEndurance: 40,
            defence: 0,
            luck: 0
        },
        id: '62b05c2e-6c79-4482-828f-3bc6b24fa7f2'
    },

    {
        type: "chestPlate",
        name: 'Heavy Weight',
        rarity: 'common',
        src: './images/shop/chestPlates/heavy_weight.png',
        initialCost: 60,
        properties: {
            strength: 10,
            physicalEndurance: 0,
            defence: 50,
            luck: 0
        },
        id: '5d80c17f-b6f2-47d0-9bda-16db695670b0'
    },

    {
        type: "chestPlate",
        name: 'Climbing Mantis',
        rarity: 'common',
        src: './images/shop/chestPlates/climbing_mantis.png',
        initialCost: 60,
        properties: {
            strength: 0,
            physicalEndurance: 20,
            defence: 0,
            luck: 40
        },
        id: '6aa20525-b324-4b7f-a205-afa3e185a049'
    },


    // legendary chest plates

    {
        type: "chestPlate",
        name: 'Cyberpunk Wind',
        description: 'Elegant jacket straight from the future, light and airy with a nice neon collar that will make monsters blind.',
        rarity: 'legendary',
        src: './images/shop/chestPlates/cyberpunk_wind.png',
        initialCost: 125,
        properties: {
            strength: 5,
            physicalEndurance: 70,
            defence: 40,
            luck: 10
        },
        id: '489e2553-433b-4576-bdd2-1c786b59e1e8'
    },


    {
        type: "chestPlate",
        name: 'Golden Luck',
        description: `And they say that gold doesn't make you happy, it's true, but this golden armour will make every monster want to catch you and you won't be bored.`,
        rarity: 'legendary',
        src: './images/shop/chestPlates/golden_luck.png',
        initialCost: 80,
        properties: {
            strength: 0,
            physicalEndurance: 40,
            defence: 0,
            luck: 40
        },
        id: '8b502483-10a9-422e-9cf1-447040552051'
    },



    {
        type: "chestPlate",
        name: 'Light Warrior',
        description: 'Armour ideal for gamers, it is transparent and rgb lights illumination. It may not add anything to your stats but it has lights and looks great. ',
        rarity: 'legendary',
        src: './images/shop/chestPlates/light_warrior.png',
        initialCost: 500,
        properties: {
            strength: 0,
            physicalEndurance: 0,
            defence: 0,
            luck: 0
        },
        id: 'bb5e5637-f891-4e88-b380-a73931b0eb76'
    },

    {
        type: "chestPlate",
        name: 'Night Ninja',
        description: 'Straight from Mauna Loa. Created on a volcanic rock, flooded with lava',
        rarity: 'legendary',
        src: './images/shop/chestPlates/night_ninja.png',
        initialCost: 115,
        properties: {
            strength: 60,
            physicalEndurance: 20,
            defence: 30,
            luck: 5
        },
        id: '0464b0f3-6d8c-46a3-bdf2-71e8367ccb5b'
    },

    {
        type: "chestPlate",
        name: 'Fit Shadow',
        description: 'fits better than your own skin',
        rarity: 'legendary',
        src: './images/shop/chestPlates/fit_shadow.png',
        initialCost: 120,
        properties: {
            strength: 15,
            physicalEndurance: 90,
            defence: 15,
            luck: 0
        },
        id: '2bc1b3f0-5f81-4217-b58e-31b8e93a63e4'
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
        },
        id: '32af90dc-0a1f-45ec-b378-202e29d06f62'
    },

    {
        type: "chestPlate",
        name: 'Samurai Blood',
        description: 'Blinds others with its brilliance, and makes others jealous',
        rarity: 'legendary',
        src: './images/shop/chestPlates/samurai_blood.png',
        initialCost: 400,
        properties: {
            strength: 100,
            physicalEndurance: 100,
            defence: 100,
            luck: 100
        },
        id: 'b56aded7-e786-494b-8ee2-e9e63681e82b'
    },
];