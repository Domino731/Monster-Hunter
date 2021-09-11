import { ShopItem } from '../types';
export const getRandomShopItem = (data: ShopItem[]) : ShopItem => data[Math.floor(Math.random() * data.length)];