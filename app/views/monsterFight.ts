
import { View } from './view';
import { getMonsterFightHTMLCode } from '../viewsHTMLCode/monsterFight';
import { getRandomMission } from '../functions/missionGenerator';
import { getNeededExp } from '../functions/getNeededExp';
import { Tavern } from './tavern';
import { updateUserData } from '../firebase/operations';
import { getGuardPaymentValue } from '../functions/getGuardPaymentValue';

// class reponsible for section with fight between user and monster
export class MonsterFight extends View {

    // interval which contains logic responsbile for fight and is cleared after the fight is over - fightAnimations() method
    private fightInterval: null | ReturnType<typeof setInterval>;
    // health points that are there to check if the fight is over - checkMonsterHP() and checkUserHP() methods
    private monsterHP: number;
    private userHP: number;
    private dom: {
        // When the fight is over then hide the combat container - successfulMission() and failedMission() methods
        fightContainer: HTMLElement | null;
        // summary panels which are displaying after fight - successfulMission() and failedMission() methods
        successSummary: HTMLElement | null;
        failedSummary: HTMLElement | null;
        // buttons placed in summary panels, which by pressing will take the user to the tavern - summaryBtnsEvents() method
        summaryBtns: NodeListOf<Element>
        // containers needed to perform animations - attackAnimation() method
        monster: {
            wrapper: HTMLElement | null;
            explosion: HTMLElement | null;
            HP: HTMLElement | null;
            HPBar: HTMLElement | null;
        }
        user: {
            weaponWrapper: HTMLElement | null;
            sword: HTMLElement | null;
            explosion: HTMLElement | null;
            HP: HTMLElement | null;
            HPBar: HTMLElement | null;
        }
    }

    constructor() {
        super()
        this.fightInterval = null;
        this.dom = {
            fightContainer: document.querySelector('#fight_container'),
            successSummary: document.querySelector('#successful_fight_summary'),
            failedSummary: document.querySelector('#failed_fight_summary'),
            summaryBtns: document.querySelectorAll('.fight__summaryBtn'),
            monster: {
                wrapper: document.querySelector('.fight__characterWrapper-monster'),
                explosion: document.querySelector('.monster__explosionImg'),
                HP: document.querySelector('#monster_HP'),
                HPBar: document.querySelector('#monster_HPBar')
            },
            user: {
                weaponWrapper: document.querySelector('.fight__weaponWrapper'),
                sword: document.querySelector('.fight__sword'),
                explosion: document.querySelector('.fight__explosion'),
                HP: document.querySelector('#user_HP'),
                HPBar: document.querySelector('#user_HPBar')
            }
        }

    }


    // if user defeated the monster, then show summary panel, create new mission, and update user's data in firestore with new exp, gold, mission
    successfulMission() {

        // hide fight container and show successful mission summary panel
        setTimeout(() => {
            this.dom.fightContainer.classList.add('disabled');
            // show summary
            this.dom.successSummary.classList.remove('disabled');
        }, 2000)

        // find index of current mission, in order to replace her by new
        const index: number = this.userData.availableMissions.findIndex(el => el.id === this.userData.currentMission.id);

        // set new mission
        this.userData.availableMissions[index] = getRandomMission(this.userData.nextLevelAt, this.userData.guardPayout, this.userStats, this.userData.pet);

        // add exp
        this.userData.exp += this.userData.currentMission.exp;

        // add gold
        this.userData.gold += this.userData.currentMission.gold;

        // check if user has enough exp to level up
        if (this.userData.exp >= this.userData.nextLevelAt) {
            this.userData.level++;
            this.userData.nextLevelAt = getNeededExp(this.userData.level);
            this.userData.exp = 0;
            this.userData.guardPayout = getGuardPaymentValue(this.userData.level);
        }

        // set status
        this.userData.status = 'free';
        this.userData.currentMission = null;

        // update data
        updateUserData(this.userData);
    }

    // if user defeated the monster, then show summary panel, create new mission, and update user's data in firestore
    failedMission() {

        // hide fight container and show failed mission summary panel
        setTimeout(() => {
            this.dom.fightContainer.classList.add('disabled');
            // show summary
            this.dom.failedSummary.classList.remove('disabled');
        }, 2000);

        // find index of current mission, in order to replace her by new
        const index: number = this.userData.availableMissions.findIndex(el => el.id === this.userData.currentMission.id);

        // set new mission
        this.userData.availableMissions[index] = getRandomMission(this.userData.nextLevelAt, this.userData.guardPayout, this.userStats, this.userData.pet);

        // set status
        this.userData.status = 'free';
        this.userData.currentMission = null;

        // update data
        updateUserData(this.userData);

    }

    // when user click on button on summary panel, he will be redirected to the tavern
    summaryBtnsEvents() {
        this.dom.summaryBtns.forEach(el => el.addEventListener('click', () => {

            // check if mission has ended
            if (this.userData.currentMission === null) {
                const tavern = new Tavern();
            }
        }));
    }

    // check if user he defeated the monster, and set monster's hp
    checkMonsterHP() {

        // calculate health points
        const HP: number = Math.floor((this.monsterHP / this.userData.currentMission.monster.health) * 100);
        if (HP > 0) {
            this.dom.monster.HP.innerText = `${this.monsterHP}`;
            this.dom.monster.HPBar.style.width = `${HP}%`;
        }
        else {
            this.dom.monster.HP.innerText = `0`;
            this.dom.monster.HPBar.style.width = `0%`;

            // this methos will perform the appropriate operations -> add gold , experience, clear user status and remove mission
            this.successfulMission();
        }

    }

    // check if monster defeated user, and set user's hp
    checkUserHP() {

        // calculate health points
        const HP = Math.floor((this.userHP / this.userStats.health) * 100);
        if (HP > 0) {
            this.dom.user.HP.innerText = `${this.userHP}`;
            this.dom.user.HPBar.style.width = `${HP}%`;
        }
        else {
            this.dom.user.HP.innerText = `0`;
            this.dom.user.HPBar.style.width = `0%`;

            // this methos will perform the appropriate operations -> clear user status and remove mission
            this.failedMission();
        }
    }

    // calculate damage for monster from user
    userDamage() {
        const monsterDefence: number = 100 - (this.userData.currentMission.monster.defence * 100 / this.userStats.defence);
        let luck: number = 100 - (this.userData.currentMission.monster.luck * 100 / this.userStats.luck);
        luck = (Math.floor(Math.random() * luck)) + 1;
        const damage: number = (this.userStats.damage * monsterDefence / 100 + (this.userStats.damage * luck / 100)) / 2;
        this.monsterHP -= Math.ceil(damage);
    }

    // calculate damage for user from monster
    monsterDamage() {
        const monsterDefence: number = 100 - (this.userData.currentMission.monster.defence * 100 / this.userStats.defence);
        let luck: number = 100 - (this.userData.currentMission.monster.luck * 100 / this.userStats.luck);
        luck = (Math.floor(Math.random() * luck)) + 1;
        const userDamage: number = (this.userStats.damage * monsterDefence / 100 + (this.userStats.damage * luck / 100)) / 2;

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        const minMonsterDamage = Math.floor(userDamage * 0.7) + 1;
        const monsterDamage = getRandomInt(minMonsterDamage, userDamage);
        this.userHP -= Math.ceil(monsterDamage);
    }

    // fight animation between user and monster
    fightAnimation() {

        // add animation for user
        this.dom.user.explosion.classList.add('fight__explosion-an');
        this.dom.user.sword.classList.add('fight__sword-an');
        this.dom.user.weaponWrapper.classList.add('fight__weaponWrapper-an')

        // remove animation from monster
        this.dom.monster.explosion.classList.remove('monster__explosionImg-an');
        this.dom.monster.wrapper.classList.remove('monster-an');

        // damage for monster
        this.userDamage();

        // set monster health bar and check if the fight isnt over
        setTimeout(() => {
            this.checkMonsterHP();
        }, 1500)

        setTimeout(() => {
            if (this.monsterHP > 0) {

                // remove animation from user
                this.dom.user.explosion.classList.remove('fight__explosion-an');
                this.dom.user.sword.classList.remove('fight__sword-an');
                this.dom.user.weaponWrapper.classList.remove('fight__weaponWrapper-an')

                // add animation for monster
                this.dom.monster.explosion.classList.add('monster__explosionImg-an');
                this.dom.monster.wrapper.classList.add('monster-an');

                // damage for user
                this.monsterDamage();

                // set user's health bar and check if the fight isnt over
                setTimeout(() => {
                    this.checkUserHP();
                }, 1700);
            }

        }, 2000);

    }

    // set interval responsible for logic behind fight
    fightAnimationInterval() {

        this.fightAnimation();
        this.fightInterval = setInterval(() => {

            // check if the user or monster has no health left then remove this animation and show the summary panel
            if (this.userHP > 0 && this.monsterHP > 0) {
                this.fightAnimation();
            }
            else {
                clearInterval(this.fightInterval);
            }
        }, 4000);

    }

    general() {
        this.monsterHP = this.userData.currentMission.monster.health;
        this.userHP = this.userStats.health;
    }



    render() {
        this.root.innerHTML = getMonsterFightHTMLCode(this.userStats, this.userData);
    }
    onDataChange() {
        console.log('Data changed')
    }
    getDOMElements() {
        this.dom = {
            fightContainer: document.querySelector('#fight_container'),
            successSummary: document.querySelector('#successful_fight_summary'),
            failedSummary: document.querySelector('#failed_fight_summary'),
            summaryBtns: document.querySelectorAll('.fight__summaryBtn'),
            monster: {
                wrapper: document.querySelector('.fight__characterWrapper-monster'),
                explosion: document.querySelector('.monster__explosionImg'),
                HP: document.querySelector('#monster_HP'),
                HPBar: document.querySelector('#monster_HPBar')
            },
            user: {
                weaponWrapper: document.querySelector('.fight__weaponWrapper'),
                sword: document.querySelector('.fight__sword'),
                explosion: document.querySelector('.fight__explosion'),
                HP: document.querySelector('#user_HP'),
                HPBar: document.querySelector('#user_HPBar')
            }
        }
    }
    initScripts() {
        this.general()
        this.summaryBtnsEvents();

        // set fight animation with delay
        setTimeout(() => {
            this.fightAnimationInterval();
        }, 2000);
    }
}
// <a href='https://www.freepik.com/vectors/nature'>Nature vector created by brgfx - www.freepik.com</a>
