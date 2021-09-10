import { ShopItem } from '../../types';
export const shieldsData : ShopItem[] = [

    // common items
    {
        type: 'shield',
        rarity: 'common',
        name: 'Classic',
        src: './images/shop/shields/classic_shield.png',
        initialCost: 40,
        properties: {
            strength: 10,
            physicalEndurance: 10,
            defence: 10,
            luck: 10
        }
    },

    {
        type: 'shield',
        rarity: 'common',
        name: 'Camo shield',
        src: './images/shop/shields/camo_shield.png',
        initialCost: 50,
        properties: {
            strength: 20,
            physicalEndurance: null,
            defence: 10,
            luck: 20
        }
    },

    {
        type: 'shield',
        rarity: 'common',
        name: 'Dazzler shield',
        src: './images/shop/shields/dazzler_shield.png',
        initialCost: 60,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: 30,
            luck: 30
        }
    },

    
    {
        type: 'shield',
        rarity: 'common',
        name: 'Double Armored Shield',
        src: './images/shop/shields/double_armored.png',
        initialCost: 60,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: 60,
            luck: null
        }
    },

    {
        type: 'shield',
        rarity: 'common',
        name: 'King Guard Shield',
        src: './images/shop/shields/king_guard.png',
        initialCost: 60,
        properties: {
            strength: 20,
            physicalEndurance: 10,
            defence: 20,
            luck: 10
        }
    },

    {
        type: 'shield',
        rarity: 'common',
        name: 'Pain Maker',
        src: './images/shop/shields/pain_maker.png',
        initialCost: 40,
        properties: {
            strength: 20,
            physicalEndurance: null,
            defence: 20,
            luck: null
        }
    },

    {
        type: 'shield',
        rarity: 'common',
        name: 'Runic Shield',
        src: './images/shop/shields/runic_shield.png',
        initialCost: 50,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: 10,
            luck: 40
        }
    },

    {
        type: 'shield',
        rarity: 'common',
        name: 'Sect Shield',
        src: './images/shop/shields/sect_shield.png',
        initialCost: 70,
        properties: {
            strength: 30,
            physicalEndurance: null,
            defence: 20,
            luck: 20
        }
    },

    {
        type: 'shield',
        rarity: 'common',
        name: 'Spinning Shield',
        src: './images/shop/shields/spinning_shield.png',
        initialCost: 70,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: 70,
            luck: null
        }
    },


    // legendary

    
    {
        type: 'shield',
        rarity: 'legendary',
        name: 'Skeleton Coffin',
        description: 'Shield filled with the souls of the fallen',
        src: './images/shop/shields/skeleton_coffin.png',
        initialCost: 120,
        properties: {
            strength: 30,
            physicalEndurance: null,
            defence: 90,
            luck: null
        }
    },

    {
        type: 'shield',
        rarity: 'legendary',
        name: 'Aether Fear',
        description: 'Not from earth',
        src: './images/shop/shields/aether_fear.png',
        initialCost: 190,
        properties: {
            strength: 60,
            physicalEndurance: 10,
            defence: 100,
            luck: 20
        }
    },

    {
        type: 'shield',
        rarity: 'legendary',
        name: 'Best friend',
        description: `Your new friend who will defend you in every situation even when you don't expect it`,
        src: './images/shop/shields/best_friend.png',
        initialCost: 140,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: 140,
            luck: null
        }
    },

    {
        type: 'shield',
        rarity: 'legendary',
        name: 'Angry Iron',
        description: `Instead of defending it attacks`,
        src: './images/shop/shields/angry_iron.png',
        initialCost: 130,
        properties: {
            strength: 80,
            physicalEndurance: 20,
            defence: 30,
            luck: null
        }
    },

    {
        type: 'shield',
        rarity: 'legendary',
        name: 'PCMR Shield',
        description: `Transparent shield with rgb lighting, protects nothing`,
        src: './images/shop/shields/pcmr_shild.png',
        initialCost: 1000,
        properties: {
            strength: null,
            physicalEndurance: null,
            defence: null,
            luck: null
        }
    },
]