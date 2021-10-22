import { ShopItem } from '../../types';
/**
 *  array with data about available shields
 */
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
        },
        id: '4ed68396-4dbe-44c3-b330-3240f85a375e'
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
        },
        id: 'fde5a925-18ed-4bdb-8aec-74f94ec29c03'
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
        },
        id: '7b32fe2c-e930-4ecd-8435-c17a5ea11b58'
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
        },
        id: 'a97c3288-63ad-4fe1-8a21-552eb323e043'
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
        },
        id: '756140a9-9613-481d-819a-f58a6b0e19fa'
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
        },
        id: '0a11d865-0df5-40ea-a12e-90cbb78842d0'
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
        },
        id: '9b44c27c-cc15-483a-8d0d-1ce1ce3f3f62'
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
        },
        id: '6ba7e35b-a965-44b8-b8e2-748d0bc63657'
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
        },
        id: 'a0335e26-4d79-4c80-9514-b8bb570dd04c'
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
        },
        id: '6ac498c4-c420-4057-8bd5-46f4bc861eaa'
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
        },
        id: '32f314e9-f472-4987-8f95-af0668b2c543'
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
        },
        id: '357e6434-d2f3-4cbf-b7dd-73cf95e29fa3'
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
        },
        id: 'f481aad5-10b4-4dfa-9f76-429e469b0760'
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
        },
        id: '50ebdd07-8ed0-448c-a763-0239323728d6'
    },
];