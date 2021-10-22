import { ShopItem } from '../../types';
import { chestplatesData } from './chestplates';
import { glovesData } from './gloves';
import { helmetsData } from './helmets';
import { shieldsData } from './shields';
import { specialItemsData } from './special';
import { weaponsData } from './weapons';
/**
 *  array with data about all blacksmith items
 */
export const allBlacksmithMarketItems : ShopItem[] = [
    ...chestplatesData, 
    ...glovesData, 
    ...helmetsData,
    ...shieldsData, 
    ...weaponsData,
    ...specialItemsData
    ];
