import { getBlacksmithItems } from "../../functions/getBlacksmithItems";
import { getBlacksmithPicks } from "../../functions/getBlacksmithPicks";
import { getNeededExp } from "../../functions/getNeededExp";
import { getRandomShopItem } from "../../functions/getRandomShopItem";
import { getRandomMissions } from "../../functions/missionGenerator";
import { ShopItem, FullUserStats, UserData, MailData } from '../../types';
import { portraitsData } from "../portraits/portraits";
import { potionsData } from "../shop/potions";

// set first mail
const mail: MailData = {
    id: 'c9882f43-8dfb-4929-8d14-97cb97a133d1',
    createdBy: 'admin',
    createdAt: new Date(),
    title: 'Welcome in MONSTER HUNTER',
    content: `
    <div class='mail'>
    <div class='mail__header'>
       <span></span>
       <img src='./images/inbox/introduce.jpg'/>  
    </div>
    <h2 class='mail__title'>Welcome in MONSTER HUNTER</h2>
    <div class='mail__content'>
        <p>
         Welcome in Monster Hunter game. 
         When I was creating this game I inspired by the popular game <a href='https://www.sfgame.pl/?cid=sfplplgoaw1604&gclid=Cj0KCQjw4eaJBhDMARIsANhrQADuLkuKG0YLRh-qbLEu67m2WDZEe-nyvd-qRFAhKF2hyFs34AWd8x8aAuBjEALw_wcB' target='_blank'> Shakes & Fidget.</a>
         I hope you have fun and enjoy your time here.
      
        </p>
          <div>
           <h3>Contact</h3>
           <ul>
            <li><a href='https://discord.com/channels/873119072613707776/873119072613707778' target='_blank'><i class="fab fa-discord"></i> My discord server  </a></li>
            <li><a href='https://www.facebook.com/dominik.orzechowski.1088' target='_blank'><i class="fab fa-facebook"></i> Contact with me directly by facebook </a></li>
            <li><a href='https://www.linkedin.com/in/dominik-orzechowski-2aa553212/' target='_blank'><i class="fab fa-linkedin"></i> Linkedin profile </a></li>
           </ul>
         </div>
         <p>
          <strong>Enjoy your game :)</strong>
         </p>
      
         
    </div>
    `
}

// set wizard wheel items
const wizardWheelItems: ShopItem[] = []
const items: ShopItem[] = getBlacksmithItems({
    strength: 50,
    physicalEndurance: 50,
    defence: 50,
    luck: 50
}, 100);

// user also can win gold
const gold: ShopItem = {
    type: 'gold',
    name: 'Gold',
    rarity: 'legendary',
    src: './images/gold_chest.png',
    description: `${300} gold will always comforting`,
    initialCost: 0,
    properties: {
        strength: null,
        physicalEndurance: null,
        luck: null,
        defence: null
    },
    id: ''
}
items.push(gold);
items.push(getRandomShopItem(potionsData));

// set won item, which will be added to user's backpack after wheel spin
const magicWheel = {
    items,
    wonItem: items[Math.floor(Math.random() * items.length)]
}

// initial user statistics needed to set available missions
const fullUserStats: FullUserStats = {
    damage: 35,
    health: 35,
    damageReduce: 35,
    critical: 35,
    defence: 50,
    luck: 50,
    physicalEndurance: 50,
    strength: 50
}


// initial user data with which the profile will be created in the firestore database
export const InitialUserProfile: UserData = {
    lastVisit: new Date(),
    nick: '',
    level: 1,
    guardPayout: 100,
    gold: 1000,
    rawStats: {
        defence: 50,
        luck: 50,
        physicalEndurance: 50,
        strength: 50
    },
    stats: {
        damage: 35,
        health: 35,
        damageReduce: 35,
        critical: 35
    },
    shop: {
        blacksmith: getBlacksmithItems(
            {
                defence: 50,
                luck: 50,
                physicalEndurance: 50,
                strength: 50
            },
            100
        )

    },
    shopPicks: {
        blacksmith: getBlacksmithPicks(),
        wizard: null
    },
    equipmentItems: [],
    backpackItems: [],
    status: 'free',
    guard: {
        current: null,
        start: null,
        end: null,
        payout: null
    },
    pet: null,
    potions: {
        first: null,
        second: null
    },
    description: '',
    portrait: portraitsData[0],
    exp: 0,
    wizardWheelSpin: true,
    magicWheel,
    nextLevelAt: getNeededExp(1),
    missionWillingness: 100,
    currentMission: null,
    availableMissions: getRandomMissions(10, 100, fullUserStats, null),
    friends: [],
    inbox: [mail]
}

