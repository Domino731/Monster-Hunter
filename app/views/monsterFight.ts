import { View } from './view';
import { getMonsterFightHTMLCode } from '../viewsHTMLCode/monsterFight';
import { ListFormat } from 'typescript';
import { General } from '../general/general';
export class MonsterFight extends View {
    private fightInterval: null | ReturnType<typeof setInterval>
    private dom: {
        monster: {
            wrapper: HTMLElement
            explosion: HTMLElement
            HP: HTMLElement
            HPBar: HTMLElement
        }
        user: {
            weaponWrapper: HTMLElement
            sword: HTMLElement
            explosion: HTMLElement
            HP: HTMLElement
            HPBar: HTMLElement
        }
    }
    private monsterHP: number;
    private userHP: number
    constructor() {
        super()
        this.fightInterval = null
        this.dom = {
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
    render() {
        this.root.innerHTML = getMonsterFightHTMLCode(this.userStats, this.userData);
    }

    // calculate damage for monster from user
    userDamage() {
        const monsterDefence: number = 100 - (this.userData.currentMission.monster.defence * 100 / this.userStats.defence);
        let luck: number = 100 - (this.userData.currentMission.monster.luck * 100 / this.userStats.luck);
        luck = (Math.floor(Math.random() * luck)) + 1;
        const damage: number = (this.userStats.damage * monsterDefence / 100 + (this.userStats.damage * luck / 100)) / 2;
        this.monsterHP -= Math.ceil(damage);
    }
    monsterDamage() {
        const userDefence: number = (this.userStats.defence * 100 / 4 / this.userData.currentMission.monster.defence);
        let damage: number = (this.userData.currentMission.monster.damage - userDefence) / 10
        let random = Math.floor(Math.random() * 10) + 1;
        damage = Math.ceil(damage + (damage * (random * 10) / 100))
        this.userHP -= Math.ceil(damage);

    }
    // check if user he defeated the monster, and set monster's hp
    checkMonsterHP() {
        const HP = Math.floor((this.monsterHP / this.userData.currentMission.monster.health) * 100);
        if (HP > 0) {
            this.dom.monster.HP.innerText = `${this.monsterHP}`;
            this.dom.monster.HPBar.style.width = `${HP}%`;
        }
        else {
            this.dom.monster.HP.innerText = `0`;
            this.dom.monster.HPBar.style.width = `0%`;
        }

    }
      // check if monster defeated user, and set user's hp
    checkUserHP() {
        const HP = Math.floor((this.userHP / this.userStats.health) * 100);
        if (HP > 0) {
            this.dom.user.HP.innerText = `${this.userHP}`;
            this.dom.user.HPBar.style.width = `${HP}%`;
        }
        else {
            this.dom.user.HP.innerText = `0`;
            this.dom.user.HPBar.style.width = `0%`;
        }
    }



    attackAnimation() {
        this.dom.user.explosion.classList.add('fight__explosion-an');
        this.dom.user.sword.classList.add('fight__sword-an');
        this.dom.user.weaponWrapper.classList.add('fight__weaponWrapper-an')

        this.dom.monster.explosion.classList.remove('monster__explosionImg-an');
        this.dom.monster.wrapper.classList.remove('monster-an');
        this.userDamage();
        // set monster health bar
        setTimeout(() => {
            this.checkMonsterHP();
        }, 1500)
        //  this.checkMonsterHP();
        setTimeout(() => {
            this.dom.user.explosion.classList.remove('fight__explosion-an');
            this.dom.user.sword.classList.remove('fight__sword-an');
            this.dom.user.weaponWrapper.classList.remove('fight__weaponWrapper-an')

            this.dom.monster.explosion.classList.add('monster__explosionImg-an');
            this.dom.monster.wrapper.classList.add('monster-an');
            this.monsterDamage();

            // set user's health bar
            setTimeout(() => {
                this.checkUserHP();
            }, 1700)
        }, 2000);

    }


    fightAnimations() {
        this.attackAnimation();
        this.fightInterval = setInterval(() => {
            this.attackAnimation();
        }, 4000)
    }

    general() {
        this.monsterHP = this.userData.currentMission.monster.health;
        this.userHP = this.userStats.health;
    }
    onDataChange() { }
    getDOMElements() {
        this.dom = {
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
        this.fightAnimations();
    }
}
// <a href='https://www.freepik.com/vectors/nature'>Nature vector created by brgfx - www.freepik.com</a>

/* 
  monsterAttack() {
        this.monsterInterval = setInterval(()=> {
           this.dom.monster.explosion.classList.add('monster__explosionImg-an');
           this.dom.monster.wrapper.classList.add('monster-an');
           setTimeout(()=> {
            this.dom.monster.explosion.classList.remove('monster__explosionImg-an');
            this.dom.monster.wrapper.classList.remove('monster-an');
           }, 1900)
        }, 3800 + 1381)
    }
    userAttack(){
        this.userInterval = setInterval(()=> {
         this.dom.user.explosion.classList.add('fight__explosion-an');
         this.dom.user.sword.classList.add('fight__sword-an');
         this.dom.user.weaponWrapper.classList.add('fight__weaponWrapper-an')

         setTimeout(()=> {
            this.dom.user.explosion.classList.remove('fight__explosion-an');
            this.dom.user.sword.classList.remove('fight__sword-an');
            this.dom.user.weaponWrapper.classList.remove('fight__weaponWrapper-an')
         }, 2100)
        }, 3800 + 1381) 
    }
*/