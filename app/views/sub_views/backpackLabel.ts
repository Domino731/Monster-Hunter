import { ShopItem } from "../../types"
import { compareStats } from "./compareStats"

export const getProfileBackpackLabel = (item: ShopItem, currentItem: ShopItem) : string => {
    if (currentItem === undefined) {
        return `

        <h3 class='market__itemTitle itemTitle ${item.rarity === 'common' ? 'market__itemTitle-common' : 'market__itemTitle-legendary'}'>
        
        ${item.name}
        </h3>
        
        ${item.rarity === 'common' ? ` <strong class='market__itemRarity itemRarity market__itemRarity-common'>Common</strong>` : `<strong class='market__itemRarity itemRarity market__itemRarity-legendary'>Legendary</strong>`}
        ${item.description !== undefined ? ` <p class='market__itemDsc itemDsc '>'${item.description}' </p>` : ''}
        <table class='market__itemStats itemStats'>
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

        <div class='profile__actionError' id='profile_backpack_move_item_error'></div>
        <div class='profile__actionWrapper' id='profile_backpack_move_item_btn'>
          <img src='./images/profile_icon_backpack.png' class='profile__equipmentItemSellIcon' id='profile_backpack_replace_item_icon'/>
          <strong class='profile__actionName'>Equip</strong>
        </div>
    
        `


    }
    else {
        return `

        
        <h3 class='market__itemTitle itemTitle ${item.rarity === 'common' ? 'market__itemTitle-common' : 'market__itemTitle-legendary'}'>
        
        ${item.name}
        </h3>
        ${item.rarity === 'common' ? ` <strong class='market__itemRarity itemRarity market__itemRarity-common'>Common</strong>` : `<strong class='market__itemRarity itemRarity market__itemRarity-legendary'>Legendary</strong>`}
        ${item.description !== undefined ? ` <p class='market__itemDsc itemDsc'>'${item.description}' </p>` : ''}
        <table class='market__itemStats itemStats'>
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

        <div class='profile__actionError' id='profile_backpack_move_item_error'></div>
        <div class='profile__actionWrapper' id='profile_backpack_move_item_btn'>
          <img src='./images/profile_icon_backpack.png' class='profile__equipmentItemSellIcon' id='profile_backpack_replace_item_icon'/>
          <strong class='profile__actionName'>Equip</strong>
        </div>
        `
    }
}