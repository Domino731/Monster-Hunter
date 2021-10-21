import { getNeededExp } from '../functions/getNeededExp';
import { potionsData } from '../properties/shop/potions';
import { SearchedUserData, ShopItem, FullUserStats } from '../types';
import { getFullUserStats } from '../functions/getFullUserStats';

/**
 * get html code for specific user profile
 * @param friendsArr - array with data about user friends, each element should have friend nick with id
 * @param searchedUser - data about specific user
 */
export const getSpecificUserHTMLCode = (friendsArr: { id: string, nick: string }[], searchedUser: SearchedUserData): string => {

    // get potion name
    const firstPotionName = (): string => {

        // find specific potion
        const potion: ShopItem = potionsData[potionsData.findIndex(el => searchedUser.potions.first)];
        return potion.name;
    }

    // get potion name
    const secondPotionName = (): string => {

        // find specific potion
        const potion: ShopItem = potionsData[potionsData.findIndex(el => searchedUser.potions.second)];
        return potion.name;
    }

    // get pet graphic source
    const petImgSrc = (): string => {

        // check if user has active pet
        if (searchedUser.pet !== null) {
            return `<img src=${searchedUser.pet.imgSmallSrc} alt=${searchedUser.pet.name} class='profile__generalImg-item'/>`;
        }
        else {
            return ` <img src="/images/profile_pet_slot.png" title="Pet slot" />`;
        }
    }


    // set all user stats
    let stats: FullUserStats = {
        strength: searchedUser.rawStats.strength,
        damage: 0,
        physicalEndurance: searchedUser.rawStats.physicalEndurance,
        health: 0,
        defence: searchedUser.rawStats.defence,
        damageReduce: 0,
        luck: searchedUser.rawStats.luck,
        critical: 0
    }
    stats = getFullUserStats(searchedUser)


    // function that check if searched user is already your friend, and returns appropriate source of image graphic. User will be know if he has this friend in his friends
    const checkFriend = (): string => {
        const friendIndex = friendsArr.findIndex(el => el.id === searchedUser.id);
        if (friendIndex < 0) {
            return `./images/add_friend.png`;
        }
        else {
            return `./images/active_friend.png`;
        }
    }

    // get image source for potion
    const firstPotionImg = () => {

        // find specific potion
        const potion: ShopItem = potionsData[potionsData.findIndex(el => searchedUser.potions.first)];
        if (potion !== undefined) {
            return `<img src=${potion.src} class='profile__generalImg-item'/>`;
        }
        else {
            return `<img src="/images/profile_elixir_slot.png" title="Elixir slot #1" />`;
        }
    }

    // get image source for potion
    const secondPotionImg = () => {

        // find specific potion
        const potion: ShopItem = potionsData[potionsData.findIndex(el => searchedUser.potions.second)];
        if (potion !== undefined) {
            return `<img src=${potion.src} class='profile__generalImg-item'/>`;
        }
        else {
            return `<img src="/images/profile_elixir_slot.png" title="Elixir slot #2" />`;
        }
    }


    return `
    <div class='profile__equipment  profile__equipment-specificUser'>

    <div class='profile__equipmentItem profile__equipmentItem-helmet' data-slot-name='helmet' title='Helmet'>
        <img src='/images/profile_equipment_helmet.png' class="profile__equipmentIcon">
    </div>

    <div class='profile__equipmentItem profile__equipmentItem-armor' data-slot-name='chestPlate' title='Chest plate'>
        <img src='/images/profile_equipment_chestPlate.png' class="profile__equipmentIcon">
    </div>

    <div class='profile__equipmentItem profile__equipmentItem-gloves' data-slot-name='gloves' title='Gloves'>
        <img src='/images/profile_equipment_gloves.png' class="profile__equipmentIcon">
    </div>

    <div class='profile__equipmentItem profile__equipmentItem-weapon' data-slot-name='weapon' title='Weapon'>
        <img src='/images/profile_equipment_weapon.png' class="profile__equipmentIcon">
    </div>

    <div class='profile__equipmentItem profile__equipmentItem-shield' data-slot-name='shield' title='Shield'>
        <img src='/images/profile_equipment_shield.png' class="profile__equipmentIcon">
    </div>

    <div class='profile__equipmentItem profile__equipmentItem-special' data-slot-name='special' title='Special'>
        <img src='/images/profile_equipment_special.png' class="profile__equipmentIcon">
    </div>

    <div class='profile__portrait'>
        <img class='profile__portraitImg' src='${searchedUser.portrait}' />
    </div>

    <div class='profile__info'>

        <div class='profile__itemSpecs disabled' id='specificUser_equipment__item_label'>
            <div id='specificUser_equipment_label_wrapper'></div>
        </div>

        <div class='profile__level' title='Level exp: ${searchedUser.exp}/${searchedUser.nextLevelAt}'>
            <div class='profile__levelProgress'
                style='width: ${Math.floor(searchedUser.exp * 100 / getNeededExp(searchedUser.level))}%'></div>
            <i>${searchedUser.level}</i>
        </div>

        <strong class='profile__nickname'>${searchedUser.nick}</strong>
        <div class='searchedUser__actionBar'>
            <img src='./images/switch.png' class='searchedUser__actionIcon' id='searched_user_switch'
                title='Switch to description' />
            <img src='${checkFriend()}' class='searchedUser__actionIcon' id='searched_user_friend_action'
                title='Add to friends' />
        </div>

    </div>
</div>

<div class='profile__description ${searchedUser.description.length < 6 && ' disabled'}'>
    <p>${searchedUser.description}</p>
</div>


<div id='searched_user_general'>

    <div class='profile__general profile__general-searchedUser'>

        <div class='profile__generalLabelWrapper'> </div>

        <div class='profile__generalItem' id='profile_general_pet'>
            <div class='profile__generalImg ${searchedUser.pet !== null && ' profile__generalImg-item'}'>${petImgSrc()}
            </div>
            <strong class='profile__generalText'>${searchedUser.pet !== null ? searchedUser.pet.name : 'No pet'}
                </strong>
        </div>

        <div class='profile__generalItem' id='profile_general_potion_first'>

            <div class='profile__generalImg ${searchedUser.pet !== null && ' profile__generalImg-item'}'>
                ${firstPotionImg()}
            </div>
            <strong class='profile__generalText'>${searchedUser.potions.first !== null ? firstPotionName() : 'No potion'}
                </strong>

        </div>

        <div class='profile__generalItem' id='profile_general_potion_second'>
            <div class='profile__generalImg ${searchedUser.pet !== null && ' profile__generalImg-item'}'>
                ${secondPotionImg()}
            </div>
            <strong class='profile__generalText'>${searchedUser.potions.second !== null ? secondPotionName() : 'No potion'}</strong>
                
        </div>

    </div>


    <div class='searchedUser__statsWrapper'>

        <table class='searchedUser__statsTable'>

            <tbody>

                <tr>
                    <td>Strength:</td>
                    <td>${stats.strength}</td>
                </tr>

                <tr>
                    <td>Physical endurance:</td>
                    <td>${stats.physicalEndurance}</td>
                </tr>

                <tr>
                    <td>Defence:</td>
                    <td>${stats.defence}</td>
                </tr>

                <tr>
                    <td>Luck:</td>
                    <td>${stats.luck}</td>
                </tr>

            </tbody>

        </table>


        <table class='searchedUser__statsTable'>

            <tbody>

                <tr>
                    <td>Damage:</td>
                    <td>${stats.damage}</td>
                </tr>

                <tr>
                    <td>Health:</td>
                    <td>${stats.health}</td>
                </tr>

                <tr>
                    <td>Damage reduce:</td>
                    <td>${stats.damageReduce}</td>
                </tr>

                <tr>
                    <td>Chance for critical:</td>
                    <td>${stats.critical}</td>
                </tr>

            </tbody>

        </table>

    </div>

</div>
   `;
}