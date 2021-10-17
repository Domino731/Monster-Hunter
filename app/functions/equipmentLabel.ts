import { ShopItem } from "../types"

/**
 * get html code for the equipment label (for profile section)
 * @param item - data about the item on the basis of which the label will be created
 */
export const getProfileEquipmentLabel = (itemData: ShopItem) : string => {
    return `
    <h3 class='market__itemTitle itemTitle ${itemData.rarity === 'legendary' ? 'market__itemTitle-legendary' : 'market__itemTitle-common'}'>${itemData.name}</h3>
                          <strong class='market__itemRarity itemRarity  ${itemData.rarity === 'legendary' ? 'market__itemRarity-legendary' : 'market__itemRarity-common'}'>${itemData.rarity}</strong>
                          ${itemData.description !== undefined ? `<p class='market__itemDsc itemDsc'>'${itemData.description}' </p>` : ``}
                          <table class='market__itemStats itemStats'>
                          <tbody>
             
                          ${itemData.properties.strength !== null ? 
                          `<tr>
                              <td>Strength</td>
                              <td>${itemData.properties.strength}</td>
                            </tr>`
                          : 
                          ``
                          }
                           
                        
                          ${itemData.properties.physicalEndurance !== null ? 
                            `<tr>
                                <td>Physical endurance</td>
                                <td>${itemData.properties.physicalEndurance}</td>
                              </tr>`
                            : 
                            ``
                            }
                             
                            ${itemData.properties.defence !== null ? 
                                `<tr>
                                    <td>Defence</td>
                                    <td>${itemData.properties.defence}</td>
                                  </tr>`
                                : 
                                ``
                                }
                                                                                                                    
                            ${itemData.properties.luck !== null ? 
                                `<tr>
                                    <td>Luck</td>
                                    <td>${itemData.properties.luck}</td>
                                </tr>`
                                : 
                                ``
                                }                                  
                          </tbody>
                        </table>
                        <div class='profile__actionError' id='profile_equipment_move_item_error'></div>
                        <div class='profile__actionWrapper' id='profile_equipment_move_item_btn'>
                          <img src='./images/profile_icon_backpack.png' class='profile__equipmentItemSellIcon'/>
                          <strong class='profile__actionName'>Move to backpack</strong>
                        </div>
    `
}

export const getBlacksmithEquipmentLabel = (itemData: ShopItem) : string => {
  return `
    <h3 class='market__itemTitle itemTitle ${itemData.rarity === 'legendary' ? 'market__itemTitle-legendary' : 'market__itemTitle-common'}'>${itemData.name}</h3>
                          <strong class='market__itemRarity itemRarity  ${itemData.rarity === 'legendary' ? 'market__itemRarity-legendary' : 'market__itemRarity-common'}'>${itemData.rarity}</strong>
                          ${itemData.description !== undefined ? `<p class='market__itemDsc itemDsc'>'${itemData.description}' </p>` : ``}
                          <table class='market__itemStats itemStats'>
                          <tbody>
             
                          ${itemData.properties.strength !== null ? 
                          `<tr>
                              <td>Strength</td>
                              <td>${itemData.properties.strength}</td>
                            </tr>`
                          : 
                          ``
                          }
                           
                        
                          ${itemData.properties.physicalEndurance !== null ? 
                            `<tr>
                                <td>Physical endurance</td>
                                <td>${itemData.properties.physicalEndurance}</td>
                              </tr>`
                            : 
                            ``
                            }
                             
                            ${itemData.properties.defence !== null ? 
                                `<tr>
                                    <td>Defence</td>
                                    <td>${itemData.properties.defence}</td>
                                  </tr>`
                                : 
                                ``
                                }
                                                                                                                    
                            ${itemData.properties.luck !== null ? 
                                `<tr>
                                    <td>Luck</td>
                                    <td>${itemData.properties.luck}</td>
                                </tr>`
                                : 
                                ``
                                }                                  
                          </tbody>
                        </table>
                        <div class='profile__actionError' id='profile_equipment_move_item_error'></div>
                        <div class='profile__actionWrapper' id='profile_equipment_move_item_btn'>
                          <img src='./images/profile_icon_backpack.png' class='profile__equipmentItemSellIcon'/>
                          <strong class='profile__actionName'>Move to backpack</strong>
                        </div>
                        `
}