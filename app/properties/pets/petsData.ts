import { PetsData } from '../../types';
export const petsData : PetsData[] =[
    {
        name: 'cat',
        imgSrc: './images/pet_cat.png',
        initialCost: 0.5,
        properties: {
            travelTime: 10,
            luck: 5,
            defense: null,
            strenght: null,
            physicalEndurance: null
        }
    },
    {
        name: 'scorpion',
        imgSrc: './images/pet_scorpion.png',
        initialCost: 10,
        properties: {
            travelTime: 25,
            defense: 10,
            physicalEndurance: null,
            strenght: null,
            luck: null
        }
    },
    {
        name: 'cheetah',
        imgSrc: './images/pet_cheetah.png',
        initialCost: 15,
        properties: {
            travelTime: 50,
            defense: 10,
            physicalEndurance: 10,
            strenght: null,
            luck: null
        }
    },
    {
        name: 'dragon',
        imgSrc: './images/pet_dragon.png',
        initialCost: 25,
        properties: {
            travelTime: 50,
            defense: 10,
            physicalEndurance: 10,
            strenght: 10,
            luck: 10
        }
    },

]