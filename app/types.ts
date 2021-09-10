export interface route{
    path: string,
    view: any
}
export interface potion{
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
export interface chestPlate{
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