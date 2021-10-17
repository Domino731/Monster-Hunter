import { compareStats } from './compareStats';
import { ShopItem } from '../types';

/**
 * get html code for item label with informations about this item
 * @param item - data about the item on the basis of which the label will be created
 * @param currentItem - data about the actual item in the equipment, needed to compare selected item to current item in equipment
 */
export const getBlacksmithItemLabel = (item: ShopItem, currentItem: ShopItem): string => {


  // user may have an empty slot in the equipment 
  if (currentItem === undefined) {
    return `
              <div class='market__itemInfo' id='blacksmith_item_info'>
                 <h3 class='market__itemTitle ${item.rarity === 'common' ? 'market__itemTitle-common' : 'market__itemTitle-legendary'}'>
                 
                 ${item.name}
              
                 </h3>
              
                 ${item.rarity === 'common' ? ` <strong class='market__itemRarity market__itemRarity-common'>Common</strong>` : `<strong class='market__itemRarity market__itemRarity-legendary'>Legendary</strong>`}
                 ${item.description !== undefined ? ` <p class='market__itemDsc'>'${item.description}' </p>` : ''}
                 <table class='market__itemStats'>
                   <tbody>

                   ${item.properties.strength !== null ? `<tr>
                       <td>Strength</td>
                       <td>${item.properties.strength}</td>
                     </tr>` : ''}
                 
                      

                    ${item.properties.physicalEndurance !== null ?
        `<tr>
                        <td>Physical endurance</td>
                        <td>${item.properties.physicalEndurance}</td>
                       </tr>`
        : ``}   
                    
                     ${item.properties.defence !== null ? ` 
                     <tr>
                       <td>Defence</td>
                       <td>${item.properties.defence}</td>
                     </tr>`
        : ``}
                     
                     ${item.properties.luck !== null ? `
                     <tr>
                       <td>Luck</td>
                       <td>${item.properties.luck}</td>
                     </tr>
                     `
        : ``}
                     
                   </tbody>
                 </table>
             
                 <div class='market__itemPriceWrapper'>
                   <img class='market__itemPriceIcon' src='./images/coin.png' alt='coin'/>
                   <strong class='market__itemPrice'>${item.initialCost}</strong>
                 </div>

               </div>
    `;
  }
  else {
    return `
              <div class='market__itemInfo' id='blacksmith_item_info'>
                 <h3 class='market__itemTitle ${item.rarity === 'common' ? 'market__itemTitle-common' : 'market__itemTitle-legendary'}'>
                 
                 ${item.name}
              
                 </h3>
              
                 ${item.rarity === 'common' ? ` <strong class='market__itemRarity market__itemRarity-common'>Common</strong>` : `<strong class='market__itemRarity market__itemRarity-legendary'>Legendary</strong>`}
                 ${item.description !== undefined ? ` <p class='market__itemDsc'>'${item.description}' </p>` : ''}
                 <table class='market__itemStats'>
                   <tbody>


                   ${item.properties.strength !== null ? `<tr>
                       <td>Strength</td>
                       <td>${item.properties.strength} ${currentItem.properties.strength !== null ? compareStats(item.properties.strength, currentItem.properties.strength) : ''}</td>
                     </tr>` : ''}
                 
                      

                    ${item.properties.physicalEndurance !== null ?
        `<tr>
                        <td>Physical endurance</td>
                        <td>${item.properties.physicalEndurance} ${currentItem.properties.physicalEndurance !== null ? compareStats(item.properties.physicalEndurance, currentItem.properties.physicalEndurance) : ''}</td>
                       </tr>`
        : ``}   
                    
                     ${item.properties.defence !== null ? ` 
                     <tr>
                       <td>Defence</td>
                       <td>${item.properties.defence} ${currentItem.properties.defence !== null ? compareStats(item.properties.defence, currentItem.properties.defence) : ''}</td>
                     </tr>`
        : ``}
                     
                     ${item.properties.luck !== null ? `
                     <tr>
                       <td>Luck</td>
                       <td>${item.properties.luck} ${currentItem.properties.luck !== null ? compareStats(item.properties.luck, currentItem.properties.luck) : ''}</td>
                     </tr>
                     `
        : ``}
                     
                   </tbody>
                 </table>
             
                 <div class='market__itemPriceWrapper'>
                   <img class='market__itemPriceIcon' src='./images/coin.png' alt='coin'/>
                   <strong class='market__itemPrice'>${item.initialCost}</strong>
                 </div>

               </div>
    `;
  }

}

