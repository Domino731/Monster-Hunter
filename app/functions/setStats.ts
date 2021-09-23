import { potionsData } from '../properties/shop/potions';
import { FullUserStats, PetProperties, SearchedUserData, ShopItem, UserData } from '../types';

// set user's stastistics based on equipments, pet, potions and raw base stats
export const setUserStats = (user: SearchedUserData | UserData, stats: FullUserStats): FullUserStats => {
    // by raw stats
    stats.damage = Math.floor(stats.strength * 0.7);
    stats.critical = Math.floor(stats.luck * 0.3);
    stats.health = Math.floor(stats.physicalEndurance * 0.8);
    stats.damageReduce = Math.floor(stats.defence * 0.5);
    // by equipment
    user.equipmentItems.forEach(el => {
        if (el.properties.strength !== null) {
            stats.strength = Math.floor(user.rawStats.strength + el.properties.strength);
            stats.damage = Math.floor(stats.strength * 0.7);
        }
        if (el.properties.luck !== null) {
            stats.luck = Math.floor(user.rawStats.luck + el.properties.luck);
            stats.critical = Math.floor(stats.luck * 0.3);
        }
        if (el.properties.physicalEndurance !== null) {
            stats.physicalEndurance = Math.floor(user.rawStats.physicalEndurance + el.properties.physicalEndurance);
            stats.health = Math.floor(stats.physicalEndurance * 0.8);
        }
        if (el.properties.defence !== null) {
            stats.defence = Math.floor(user.rawStats.defence + el.properties.defence);
            stats.damageReduce = Math.floor(stats.defence * 0.5);
        }
    });
    // by pet
    if (user.pet !== null) {
        const petProps: PetProperties = user.pet.properties
        if (petProps.strength !== null) {
            stats.strength = stats.strength + Math.floor(user.rawStats.strength * (petProps.strength / 100));
            stats.damage = Math.floor(stats.strength * 0.7);
        }
        if (petProps.luck !== null) {
            stats.luck = stats.luck + Math.floor(user.rawStats.luck * (petProps.luck / 100));
            stats.critical = Math.floor(stats.luck * 0.3);
        }
        if (petProps.physicalEndurance !== null) {
            stats.physicalEndurance = stats.physicalEndurance + Math.floor(user.rawStats.physicalEndurance * (petProps.physicalEndurance / 100));
            stats.health = Math.floor(stats.physicalEndurance * 0.8);
        }
        if (petProps.defence !== null) {
            stats.defence = stats.defence + Math.floor(user.rawStats.defence * (petProps.defence / 100));
            stats.damageReduce = Math.floor(stats.defence * 0.5);
        }
    }
    // by potions       
    const firstPotion: ShopItem | undefined = potionsData[potionsData.findIndex(el => user.potions.first)];
    const secondPotion: ShopItem | undefined = potionsData[potionsData.findIndex(el => user.potions.second)];
    // first potion
    if (firstPotion !== undefined) {
        if (firstPotion.properties.strength !== null) {
            stats.strength = stats.strength + Math.floor(user.rawStats.strength * (firstPotion.properties.strength / 100));
            stats.damage = Math.floor(stats.strength * 0.7);
        }
        if (firstPotion.properties.luck !== null) {
            stats.luck = stats.strength + Math.floor(user.rawStats.luck * (firstPotion.properties.luck / 100));
            stats.critical = Math.floor(stats.luck * 0.3);
        }
        if (firstPotion.properties.physicalEndurance !== null) {
            stats.physicalEndurance = stats.strength + Math.floor(user.rawStats.physicalEndurance * (firstPotion.properties.physicalEndurance / 100));
            stats.health = Math.floor(stats.physicalEndurance * 0.8);
        }
        if (firstPotion.properties.defence !== null) {
            stats.defence = stats.strength + Math.floor(user.rawStats.defence * (firstPotion.properties.defence / 100));
            stats.damageReduce = Math.floor(stats.defence * 0.5);
        }
    }
    // second potion
    if (secondPotion !== undefined) {
        if (secondPotion.properties.strength !== null) {
            stats.strength = stats.strength + Math.floor(user.rawStats.strength * (secondPotion.properties.strength / 100));
            stats.damage = Math.floor(stats.strength * 0.7);
        }
        if (secondPotion.properties.luck !== null) {
            stats.luck = stats.strength + Math.floor(user.rawStats.luck * (secondPotion.properties.luck / 100));
            stats.critical = Math.floor(stats.luck * 0.3);
        }
        if (secondPotion.properties.physicalEndurance !== null) {
            stats.physicalEndurance = stats.strength + Math.floor(user.rawStats.physicalEndurance * (secondPotion.properties.physicalEndurance / 100));
            stats.health = Math.floor(stats.physicalEndurance * 0.8);
        }
        if (secondPotion.properties.defence !== null) {
            stats.defence = stats.strength + Math.floor(user.rawStats.defence * (secondPotion.properties.defence / 100));
            stats.damageReduce = Math.floor(stats.defence * 0.5);
        }
    }
    return stats;
}