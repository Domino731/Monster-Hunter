import { ShopItem } from '../../types';
import { chestplatesData } from './chestplates';
import { glovesData } from './gloves';
import { helmetsData } from './helmets';
import { potionsData } from './potions';
import { shieldsData } from './shields';
import { specialItemsData } from './special';
import { weaponsData } from './weapons';

export const allMarketItems : ShopItem[] = [...chestplatesData, 
    ...glovesData, 
    ...helmetsData,
     ...potionsData, 
     ...shieldsData, 
     ...specialItemsData, 
     ...weaponsData];