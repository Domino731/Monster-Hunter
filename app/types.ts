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
    type: 'helmet' | 'shield' | 'special' | 'weapon' | 'potion' | 'chestPlate' | 'gloves' | 'gold',
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
    nextLevelAt: number
    nick: string,
    guardPayout: number,
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
    stats: {
        damage: number,
        health: number,
        damageReduce: number
        critical: number
    }
    equipmentItems: ShopItem[]
    backpackItems: ShopItem[]
    lastVisit: Date
    newShopDate: Date
    status: 'free' | 'guard' | 'mission',
    guard: {
        current: Date | null
        start: Date | null
        end: Date | null
        payout: number | null
    }
    pet: null | PetData
    potions: {
        first: {
            id: string
            end: Date
        } | null
        second: {
            id: string
            end: Date
        } | null
    }
    description: string
    portrait: string
    exp: number
    wizardWheelSpin: boolean
    magicWheel: {
        items: ShopItem[]
        wonItem: ShopItem
    }
    availableMissions: MissionData[]
}

export interface PetProperties{
    travelTime: number | null,
    defence: number | null,
    physicalEndurance: number | null,
    strength: number | null,
    luck: number | null
}
export interface PetData {
    name: string,
    imgSrc: string,
    imgSmallSrc: string,
    initialCost: number,
    properties: PetProperties
    id: string,
    rentEnd?: Date
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
export interface FullUserStats{
    strength: number,
    damage: number,
    physicalEndurance: number,
    health: number,
    defence: number
    damageReduce: number,
    luck: number,
    critical: number
}
export interface MissionData {
    exp: number,
    gold: number,
    title: string,
    dsc: string,
    id: string
    time: number
    papyrus: string,
    monster: MonsterData
}
export interface MonsterData {
    src: string
    strength: number,
    damage: number,
    physicalEndurance: number,
    health: number,
    defence: number
    damageReduce: number,
    luck: number,
    critical: number
}