import { Blacksmith } from './views/blacksmith';
export interface route{
    path: string,
    view: any
}
export interface Potion{
    type: 'potion',
    src: string,
    name: string,
    description?: string,
    initialCost: number,
    properties: {
        strength: number | null,
        physicalEndurance: number | null,
        defence: number | null,
        luck: number | null
    }
}
export interface ChestPlate{
    type: 'chestPlate',
    name: string,
    rarity: 'common' | 'legendary',
    src: string,
    description?: string,
    initialCost: number,
    properties: {
        strength: number | null,
        physicalEndurance: number | null,
        defence: number | null,
        luck: number | null
    }
}

export interface Gloves{
    type: 'gloves',
    name: string,
    rarity: 'common' | 'legendary',
    src: string,
    description?: string,
    initialCost: number,
    properties: {
        strength: number | null,
        physicalEndurance: number | null,
        defence: number | null,
        luck: number | null
    }
}
export interface ShopItem{
    type: 'helmet' | 'shield' | 'special' | 'weapon' | 'potion' | 'chestPlate' | 'gloves',
    name: string,
    rarity: 'common' | 'legendary',
    src: string,
    description?: string,
    initialCost: number,
    properties: {
        strength: number | null,
        physicalEndurance: number | null,
        defence: number | null,
        luck: number | null
    }
    id: string
}
export interface UserData {
    level: number,
    nick: string,
    guardPayment: number,
    gold: number,
    shop: {
        blacksmith: null | ShopItem[],
        wizard: null | ShopItem[]
    },
    shopPicks: {
        blacksmith: null |  AvailableMarketPicks[],
        wizard: null |  AvailableMarketPicks[]
    }
    rawStats: {
        strength: number 
        physicalEndurance: number 
        defence: number
        luck: number
    }
    equipmentItems: ShopItem[]
    backpackItems: ShopItem[]
    lastVisit: Date
    newShopDate: Date
}



export interface AvailableMarketPicks {
    picks: number,
    index: number
}
export interface UserStats {
    strength: number 
    physicalEndurance: number 
    defence: number
    luck: number
}