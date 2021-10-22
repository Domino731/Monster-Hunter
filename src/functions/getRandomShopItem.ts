import { ShopItem } from '../types';
const cloneDeep = require('lodash.clonedeep');
/**
 *  get random shop item
 * @param data - array with items data needed to get random item
 */
export const getRandomShopItem = (data: ShopItem[]): ShopItem => cloneDeep(data[Math.floor(Math.random() * data.length)]);