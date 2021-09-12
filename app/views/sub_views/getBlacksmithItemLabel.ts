import { ShopItem } from '../../types';
export const getBlacksmithItemLabel = (item: ShopItem) => {
  console.log(item.description)
    return `
              <div class='market__itemInfo' id='blacksmith_item_info'>
                 <h3 class='market__itemTitle ${item.rarity === 'common' ? 'market__itemTitle-common' : 'market__itemTitle-legendary'}'>
                 
                 ${item.name}
              
                 </h3>
              
                 ${item.rarity === 'common' ? ` <strong class='market__itemRarity market__itemRarity-common'>Common</strong>` : `<strong class='market__itemRarity market__itemRarity-legendary'>Legendary</strong>`}
                 ${item.description !== undefined ? ` <p class='market__itemDsc'>'${item.description}' </p>` : ''}
                 <table class='market__itemStats'>
                   <tbody>
                     <tr>
                       <td>Strength</td>
                       <td>20 <strong>/+10</td>
                     </tr>
                     <tr>
                       <td>Physical endurance</td>
                       <td>20</td>
                     </tr>
                     <tr>
                       <td>Defence</td>
                       <td>20</td>
                     </tr>
                     <tr>
                       <td>Luck</td>
                       <td>20</td>
                     </tr>
                   </tbody>
                 </table>
             
                 <div class='market__itemPriceWrapper'>
                   <img class='market__itemPriceIcon' src='./images/coin.png' alt='coin'/>
                   <strong class='market__itemPrice'>2000</strong>
                 </div>

               </div>
    `
}