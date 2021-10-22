import { PetData } from '../../types';
/**
 * array with pets data
 */
export const petsData : PetData[] =[
    {
        name: 'cat',
        imgSrc: './images/pet_cat.png',
        imgSmallSrc: './images/pet_cat_small.png',
        initialCost: 0.5,
        properties: {
            travelTime: 10,
            luck: 5,
            defence: null,
            strength: null,
            physicalEndurance: null
        },
        id: `11b2be9f-4879-484d-9a8a-e5b801592fde`
    },
    {
        name: 'scorpion',
        imgSrc: './images/pet_scorpion.png',
        imgSmallSrc: './images/pet_scorpion_small.png',
        initialCost: 10,
        properties: {
            travelTime: 25,
            defence: 10,
            physicalEndurance: null,
            strength: null,
            luck: null
        },
        id: `40e5a642-a861-4395-9cb7-053bff579d8d`
    },
    {
        name: 'cheetah',
        imgSrc: './images/pet_cheetah.png',
        imgSmallSrc: './images/pet_cheetah_small.png',
        initialCost: 15,
        properties: {
            travelTime: 50,
            defence: 10,
            physicalEndurance: 10,
            strength: null,
            luck: null
        },
        id: `1ae08920-976d-4c75-920c-398b81c80e6e`
    },
    {
        name: 'dragon',
        imgSrc: './images/pet_dragon.png',
        imgSmallSrc: './images/pet_dragon_small.png',
        initialCost: 25,
        properties: {
            travelTime: 50,
            defence: 10,
            physicalEndurance: 10,
            strength: 10,
            luck: 10
        },
        id: `ad266f93-8a66-47b8-a5a9-1ec9383ad7e7`
    },

]