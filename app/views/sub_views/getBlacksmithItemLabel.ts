import { ShopItem } from '../../types';
import { allMarketItems } from '../../properties/shop/allMarketItems';
import { compareStats } from './compareStats';
export const getBlacksmithItemLabel = (item: ShopItem, currentItem: HTMLElement) => {

    const compareItem: ShopItem | undefined =  allMarketItems[allMarketItems.findIndex(el => el.id === currentItem.dataset.currentItemId)];  

       if(compareItem === undefined){
         return `
              <div class='market__itemInfo' id='blacksmith_item_info'>
                 <h3 class='market__itemTitle ${item.rarity === 'common' ? 'market__itemTitle-common' : 'market__itemTitle-legendary'}'>
                 
                 ${item.name}
              
                 </h3>
              
                 ${item.rarity === 'common' ? ` <strong class='market__itemRarity market__itemRarity-common'>Common</strong>` : `<strong class='market__itemRarity market__itemRarity-legendary'>Legendary</strong>`}
                 ${item.description !== undefined ? ` <p class='market__itemDsc'>'${item.description}' </p>` : ''}
                 <table class='market__itemStats'>
                   <tbody>


                   ${ item.properties.strength !== null ? `<tr>
                       <td>Strength</td>
                       <td>${item.properties.strength}</td>
                     </tr>` : ''}
                 
                      

                    ${ item.properties.physicalEndurance !== null ? 
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
    `
       }
       else{
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
                       <td>${item.properties.strength} ${compareItem.properties.strength !== null ? compareStats(item.properties.strength, compareItem.properties.strength) : ''}</td>
                     </tr>` : ''}
                 
                      

                    ${item.properties.physicalEndurance !== null ? 
                      `<tr>
                        <td>Physical endurance</td>
                        <td>${item.properties.physicalEndurance} ${compareItem.properties.physicalEndurance !== null ? compareStats(item.properties.physicalEndurance, compareItem.properties.physicalEndurance) : ''}</td>
                       </tr>` 
                     : ``}   
                    
                     ${item.properties.defence !== null ? ` 
                     <tr>
                       <td>Defence</td>
                       <td>${item.properties.defence} ${compareItem.properties.defence !== null ? compareStats(item.properties.defence, compareItem.properties.defence) : ''}</td>
                     </tr>` 
                     : ``}
                     
                     ${item.properties.luck !== null ? `
                     <tr>
                       <td>Luck</td>
                       <td>${item.properties.luck} ${compareItem.properties.luck !== null ? compareStats(item.properties.luck, compareItem.properties.luck) : ''}</td>
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
    `

       }
    
}

// `
//               <div class='market__itemInfo' id='blacksmith_item_info'>
//                  <h3 class='market__itemTitle ${item.rarity === 'common' ? 'market__itemTitle-common' : 'market__itemTitle-legendary'}'>
                 
//                  ${item.name}
              
//                  </h3>
              
//                  ${item.rarity === 'common' ? ` <strong class='market__itemRarity market__itemRarity-common'>Common</strong>` : `<strong class='market__itemRarity market__itemRarity-legendary'>Legendary</strong>`}
//                  ${item.description !== undefined ? ` <p class='market__itemDsc'>'${item.description}' </p>` : ''}
//                  <table class='market__itemStats'>
//                    <tbody>


//                    ${item.properties.strength !== undefined && item.properties.strength !== null ? `<tr>
//                        <td>Strength</td>
//                        <td>${12} ${compareItem.properties.strength !== undefined ? compareStats(item, compareItem, 'strength') : ''}</td>
//                      </tr>` : ''}
                 
                      

//                     ${item.properties.physicalEndurance !== undefined && compareItem.properties.physicalEndurance !== undefined ? 
//                       `<tr>
//                         <td>Physical endurance</td>
//                         <td>${12} ${compareItem.properties.physicalEndurance !== undefined ? compareStats(item, compareItem, 'physicalEndurance') : ''}</td>
//                        </tr>` 
//                      : ``}   
                    
//                      ${item.properties.defence !== undefined  && compareItem.properties.defence !== undefined ? ` 
//                      <tr>
//                        <td>Defence</td>
//                        <td>${123} ${compareItem.properties.defence !== undefined ? compareStats(item, compareItem, 'defence') : ''}</td>
//                      </tr>` 
//                      : ``}
                     
//                      ${item.properties.luck !== undefined && compareItem.properties.luck !== undefined ? `
//                      <tr>
//                        <td>Luck</td>
//                        <td>${13333} ${compareItem.properties.luck !== undefined ? compareStats(item, compareItem, 'luck') : ''}</td>
//                      </tr>
//                      `
//                     : ``}
                     


//                    </tbody>
//                  </table>
             
//                  <div class='market__itemPriceWrapper'>
//                    <img class='market__itemPriceIcon' src='./images/coin.png' alt='coin'/>
//                    <strong class='market__itemPrice'>2000</strong>
//                  </div>

//                </div>
//     `