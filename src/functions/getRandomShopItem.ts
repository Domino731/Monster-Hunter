import { ShopItem } from '../types';

/**
 *  get random shop item
 * @param data - array with items data needed to get random item
 */
export const getRandomShopItem = (data: ShopItem[]): ShopItem => data[Math.floor(Math.random() * data.length)];