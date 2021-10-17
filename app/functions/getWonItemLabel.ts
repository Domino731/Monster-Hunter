
import { ShopItem } from "../types";

/**
 * get html code for won item from wizard magic wheel
 * @param item - data about the item on the basis of which the label will be created
 */
export const getWonItemLabel = (item: ShopItem) : string => {
    return `
    <div class='wonItem__wrapper'> 
    <img class='wonItem__img' src='${item.src}'/>
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
    </div>
    `
}