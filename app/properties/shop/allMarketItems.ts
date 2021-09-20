import { ShopItem } from '../../types';
import { chestplatesData } from './chestplates';
import { glovesData } from './gloves';
import { helmetsData } from './helmets';
import { potionsData } from './potions';
import { shieldsData } from './shields';
import { specialItemsData } from './special';
import { weaponsData } from './weapons';

export const allBlacksmithMarketItems : ShopItem[] = [
    ...chestplatesData, 
    ...glovesData, 
    ...helmetsData,
    ...shieldsData, 
    ...weaponsData,
    ...specialItemsData
    ];
