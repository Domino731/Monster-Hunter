import { ShopItem, UserStats } from '../types';
import { helmetsData } from '../properties/shop/helmets';
import { chestplatesData } from '../properties/shop/chestplates';
import { glovesData } from '../properties/shop/gloves';
import { weaponsData } from '../properties/shop/weapons';
import { shieldsData } from '../properties/shop/shields';
import { getRandomShopItem } from './getRandomShopItem';
import { setItemStats } from './setItemStats';
import { specialItemsData } from '../properties/shop/special';
import uniqid from 'uniqid';
const cloneDeep = require('lodash.clonedeep');
/**
 * get array with random items data for blacksmith section (item data is based on user stats and guard payout)
 * @param rawStats - raw stats needed to sets stats of items
 * @param guardPayout - guard payout value needed to set price of item
 */
export const getBlacksmithItems = (rawStats: UserStats, guardPayout: number): ShopItem[] => {

      // array with shop items, base on which shop will be created
      let shopItems: ShopItem[] = [];

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
      // random special item 
      shopItems.push(getRandomShopItem(specialItemsData));

      // shuffle the shopItems array
      shopItems = shopItems.sort(() => Math.random() - .5);

      // set the item stats
      shopItems.forEach(el => {
            const random: number = (Math.floor(Math.random() * 10) + 1);
            el.properties.strength = setItemStats(el.properties.strength, rawStats.strength);
            el.properties.defence = setItemStats(el.properties.defence, rawStats.defence);
            el.properties.physicalEndurance = setItemStats(el.properties.defence, rawStats.defence);
            el.properties.luck = setItemStats(el.properties.luck, rawStats.luck);
            el.initialCost = Math.ceil(((el.initialCost + random) * guardPayout / 100)) + Math.ceil((el.initialCost / 5) * random / 10);
            el.id = uniqid();

      });

      return shopItems;

}