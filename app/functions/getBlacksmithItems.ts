import { ShopItem, UserStats } from '../types';
import { helmetsData } from '../properties/shop/helmets';
import { chestplatesData } from '../properties/shop/chestplates';
import { glovesData } from '../properties/shop/gloves';
import { weaponsData } from '../properties/shop/weapons';
import { shieldsData } from '../properties/shop/shields';
import { getRandomShopItem } from './getRandomShopItem';
import { setItemStats } from './setItemStats';
export const getBlacksmithItems = (rawStats : UserStats) : ShopItem[] => {
       // array with shop items, base on which shop will be created
       let shopItems: ShopItem[] = []

       // pushing random equipment items

       // random helmet
       shopItems.push(getRandomShopItem(helmetsData));
       // random chest plate
       shopItems.push(getRandomShopItem(chestplatesData));
       // random gloves
       shopItems.push(getRandomShopItem(glovesData));
       // random weapon
       shopItems.push(getRandomShopItem(weaponsData));
       // random shield
       shopItems.push(getRandomShopItem(shieldsData));

       // Blacksmith shop has 6 slots, shopItems array has only 5 items, so its need to get one more random item 
       const randomItems: ShopItem[] = [];

       // random helmet
       randomItems.push(getRandomShopItem(helmetsData));
       // random chest plate
       randomItems.push(getRandomShopItem(chestplatesData));
       // random gloves
       randomItems.push(getRandomShopItem(glovesData));
       // random weapon
       randomItems.push(getRandomShopItem(weaponsData));
       // random shield
       randomItems.push(getRandomShopItem(shieldsData));

       // push last item to shopItems array
       shopItems.push(getRandomShopItem(randomItems));

       // shuffle the shopItems array
       shopItems = shopItems.sort(() => Math.random() - .5);

       // set the item stats
       shopItems.forEach(el => {
          el.properties.strength = setItemStats(el.properties.strength, rawStats.strength),
             el.properties.defence = setItemStats(el.properties.defence, rawStats.defence),
             el.properties.physicalEndurance = setItemStats(el.properties.defence, rawStats.defence),
             el.properties.luck = setItemStats(el.properties.luck, rawStats.luck)
       });

       return shopItems;

}