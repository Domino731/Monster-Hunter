import { ShopItem } from '../../types';
export const weaponsData : ShopItem[] = [

    // common items
    {
        type: 'weapon',
        rarity: 'common',
        name: 'Agatha',
        src: './images/shop/weapons/agatha.png',
        initialCost: 30,
        properties: {
            strength: 5,
            physicalEndurance: 5,
            defence: 10,
            luck: 10
        }
    },

    {
        type: 'weapon',
        rarity: 'common',
        name: 'Anguish Carver',
        src: './images/shop/weapons/anguish_carver.png',
        initialCost: 40,
        properties: {
            strength: 10,
            physicalEndurance: 10,
            defence: 10,
            luck: 10
        }
    },
    {
        type: 'weapon',
        rarity: 'common',
        name: 'Arondite',
        src: './images/shop/weapons/arondite.png',
        initialCost: 40,
        properties: {
            strength: 20,
            physicalEndurance: null,
            defence: null,
            luck: 20
        }
    },
    {
        type: 'weapon',
        rarity: 'common',
        name: 'Blazeguard',
        src: './images/shop/weapons/blazeguard.png',
        initialCost: 45,
        properties: {
            strength: 10,
            physicalEndurance: 15,
            defence: 15,
            luck: 5
        }
    },
    {
        type: 'weapon',
        rarity: 'common',
        name: 'Broken Promise',
        src: './images/shop/weapons/broken_promise.png',
        initialCost: 50,
        properties: {
            strength: 30,
            physicalEndurance: null,
            defence: null,
            luck: 20
        }
    },
    {
        type: 'weapon',
        rarity: 'common',
        name: 'Deathraze',
        src: './images/shop/weapons/deathraze.png',
        initialCost: 50,
        properties: {
            strength: 50,
            physicalEndurance: null,
            defence: null,
            luck: null
        }
    },
    {
        type: 'weapon',
        rarity: 'common',
        name: 'Ghostwalker',
        src: './images/shop/weapons/ghostwalker.png',
        initialCost: 70,
        properties: {
            strength: 40,
            physicalEndurance: 20,
            defence: null,
            luck: 10
        }
    },
    {
        type: 'weapon',
        rarity: 'common',
        name: 'Gladius',
        src: './images/shop/weapons/gladius.png',
        initialCost: 65,
        properties: {
            strength: 30,
            physicalEndurance: 30,
            defence: null,
            luck: 5
        }
    },
    {
        type: 'weapon',
        rarity: 'common',
        name: 'Infamy',
        src: './images/shop/weapons/Infamy.png',
        initialCost: 65,
        properties: {
            strength: 20,
            physicalEndurance: 20,
            defence: 5,
            luck: 20
        }
    },
    {
        type: 'weapon',
        rarity: 'common',
        name: 'Mangler',
        src: './images/shop/weapons/mangler.png',
        initialCost: 30,
        properties: {
            strength: 15,
            physicalEndurance: null,
            defence: 15,
            luck: null
        }
    },
    {
        type: 'weapon',
        rarity: 'common',
        name: 'Mournblade',
        src: './images/shop/weapons/mournblade.png',
        initialCost: 75,
        properties: {
            strength: 45,
            physicalEndurance: 25,
            defence: 5,
            luck: null
        }
    },
    {
        type: 'weapon',
        rarity: 'common',
        name: 'Nightcrackle',
        src: './images/shop/weapons/nightcrackle.png',
        initialCost: 55,
        properties: {
            strength: 25,
            physicalEndurance: 30,
            defence: null,
            luck: null
        }
    },
    {
        type: 'weapon',
        rarity: 'common',
        name: 'Nights Fall',
        src: './images/shop/weapons/nights_fall.png',
        initialCost: 80,
        properties: {
            strength: 60,
            physicalEndurance: 10,
            defence: 5,
            luck: 5
        }
    },
    {
        type: 'weapon',
        rarity: 'common',
        name: 'Peacekeeper Protector',
        src: './images/shop/weapons/peacekeeper_protector.png',
        initialCost: 70,
        properties: {
            strength: 20,
            physicalEndurance: null,
            defence: null,
            luck: 50
        }
    },
    {
        type: 'weapon',
        rarity: 'common',
        name: 'Reaper Of Wraiths',
        src: './images/shop/weapons/reaper_of_wraiths.png',
        initialCost: 20,
        properties: {
            strength: 5,
            physicalEndurance: 5,
            defence: 5,
            luck: 5
        }
    },
    {
        type: 'weapon',
        rarity: 'common',
        name: 'Strorm Breaker',
        src: './images/shop/weapons/strorm_breaker.png',
        initialCost: 60,
        properties: {
            strength: 10,
            physicalEndurance: 25,
            defence: 25,
            luck: null
        }
    },
    {
        type: 'weapon',
        rarity: 'common',
        name: 'Sun Strike',
        src: './images/shop/weapons/sun_strike.png',
        initialCost: 75,
        properties: {
            strength: 70,
            physicalEndurance: null,
            defence: null,
            luck: 5
        }
    },
    {
        type: 'weapon',
        rarity: 'common',
        name: 'Thorn',
        src: './images/shop/weapons/thorn.png',
        initialCost: 75,
        properties: {
            strength: 10,
            physicalEndurance: 10,
            defence: null,
            luck: 55
        }
    },
    {
        type: 'weapon',
        rarity: 'common',
        name: 'Venom Greatsword',
        src: './images/shop/weapons/venom_greatsword.png',
        initialCost: 75,
        properties: {
            strength: 10,
            physicalEndurance: 10,
            defence: null,
            luck: 55
        }
    },

    // legendary
    {
        type: 'weapon',
        rarity: 'legendary',
        name: 'Blood Infused Quickblade',
        description: 'Made of mountain emerald and black magic',
        src: './images/shop/weapons/blood_infused_quickblade.png',
        initialCost: 130,
        properties: {
            strength: 80,
            physicalEndurance: null,
            defence: 20,
            luck: 30
        }
    },
    {
        type: 'weapon',
        rarity: 'legendary',
        name: `Destiny's Song`,
        description: `I've already seen this somewhere`,
        src: './images/shop/weapons/destinys_song.png',
        initialCost: 120,
        properties: {
            strength: 50,
            physicalEndurance: 10,
            defence: 50,
            luck: 10
        }
    },
    {
        type: 'weapon',
        rarity: 'legendary',
        name: `Dire Steel Crusader`,
        description: 'Perfect for a Friday night monster party',
        src: './images/shop/weapons/dire_steel_crusader.png',
        initialCost: 140,
        properties: {
            strength: 30,
            physicalEndurance: 100,
            defence: 10,
            luck: null
        }
    },
    {
        type: 'weapon',
        rarity: 'legendary',
        name: `Heartless Copper Slicer`,
        description: 'Small but crazy',
        src: './images/shop/weapons/heartless_copper_slicer.png',
        initialCost: 120,
        properties: {
            strength: 90,
            physicalEndurance: 15,
            defence: 5,
            luck: 10
        }
    },
    {
        type: 'weapon',
        rarity: 'legendary',
        name: `Memory of Shadow Strikes`,
        description: 'Stolen from a sale, but still usable',
        src: './images/shop/weapons/memory_of_shadow_strikes.png',
        initialCost: 170,
        properties: {
            strength: 120,
            physicalEndurance: 20,
            defence: 20,
            luck: 10
        }
    },
    {
        type: 'weapon',
        rarity: 'legendary',
        name: `Scar`,
        description: 'So beautiful sword that monsters want to be cut with it',
        src: './images/shop/weapons/scar.png',
        initialCost: 160,
        properties: {
            strength: 50,
            physicalEndurance: 50,
            defence: 10,
            luck: 50
        }
    },
    {
        type: 'weapon',
        rarity: 'legendary',
        name: `Voice of Light's Hope`,
        description: 'Classic of classics',
        src: './images/shop/weapons/voice_of_lights_hope.png',
        initialCost: 130,
        properties: {
            strength: 100,
            physicalEndurance: 5,
            defence: 5,
            luck: 5
        }
    },
    {
        type: 'weapon',
        rarity: 'legendary',
        name: `Dark Side Laser`,
        description: `Just Dark side`,
        src: './images/shop/weapons/red_laser.png',
        initialCost: 300,
        properties: {
            strength: 300,
            physicalEndurance: null,
            defence: null,
            luck: null
        }
    },
    {
        type: 'weapon',
        rarity: 'legendary',
        name: `Light Side Laser`,
        description: `Just Light side`,
        src: './images/shop/weapons/blue_laser.png',
        initialCost: 300,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: 300,
            luck: null
        }
    },
    {
        type: 'weapon',
        rarity: 'legendary',
        name: `Happy Slicer`,
        description: `Always smiling :)`,
        src: './images/shop/weapons/happy_sword.png',
        initialCost: 200,
        properties: {
            strength: 100,
            physicalEndurance: null,
            defence: 100,
            luck: null
        }
    },
    {
        type: 'weapon',
        rarity: 'legendary',
        name: `Power of whole universe`,
        description: `Yes, it's the best sword in the whole game, I didn't get the graphics or the name wrong, the real power is in your head.`,
        src: './images/shop/weapons/wooden_sword.png',
        initialCost: 100000,
        properties: {
            strength: 250,
            physicalEndurance: 250,
            defence: 250,
            luck: 250
        }
    },
]