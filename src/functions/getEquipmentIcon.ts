/**
 * get an icon that represents a specific type of item
 * @param itemType - type of item (helmet, shield, special, weapon, chestPlate, gloves)
 * @returns 
 */
export const getEquipmentIconSrc = (itemType: string ) => {
    switch (itemType) {
        case 'helmet':
            return '/images/profile_equipment_helmet.png';

        case 'shield':
            return '/images/profile_equipment_shield.png';

        case 'special':
            return '/images/profile_equipment_special.png';

        case 'weapon':
            return '/images/profile_equipment_weapon.png';

        case 'chestPlate':
            return '/images/profile_equipment_armor.png';

        case 'gloves':
            return '/images/profile_equipment_gloves.png';

        default:
            return '';
    }
}