// import { ShopItem } from '../../types';
// export const compareStats = (item: ShopItem, compareItem: ShopItem | undefined): string => {
//     console.log(item.properties)
//     console.log('in shop', item.properties.strength, 'equip',compareItem.properties.strength)
//     if (compareItem !== undefined) {
//         console.log(item.properties.strength - compareItem.properties.strength)
//         if (item.properties.strength !== null && compareItem.properties.strength !== null && item.properties.strength > compareItem.properties.strength) {
//             return `<strong class='better'>/ +${item.properties.strength - compareItem.properties.strength}</strong>`
//         }
//         else if (item.properties.strength !== null && compareItem.properties.strength !== null && item.properties.strength < compareItem.properties.strength) {
//             return `<strong class='worse'>/ ${item.properties.strength - compareItem.properties.strength}</strong>`
//         }
//     }


// }
import { ShopItem } from '../../types';
export const compareStats = (item: ShopItem, compareItem: ShopItem | undefined, key: 'strength' | 'physicalEndurance' | 'defence' | 'luck'): string => {
    if (compareItem !== undefined &&  item !== undefined && item.properties[key] !== null && compareItem.properties[key] !== null) {
        const difference = item.properties[key] - compareItem.properties[key]
        if (item.properties[key] !== null && compareItem.properties[key] !== null && item.properties[key] > compareItem.properties[key]) {
            
            return `<strong class='better'>/ +${difference}</strong>`
        }
        else if (item.properties[key] !== null && compareItem.properties[key] !== null && item.properties[key] < compareItem.properties[key]) {
            return `<strong class='worse'>/ ${difference}</strong>`
        }
    }


}