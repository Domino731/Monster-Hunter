import { potionsData } from '../properties/shop/potions';
import { FullUserStats, PetProperties, SearchedUserData, ShopItem, UserData } from '../types';
export const getFullUserStats = (userData: UserData | SearchedUserData) : FullUserStats => {
      // reset stats
      const userStats : FullUserStats = {
        strength: 0,
        damage: 0,
        physicalEndurance: 0,
        health: 0,
        defence: 0,
        damageReduce: 0,
        luck: 0,
        critical: 0
     }
      // strenght
      userStats.strength = userData.rawStats.strength;
      userStats.damage = Math.floor(userStats.strength * 0.7);
      // luck
      userStats.luck = userData.rawStats.luck;
      userStats.critical = userStats.critical = Math.floor(userStats.luck * 0.3);
      // pe
      userStats.physicalEndurance = userData.rawStats.physicalEndurance;
      userStats.health =  Math.floor(userStats.physicalEndurance * 0.8);
      // defence
      userStats.defence = userData.rawStats.defence;
      userStats.damageReduce = Math.floor(userStats.defence * 0.5);




     // by equipment
     userData.equipmentItems.forEach(el => {
        
        if (el.properties.strength !== null) {
           userStats.strength += el.properties.strength;
           userStats.damage += Math.floor(userStats.strength * 0.7);
        }
        if (el.properties.luck !== null) {
           userStats.luck += el.properties.luck;
           userStats.critical += Math.floor(userStats.luck * 0.3);
        }
        if (el.properties.physicalEndurance !== null) {
           userStats.physicalEndurance = el.properties.physicalEndurance;
           userStats.health += Math.floor(userStats.physicalEndurance * 0.8);
        }
        if (el.properties.defence !== null) {
           userStats.defence += el.properties.defence;
           userStats.damageReduce = Math.floor(userStats.defence * 0.5);
        }
     });

     // by pet
     if (userData.pet !== null) {
        const petProps: PetProperties = userData.pet.properties
        if (petProps.strength !== null) {
           userStats.strength += Math.floor(userData.rawStats.strength * (petProps.strength / 100));
           userStats.damage = Math.floor(userStats.strength * 0.7);
        }
        if (petProps.luck !== null) {
           userStats.luck += Math.floor(userData.rawStats.luck * (petProps.luck / 100));
           userStats.critical = Math.floor(userStats.luck * 0.3);
        }
        if (petProps.physicalEndurance !== null) {
           userStats.physicalEndurance += Math.floor(userData.rawStats.physicalEndurance * (petProps.physicalEndurance / 100));
           userStats.health = Math.floor(userStats.physicalEndurance * 0.8);
        }
        if (petProps.defence !== null) {
           userStats.defence += Math.floor(userData.rawStats.defence * (petProps.defence / 100));
           userStats.damageReduce = Math.floor(userStats.defence * 0.5);
        }
     }

     // by potions       

        // first potion
        if (userData.potions.first !== null) {
             const potion: ShopItem | undefined = potionsData[potionsData.findIndex(el => el.id === userData.potions.first.id)];
            if (potion.properties.strength !== null) {
               userStats.strength += Math.floor(userData.rawStats.strength * (potion.properties.strength / 100));
               userStats.damage = Math.floor(userStats.strength * 0.7);
            }
            if (potion.properties.luck !== null) {
               userStats.luck += Math.floor(userData.rawStats.luck * (potion.properties.luck / 100));
               userStats.critical = Math.floor(userStats.luck * 0.3);
            }
            if (potion.properties.physicalEndurance !== null) {
               userStats.physicalEndurance +=  Math.floor(userData.rawStats.physicalEndurance * (potion.properties.physicalEndurance / 100));
               userStats.health = Math.floor(userStats.physicalEndurance * 0.8);
            }
            if (potion.properties.defence !== null) {
               userStats.defence +=  Math.floor(userData.rawStats.defence * (potion.properties.defence / 100));
               userStats.damageReduce = Math.floor(userStats.defence * 0.5);
            }
         }
         // second potion
         if (userData.potions.second !== null) {
            const potion: ShopItem | undefined = potionsData[potionsData.findIndex(el => el.id === userData.potions.second.id)];
            if (potion.properties.strength !== null) {
               userStats.strength += Math.floor(userData.rawStats.strength * (potion.properties.strength / 100));
               userStats.damage = Math.floor(userStats.strength * 0.7);
            }
            if (potion.properties.luck !== null) {
               userStats.luck += Math.floor(userData.rawStats.luck * (potion.properties.luck / 100));
               userStats.critical = Math.floor(userStats.luck * 0.3);
            }
            if (potion.properties.physicalEndurance !== null) {
               userStats.physicalEndurance +=  Math.floor(userData.rawStats.physicalEndurance * (potion.properties.physicalEndurance / 100));
               userStats.health = Math.floor(userStats.physicalEndurance * 0.8);
            }
            if (potion.properties.defence !== null) {
               userStats.defence +=  Math.floor(userData.rawStats.defence * (potion.properties.defence / 100));
               userStats.damageReduce = Math.floor(userStats.defence * 0.5);
            }
   
         }
     return userStats
}