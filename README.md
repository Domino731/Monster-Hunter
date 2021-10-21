# Monster Hunter

Game based on components that resemble those available in react. Moving between the components is available by router. The whole database and authorization process was achieved by using Firebase by google. The game has 10 sections where each is different in order to provide the user a lot of fun. Game also has a chat with friends. While creating this game I was inspired by a popular game available in browsers - shakes & fidget. 

## Technologies

Project is created with:
* HTML
* Typescript
* Webpack
* Sass
* Firebase

## Available sections in game
*  Tavern - A Place where user can select mission followed by a fight with a monster.
*  Profile - View where the user can see his profile, equipment, backpack, potions, pet. In this section user can also increase his hero statistics.
*  Blacksmith - Market with equipment items where user can buy new 
*  Pets - A place where the user can add a pet, each pet has special abilities
*  Wizard - A room with wizard and spinning wheel by which user can win random equipment item, potion or gold (only 1 spin per day)
*  Guard - If the user is short of Gold this is the section for him, where he can start guarding for the king for a limited time and get Gold for it
*  Friends - A friends list, where the user can see the profile of a particular person or start a chat
*  Search Friends - Section where user can search for particular friend and add his to his friends
*  Inbox - An email inbox, this is a to further development of the game for example to give away prizes to a random player.
*  Account - Panel where user can change his password, email or delete his account :( 

## Compontents

### `Component (abstract class)`
This is class which is expaneded by all components in game, is a bit like the class component from react. His task is to provide base methods responsible for logic behind component. 
#### ***Constructor***
* `userData` - user's data from firestore, this data is used by inherited classes
* `root` - root element where html code will be injected
* `serStats` - user statistics created by all items in the equipment, by pet and potions.  Needed to create missions based on this stats and items in blacksmith market
* `loadingContainer` - container with loading animation, needed to remove this container when class initialize methods (scripts and others)
* `mobileNav` - Bottom navigation bar (for mobile devies under 1024px), blacksmith section and profile have the ability to toggle between content inside these sections
    for example in profile section user can toogle between profile and backpack. When the user moves to another section 
   (for example - pets section which doesnt have the  ability to toggle between content), you have to clear this bar -  `clearMobileNav()` method.
* `freepikAttributeWrapper` - wrapper of freepik attribute, each class which is using graphic from this site have to add author of this graphic   
* `freepikAttribute` - freepik author attribute which will be displayed in above wrapper - `bodyBackgroundSrc` - source of graphic needed to set body background image in order to create frosted glass effect - `setBodyBackground()` method
#### ***Methods***
* ` getUserData()` - Method responsible to fetch user's data from firestore, there is also placed data listener, which on data change will trigger abstract method.`onDataChange`.
* `dateOperations()` - Method responsbile for operations on new day. Last visit of the user is saved in the firestore which is visible in search friend section. Last visit is needed to set new shop, wizard wheel, missions with new willingness bar in this method.
* `checkPetAndPotions()` - Method which is checking for expiry date of pet and potions
* `setHeroStats()` - Set the statistics based on equipment, potions and pet.
* `setMagicWheel()` - Set magic wheel items which are available to win in the wizard section.
* ` removeLoading()` - Method responsible for removing loading screen when component ends fetching data from firestore.
* `clearMobileNav()` - Clear mobile navigation bottom bar (profile and blacksmith have ability to toggle content in section).
* ` setBodyBackground()` - Set body background in order to create frosted glass effect, and set freepik author attribute.
* ***Abstract*** `onDataChange()` - Method which will be triggering specific methods on data change in firestore data base. Place here methods that you want be invoke on data change (for example - method responsible for rerendering equipment or backpack)
* ***Abstract*** `render()` - Method responsible for injecting new html code into game root.
* ***Abstract*** `getDOMElements()` - Method which is invoking after redner() method. If you want to get DOM elements of newly injected html code, then place this needed elements here.
* ***Abstract*** `initScripts()` - Method that is called at the end, when the component has been rendered and the DOM elements have been retrieved. Put there methods responsbile for the whole logic of component. 




### `Missions (extends Component class)`
This class is responsible for redirecting user's to the appropriate section based on his status
#### ***Methods***
* `render()` - check status and redirect user to specific section.
    * status === free -> create `Tavern` section with missions.
    * status === guard -> create `onGaurdTavern` section without ability to choose mission.
    * mission travel ends > create section with monster fight `MonsterFight`.
    * mission travel is still on -> create `Travel section`.

### `Tavern (extends Component class)`
 Class responsible for tavern section by which user can select a mission. On new day Missions are automatically generated by `getRandomMissions` function which returns 3 random based on user's data - gold to create appropriate mission payout and stats to create monster. User also has willingness for missions (has reset on new day) which is 100 minutes. When user select specific mission then this willingness is reduced by mission time. 
 #### ***Constructor*** 
 * selectedMission - 
     When the user clicks on the mission graphic (papyrus) the value will change to mission data ( `chooseMission()` method).
    And when user click on the button responsible for starting this mission, this mission will be saved as the current one and the travel will start - `startMission()` method.
 #### ***Methods*** 

* `chooseMission()` - Set `selectedMission` with specific mission data, based on this data,
     when the user presses the button a new mission with this data will be started.
* `startMission()` - Start new mission (if user has enough willingness to start new mission) and redirect the user to `travel` section. 
* `renderAvailableMissions()` - Render available mission with a click event that allows user to select a specific mission.
* `onBtnHover()` -  when user hovers over the button responsible for starting a new mission (`startMissionBtn`), show how much it takes willingness.
* `onDataChange()` 
    * Set willingness bar styles.

### `onGuardTavern (extends Component class)`
Class responsible for tavern section when user is on guard
 
### `Travel (extends Component class)`    

Class reponsible for mission travel section, when travel ends then section about fight with monster will be created (`MonsterFight` class).

####  ***Constructor*** 
 * `countdownInterval` - includes interval which will be cleaned when travel ends or if user cancel mission
#### ***Methods***
* `travelCountdown()` - countdown to the end of the travel.
* `cancelMissionEvent()` - click event applied on button by which user can cancel current mission.
* `setBackground()` - set body background with freepik author attribute in nav.



### `MonsterFight (extends Component class)`
Class responsible for fight between user and monster, after fight ends successfully then add gold and exp to user's account, if mission is failed then redirect him to tavern.

#### ***Constructor***
* `fightInterval` - Contains logic responsbile for fight and is cleared after the fight is over - `fightAnimations()` method.
* `MonsterHP, userHP` - health points that are there to check if the fight is over - `checkMonsterHP()` and `checkUserHP()` methods.

#### ***Methods***
* `general()` - set monster and user health points
* `fightAnimation()` - Single fight animation between user and monster.
* `fightAnimationInterval()` - Set interval responsible for attack animations and logic behind fight.
* `monsterDamage()` - calculate damage for user from monster.
* `userDamage()` - calculate damage for monster from user.
* ` checkUserHP(), checkMonsterHP()` - check for user and monster hp, if health of one of them is 0
* ` successfulMission(), failedMission()` -  show summary panel, create new mission, and update user's data in firestore with new exp, gold, mission (if user has defeated monster).





### `Profile (extends Component class)`
Class responsible for profile view. In this section can change his equipment, backpack, increase his stats, change portrait and description

#### ***Constructor***
* `hideLabelInterval, generalInterval` - objects with intervals needed to avoid multiple label hiding .
#### ***Methods****
* `increaseStatistic()` - Method by which user can increase any statistic. This method is applied on every button in stats button (by `increaseStatisticEvents()` method).
* `increaseStatisticEvents()` - Adding clicks events with above method on each button in stats table
* `setTableStats()` - Set the statistics table.
* `changeHeroPortrait()` - Adding events on buttons which are to change hero portrait.
* `changeUserDescription()` - Update user description when textarea loses his focus
* `setGeneral()` - Set general elements - potions, pet and description
*  `setCountdown()` - Countdown which displays the remaining time, used for pet and potions (in `setGeneral()` method)
* `generalOnUpdate()` - General actions when data has changed
* `moveItemInEquipment()` - Moving item from backpack to equipment, this method is applied with click event on backpack label (in `backpackLabel` method).
* ` moveItemToBackpack()` - Moving item from equipement to backpack, this method is applied with click event on backpack label (in `equipmentLabel` method).
* `backpackLabel()` - Add backpack label for specific item, with ability to move this item to equipment.
* `equipmentLabel()` - Add equipment label for specific item, with ability to move this item to backpack.
* `setUserBackpack()` - Set bacpack items with hover events by which user can display label of specific item and move this item into equipment.
* `setUserEquipment()` - Set equipment items with hover events by which user can display label of specific item and move this item into backpack.
* `clearEquipmentSlots()` - Clear equipment slots -> remove items graphics in order to avoid situation when user doesnt have item on specifc slot in equipment but this slot has graphic (this method mainly created for `onDataChange` method).
* `removeEvents()` - When data has changed then onDataChange() method will rerender component so its need to get dom elements. 
* `toogleView()` - click events applied on mobile nav buttons by which the user can switch between profile and backpack
* `mobile()` - hide backpack content container on mobile devices, user can switch to backpack by the bottom nav bar (events added in `toogleView` method)
* `onDataChange` - Operations when data in firestore has changed
   * set new hero stats based on equipment items, pet and potions - `setHeroStats()` abstract method
   * set stats table - `setTableStats()` method
   * rerender component events - `removeEvents()` method
   * set level, portrait, gold - `generalOnUpdate()` method
   * rerender backpack - `setUserBackpack()` method
   * rerender equipment - `setUserEquipment()` method
   * set pet, and potions - `setGeneral()` method
   * set label for potions - `labelForPotions()` method
   * add event responsible for changing portrait - `changePortrait()` method





### `Blacksmith (extends Component class)`
Class responsible for blacksmith where user can buy equipment items, or sold old. Blacksmith has 6 slots with items, each slot has only 2 picks (only 2 items can be bought from this slot), so user can buy 12 items per day (if he has enough gold :) ) Blacksmith items with picks are reset every day (by `dateOperations` in `Component` class). Items are created based on user's stats and guard payout by `getBlacksmithItems` function. User can buy new item by label or by dragging specific item into his backpack or equipment
#### ***Constructor***
* `market` - Array with data about blacksmith items that are available to buy
* `selectedMarketItem` - Selected blacksmith item, when user clicks one of slot in market then this value is change, and when he presses the button on label, which is responsible for purchasing new item then new item with this data
   will be added to user's backpack or equipment - `buyItemByLabel()` method.
 * `showBlacksmithLabel` - Intarval that helps to set delay on blacksmith item label display.
 * `hideLabelInterval` -  when user hovers over an item in inventory, backpack0 or potion then a label is shown which describes this item,
    if  this label loses his focus then it does not disappear immediately but with a delay (0.8s). However
    when user hovers over a item in a backpack and quickly hovers over another one then clear this 
     interval which will help prevent duplicate labels and disappearance.

#### ***Methods***
* `setShop()` - Set items which are availble to buy with hover event which is responsbile for displaying blacksmith label ,     
* `getAvailbleMarketPicks()` - Get available pick per slot in market, each slot has only 2 picks - user can buy only 2 items from one slot. 
Picks are reset in new day by `dataOperations()` method in Component class.
* `dragAndDrop()` - Buy item buy dragging specific item over equipment or backpack.
* `buyItem()` - Buy specifc item and add him into equipment or backpack (if equipment slot is occupied).
* `buyItemByLabel()` - Add click event on each market in order to create capability to buy new blacksmith item via button which is placed in blacksmith label.
* `sellBackpackItem()` - Sell specific item from backpack, this method is applied (by `backpackLabel` method) with click event on  button which is placed in backpack label .
* `sellEquipmentItem()` - Sell specific item from equipment, this method is applied (by `equipmentLabel` method)  with click  event on button which is placed in equipment label .
* `moveItemToEquipment()` - Moving item from backpack to equipment, this method is applied (by `backpackLabel` method)  with click event on button which is placed in backpack label.
* `moveItemToBackpack()` - Moving item from equipment to backpack, this method is applied (by `equipmentLabel` method)  with click event on button which is placed in equipment label.  
* `backpackLabel()` - Add backpack label for the specific item, with ability to sell or to move this item to equipment, this method is applied on every slot in backpack (by `setBackpack` method).
* `equipmentLabel()` - Add equipment label for the specific item, with ability to sell or to  move this item to backpack, this method is applied on every slot in backpack (by `setEquipment` method).
* `setUserEquipment()` - Set user backpack where each item can be sold (`sellEquipmentItem()` method) or moved (`moveItemToBackpack()` method) to the backpack.
* `setUserBackpack()` - Set user backpack where each item can be sold (`sellBackpackItem()` method) or moved (`moveItemToEquipment()` method) to the inventory.
* `clearEquipmentSlots()` - Clear equipment slots -> remove items graphics in order to avoid situation when user doesnt have item on specifc slot in equipment but this slot has graphic (this method mainly created for `onDataChange` method).
* `removeEvents()` - when data has changed then onDataChange() method will rerender component so its need to get dom elements.
* `setNewShopCountdown()` - Set countdown which is displaying time remaining to new market items.
* `generalOnDataChange()` - General operations when data in firestore has changed - set gold, portrait, level.
* `toogleView()` - Events applied on mobile nav buttons by which the user can switch between blacksmith market and profile.
* `mobile()` - Hide profile content container on mobile devices, user can switch to profile content by the bottom nav bar.
* `bugfix()` - bugfix for backpack label styles (hiding label on focus lose).
* `onDataChange()` -  Operations when data in firestore has changed.
   * rerender component events - `removeEvents()` method
   * rerender shop - `setShop()` method
   * set equipment and backpack - `setBackpack`, `setEquipment` methods
   * set portrait, gold and level - `generalOnDataChange()` method
   * init drag&drop event - `dragAndDrop` method

### `Pets (extends Component class)`
Class responsible for pets, user can choose one of 4 available pets. Each pet has his own properties which are affect to statistics, or reduce mission time. Max pet rent time is 100 days.
#### ***Constructor***
* `countdownInterval` - Interval responsible for how much time left to pet rent end -  `setCountdown()` method.
#### ****Methods****
* `setCountdown()` - Set countdown which is displaying how much time is left to pet rent end.
* `setNewPet()` - Method that is responsible for setting new pet, applied on every button (by `setPetRentEvents()` method).
* `setPetRentEvents()` - Appling events on buttons which are responsible for setting new pet.
* `setStyles()` - Set styles on buttons (to mark if user has enough gold for pet) and mark current pet container.
* `setGoldAmount()` - Set gold amount in gold wrapper.
*  `onDataChange()` - Operations when data in firestore has changed.
   * mark current pet and set styles for buttons - `setStyles()` method.
   * set countdown which is displaying how time left for pet rent end - `setCountdown` method.
   * set new gold amount - `setGoldAmount` method.


### `Wizard (extends Component class)`   
Class responsible for wizard section where user can spin a wheel and win random item. Magic wheel has only 1 spin per day (reset on new day by `dataOperations` in `Component` class)
#### ***Methods***
* `addWonItem()` - Add won item to user's data (this method is invoke when user click spin button).
* `startSpinningEvent()` - Click event applied on spinBtn by which user can spin the wheel.
* `setSpinningWheelItems()` - Set graphics of available items to win.

### `Guard (extends Component class)`
Depending on the user status, the appropriate subcomponent will be displayed - guard countdown or guard menu. In the guard menu the user can select the gaurd time 
#### ***Constructor***
* `guardPayout` - Amount of gold which will be added to user's account after guard end, this value 
   is changing by input range in guardSliderEvent() Method. When the user presses button reponsible for guard start, this value
   will be added to his data in firestore, so after guard end user will be know amout of gold which he has erned.
* `guardTime` - Time of guard, changing by input range in guardSliderEvent() Method, needed to set end of guard.
* `countdownInterval` - Guard interval, needed to remove the interval at the end of the guard.
#### ***Methods***
* `guardSlider()` - Method that applied function on range input, reponsbile for changing guardPayout, guardTime values and setting of input progress bar styles.
* `startGuard()` - Method that is adding click event  with function on acceptBtn which is reponsible to start new guard, update user data in firestore and show countdown section.
* `guardCountdown()` - Setting up an interval which is displaying how much time is left to guard end.
* `getGuardPayout()` - Click event applied on summaryBtn ir order to get gold for guard, and update user's data in firestore, also redirect user to guard menu.
* `cancelGuardEvent()` - Click event applied on cancelGuardBtn in order cancel actual guard and clear guard status in user's data in firestore.
* `checkStatus()` -  Method that checks user's status, if he has active mission then hide button reposnible for starting new guard,
   else if he has active guard then show countdown section, 
   else if he has no active mission or guard then show guard menu. This method is nested in `onDataChange()` method, and invoking when data was changed (when user starts new guard or end current).
* `general()` - display guard payout for 1 hour and set peyout value.
* `onDataChange()` - Operations when data in firestore has changed.
    * check if user has active guard then redirect him to guard countdown section - `checkStatus()` method.

### `Friends (extends Component class)`    
Class which is responsible for displaying list with friends. This list can be also filtered or sorted. Each friend wrapper has 2 buttons, first - profile button by which user can display friend profile (by `SearchedUser` class), and the second button - chat by which user can start chatting with specific friend (by `Chat` class).
#### ***Constructor***
* `friendsList` - Array with data about friends, which is needed to sort (by `sortFriends()` method) and filter (by `filterFriends()` method) friends list.  
* `friendsListBackup` - When user filter friends list by higher or lower level, then above array with data is filtered by selected filter and and removes other friends data
 this friendsListBackup is an array containing all friends which is assigned back to the friendsList array when the user turns off filtering.
* `secondView` - Value handling class reponsible for friend view or chat
* `friendNick` - Nick of current selected friend, needed to mark this friend when user start chat with friend (`showChat()` method ) or display his profile (by * * * `showFriendProfile()` method).
#### ***Methods***
* `showFormsEvents()` -  Click events applied on buttons (filterBtn and sortBtn) by which user can display filter or sort form.
* `getFriendsData()` - Fetch friends data and create friends list .
* `createFriendWrapper()` - Create friend wrapper with click events applied on buttons with opportunity to create chat (`showChat()` method) or create profile view (`showFriendProfile()` method).
* `sortFriends()` - Events on checkboxes, responsbile for sorting list with friends. 
* `filterFriends()` - Events on checkboxes, responsbile for filtering list with friends.
* `closeViewEvent()` - Add click event at closeBtn in order to give user hide opportunity to hide friend profile or chat.
* `rerenderFriendsList()` - Rerender friends list, used in `sortFriends()` and `filterFriends()` methods.
* `unmarkFriends()` - Unmark selected friend (by removing class).
* `markFriend()` - Mark selected friend.
* `showFriendProfile()` - Craete friend profile view, this method is applied on every 'friendBtn' button with click event.
* `showChat()` - Craete chat with friend, this method is applied on every 'chatBtn' button with click event.  
* `shrinkFriendsList()` - Shrink friends wrappers (mainly for devices above 1024px).
* `growFriendList()` - remove shrink effect from friends wrappers (mainly for devices above 1024px).
* `hideFriendsContainer()`, `showFriendsContainer()` - toogle content
* `onDataChange()` - Operations when data in firestore has changed.
    * hide second view - chat or friend profile - `hideFriendView()` method
    * trigger new scripts - `initScripts()` method
    * rerender friends list - `rerenderFriendsList()` method

### `SearchFriend (extends Component class)`
Class which is responsible for creating list with all players, where user can display every profile of specific user (by `SearchedUser` class) 
#### ***Constructor***
* `allUsersData` - Array with data about all users from firestore, based on this data `getAllUsers()` method will render list with all users.
* `searchedUser` -  Value handling class which created seached user view after click on specific user.
#### ***Methods***
* `createFriendTableElement()` - Create table element, with click event by user can display profile of specific user.
* `getAllUsers()` - Fetch all user's data from firestore, in order to create list of this users (by `createFriendTableElement()` method), and find specific user later.
* `showSearchedUserEvent()` - Create (by `SeachedUser` class) and display profile of searched user. This method is applied on every table row with click event (`createFriendTableElement()` method ).
* `mobile()` - 
    Hide the searched user container below 1024px, then the list of all users will be full width and the searched user container also
   will be full width. When user click on a specific user, the list will be hidden and this specific user will be shown by `toogleView()` method (only for devices below 1024px).
* `searchFriend()` - Search for specific user by his nick.
* `toogleView()` - Toogle between all user's list and searched user view (mainly for devices below 1024px).
* `hideSearchedFriend()` - Hide searched user view (only below 1024px).  

### `Inbox (extends Component class)`
Class which is responsible for inbox section, where user can read e-mails. This section is created for further development, (for example: giveways and others).
#### ***Methods***
* `openEMail()` - Method applied with click event on each. By this method can open specific mail.
* `deleteEMail()` - Method applied with click event on each. By this method can delete specific mail.
* `closeEMail()` - Method responsible for hiding current selected email container, applied on closeMailIcon which is displays only on mobile devices.
* `toggleEMail()` -  This method is responsible to toggling between mails list and mail content container (only for devices below 1024px)
* `mobile()` - Hide email container on mobile devices -> emails list will be on full width, and when user click on specific email this list will be hidden and email container will showed (on full device width).
* `renderMails()` - render e-mails in list and add click event by which user can open specific email (`openEMail` method) and click event for deleting email(`deleteEMail()` method)
* `onDataChange()` - Operations when data in firestore has changed.
    * rerender list with e-mails - `renderEMails()` method

### `Account (extends Component class)`
Class which is for section where user can change his email or password, or delete his account :(
#### ***Constructor***
* `data` - Object with data needed to execute firebase auth action, changing in changeDataEvent() method  
* `deleteCode` - Special code which must be prescribe by the user to allow him to delete his account
#### ***Methods***
* `toggleForm()` - Click events applied on toogleIcon in order to toggle between change data form and delete account.
* `updateProfileEvent()` - Event applied on actionBtn with firebase auth action, responsible for update user's profile.
* `updatePassword()` - Upadate user's password.
* `updateEmail` - Update user's email.
* `ChangeDataEvent` - Adding change events for each input, which is responsible to changing data.
* `DeleteAccountEvent` - Method that is reponsible for deleting user's account from firestore and firebase auth.
* `deleteAccount` - Method that is reponsible for deleting user's data from firestore.

## Sub components

### `SearchedUser`
A class which is responsible for searched user view. This component is nested in search friend section and in friends section. By this component user display view of any user in game and add this user to his friends (or remove).

#### ***Constructor***
* `root` - Container where new created component will be injected.
* `currentUser` - Data about current logged user, needed to add friend to his account (`addOrRemoveFriend()` method) and create chatroom with this friend by `createChat()` method,
* `searchedUser` - Data about specific user that you want to display, based on this data component will be rendered.
* `hideLabelInterval` - Intervals responsible for hiding label with delay, and they also used to avoid multiple label hiding.

#### ***Methods***
* `equipmentLabel()` - Equipment label for specific item.
* `setEquipment()` - Set equipment slots with ability to display label of specific item.
* `labelForPotions()` - Hover events applied on potion slots, which are responsible for potion label.
* `createChat()` - Create new chat data with friend (data structure is describe in docs).
* `addOrRemoveFriendEvent()` - Add or remove searched user from friends.
* `changeFriendIconEvents()`  - Changing friend icon on mouse hover and leave.
* `switchElements()` - Click event applied on switch button, which makes it possible to switch between description and user general view.

### `Chat`
A class which is responsible for chat section between current logged user and friend. 
#### ***Constructor***
* `root` - Container where new created component will be injected.
* `friend` - Friend data needed to get his chat messages and display his nick.
* `currentUser` - Current user data needed to get his chat messages and to send text messages.
* `conversation` - Chat data, contains all messages and user and friend messages. These data is splited to avoid duplicates in conversations and reduce data size.
#### ***Method***
* `renderChat()` - Render messages between user and friend in chatContainer.
* `sendMessage()` - Send new createad message into user's data in firestore.
* `addEmoji()` -  Click event added on each emoji which when clicked, they appear in the message.
* `scrollToBottomMessage()` - Scroll to bottom of new message, in order when a user selects emoji to know where new emoji is.
* `toggleEmojiList()` - Click event applied on emojiBtn by which user can toggle emoji list.
* `checkMessage()` -  Check if message text has more than 0 characters, if yes then show button reponsible for sending new message - sendMessageBtn. This method is triggered when user type new message in order to avoid empty messages.
* `getChatromData()` -  Get chat data in order to display chat basis on this data
* `dataChangeListener()` - Listening for chat data updates in firestore, when the date changes then `renderChat()` method will rerender chat.

## General

### `General`
Class which is responsible for click event applied on logout button, and for resfreshing page on resize.
#### ***Methods***
* `logoutEvent()` - Click event applied on button in order to logout the user when he presses a button.
* `mobile()` - Refresh page on window resize in order to create  content  which is appropriate for the current browser window size (devices under 1024px have different content display (blacksmith,
    profile, friends, search friend, inbox sections).
* `init()` - Iniclalization of scripts.

### `MobileNav`
 Class responsible for mobile navigation which is displaying below 1024px.
 #### ***Methods***
 * `toogleNav()` - Click event applied on button by which user can toggle container with navigation.
 * `hideNav()` - Click events applied on each link in navigation, when user click one of these links then hide container with navigation.
 * `init()` -  Iniclalization of scripts.

### How to add new emoji ? 
* 1 - Add new graphic in emoji folder
* 2 - Add source of above emoji in `emojiData` array (***properties/emoji/emoji.ts***)

### How to add shop item
* 1 - Add graphic of new item in appropriate folder (shop folder)
* 2 - Add this item into appropriate array with data -> chestplates, glovesData, helmetsData, potionsData, shieldsData, specialData, weaponsData (***properties/shop/* ***)
* 3 - Set item name, description, rarity, id, graphic source,  properties (percentage of user stats, 
`getBlacksmithItems()` function will set item properties based on user stats.) and initial cost (percentage of user gaurd payout, `getBlacksmithItems()` function will set cost). 

## Authorization
The Firebase service is providing by google and is responsible for the backend of this project. Operations which are responsible for authorization are in sub page - /login



### `AuthForm`
Abstract class responsbile for firebase authentication action. 
#### ***Constructor***
* `data` - Data passed by user in inputs, changing by `changeData()` method.
* `invalidData` - Boolean value which will block the invoke of authAction method when data passed by user is incorrect 
#### ***Methods***
* ***abstract*** `authAction()` - Responsible for firebase authentication operation - create new user or sign in.
* ***abstract*** `checkData()` - Responsible for catching errors in invalid data.
* ***abstract*** `setErrors()` - Responsible for setting errors in form.
* `changeData()` - Adding events for inputs in order to get their values on change and pass this value into data, so authAction() method
   will be have data to invoke specific auth action.
* `addButtonEvent()` - Click evebt with function applied on form button. If user passed correct data then trigger authAction() method otherwise set errors.
* `toggleForm()` - Toggle between form and login form (only below 1024px)
* `init()` - Initialization of scripts.

### `Login (extends AuthForm class)`
Class responsible for loggin user.
#### ***Methods***
* `authAction()` - Logging user.
* `checkData()` - Checking data passed by user.

### `Register (extends AuthForm class)`
Class for creating new user account in firebase.
 #### ***Methods***
 * `authAction()` - Creating new user with initial data (`InitialUserProfile`) in firestore.
 * `setErrors()`- Display errors in form, this method is invoked in `addButtonEvent()` method only when `isCorrect` is true
 * `removeErrors()` - Remove all errors from form, (this method is triggered when user pass new data)
 * `checkData()` - Check if user's data is correct, if data is incorrect then `authAction()` wont be triggred and the `setErrors()` method will be invoke. 
   These methods are apllied in `addButtonEvent()` method.

### `PasswordRecover` 
Class responsible for recovering user's password.
####  ***Methods***
* `hideAuthFormsEvent()` -  When user click on btn show recover password form and hide login and register forms
* `showFormsEvent()` - When user click on btn hide reset form and show login and register forms, or show only login form (only below 1024px).
* `removeErrorsEvent()` - When user type new data remove error.
* `authAction()` - firebase authorization operation responsible for recovering user's password

## Available functions
 * `getProfileBackpackLabel()` - Get HTML code for the backpack label (for profile section with equipment button).
 * `getBlacksmithBackpackLabel()` - Get HTML code for backpack label (for blacksmith section with equipment and sell buttons).
 * `getSearchedUserBackpackLabel()` - Get HTML code for  backpack label (for searched user section). 
 * `compareStats()` - Compare statistic between selected and actual item in equipment.
 * `setCountdown()` - Function that counts time to the end of the day.
 * `getProfileEquipmentLabel()` - Get HTML code for the equipment label (for profile section with backpack button).
 * `getBlacksmithEquipmentLabel()` - Get HTML code for the equipment label (for blacksmith section with backpack and sell buttons).
 * `formatDate()` - General date format.
 * `formatChatDate()` - Date format for chat.
 * `formatMailDate()` - Date format for mail.
 * `getBlacksmithItemLabel()` - Get HTML code for blacksmith item label.
 * `getBlacksmithItems()` - Get an array with random items data for blacksmith section (item data is based on user stats and guard payout).
 * `getBlacksmithPicks()` - Get available blacksmith picks per slot, each slot has only 2 picks (user can only buy 2 items from one slot).
 * `getEquipmentIconSrc()` - Get an icon that represents a specific type of item.
 * `getFullUserStats()` -  That function is responsible for creating full user stats based on equipment, pet, potions.
 * `getGuardPaymentValue()` - Get guard payout value which is according to user's level.
 * `getMissionDetails()` - Get HTML code for mission details - title, description, exp, gold, time and enemy.
  * `getRandomcongratulationsText()` - get random congratulation text
 * `getNeededExp()` - Get experience value which is needed to level up.
 * `getPotionLabel()` - Get HTML code for potion label.
 * `getStatCost()` - Function that return cost of statistic (based on gaurd payout value and statistic amount).
 * `getStatusImgSrc()` -  Get graphic which is representing user's status.
 * `getWonItemLabel()` - Get html code for won item from wizard magic wheel.
 * `getMessageCode()` - HTML code for message.
 * `getRandomMissions()` - Function that returns an array with data about random missions (3 missions).
 * `getRandomMission()` - Function that returns random mission.
 * `setItemStatistic` - This function is returning particular item statistics (based on user statistic).
 * `isUpper()` - Check if string has an upper letter.
 * `includeNumber()` - Check if string has a number. 

## Properties
* `emojiData` - Array with emoji sources. All emotes are rendered automatically in `getChatHTMLCode` function.
* `allBlacksmithMarketItems` - Array with data about all blacksmith items (helmets, chest plates, gloves, specials, weapons and shields).
* `chestplatesData` - Array with chest plates data.
* `glovesData` - Array with gloves data.
* `helmetsData` - Array with helmets data.
* `potionsData` - Array with potions data.
* `shieldsData` - Array with shields data.
* `specialItemsData` - Array with special items data.
* `weaponsData` - Array with weapons data.
* `portraitsData` - Array with available portraits sources (user can change his hero portrait in profile section)
* `petsData` - Array with pets data, which are displaying in pets component. Each pet has diffrent skills.
* `backgroundsData` - Available backgrounds for the missions that will be displayed during traval
each background include his source and freepik author attribute.
* `charactersData` - Array with mission characters which are displaying in tavern after user selects a mission and after successful mission.
* `congratulationsTexts` -  Array with texts which are will displayed after successful mission.
* `missionDscData` - Array with missions description.
* `missionTitlesData` - Array with mission titles.
* `monstersData` -  Array with monsters graphic sources.
* `papyrusSrcData` - array with papyrus sources, which are displaying in tavern.
* `InitialUserProfile` - object with  initial user data with which the profile will be created in the firestore database

## Firestore data structure
### ***Colections***
* users - all data about users.
* chat - all data about user chatrooms. Each user has his own document in this collection with conversation data. Base on this data `Chat` will be render chat with particular friend.

### ***users***
each user has: 
* level - needed to set guard payout by this value.
* nextLevelAt - experience required to level up.
* exp - current experience.
* nick - nickname of user.
* guardPayout - gaurd payout value also needed to set mission payout, pet cost, and blacksmith items cost.
* gold - amount of gold, needed to buy items available in blacksmith section and increase stats.
* equipmentItems - items in user's  equipment, base on this items all user statistics (`fullUserStats` in `Component` class) will be created by `getFullUserStats()` function.
* backpackItems - items in user's backpack.
* lastVisit - date of last visit, used `dateOperations` in `Component` class. Last visit is also displaying in search friend section
* status - current user status (mission, free or on guard). If user has mission status he cant start guard and vice versa. Status is also displaying in search friend section
* portrait - hero portrait.
* wizardWheelSpin - boolean value that allows to spin the wheel in wizard section (reset on new day by `dateOperations` in `Component` class).
* availableMissions - available mission in tavern, generated by `getRandomMissions()` function.
* missionWillingness - willingness for mission, 100 minutes per day (reset on new day by `dateOperations` in `Component` class).
* currentMission - current mission data (exp, gold, monster, title...)
* friends - array with id of current friends, needed to render content in friends section.
* inbox - array with e-mails
* shop.blacksmith - array with available blacksmith items, generated by `getBlacksmithItems()` function (reset on new day by `dateOperations` in `Component` class).
* shopPicks.blacksmith - array with available pick pet slot, each slot has only 2 picks per day. (reset on new day by `dateOperations` in `Component` class).
* rawStats - base user statistics, which can be only increased in profile section. Base on this date `getFullUserStats()` function will set all users stats (`fullUserStats` in `Component` class).
* guard - data about current guard - start, end and payout
* pet - data about current pet (each pet has diffrent abilities that increase stats)
* potions - data about current potions.
* magicWheel.wonItem - data about won item (change on new day by `dateOperations` in `Component` class).
* magicWheel.items - an array with data about all items in magic wheel (change on new day by `dateOperations` in `Component` class) 