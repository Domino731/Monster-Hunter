import { View } from './view';
import { getMonsterFightHTMLCode } from '../viewsHTMLCode/monsterFight';
import { ListFormat } from 'typescript';
export class MonsterFight extends View {
    private monsterInterval: null | ReturnType<typeof setInterval>
    private userInterval: null | ReturnType<typeof setInterval>
    private dom: {
        monster: {
            wrapper: HTMLElement
            explosion: HTMLElement
        }
        user: {
            weaponWrapper: HTMLElement
            sword: HTMLElement
            explosion: HTMLElement
        }
    }
    constructor() {
        super()
        this.monsterInterval = null
        this.userInterval = null
        this.dom = {
            monster: {
                wrapper: document.querySelector('.fight__characterWrapper-monster'),
                explosion: document.querySelector('.monster__explosionImg')
            },
            user: {
                weaponWrapper: document.querySelector('.fight__weaponWrapper'),
                sword: document.querySelector('.fight__sword'),
                explosion: document.querySelector('.fight__explosion')
            }
        }

    }
    render() {
        this.root.innerHTML = getMonsterFightHTMLCode(this.userStats, this.userData);
    }
    monsterAttack() {
        this.monsterInterval = setInterval(() => {
            this.dom.monster.explosion.classList.add('monster__explosionImg-an');
            this.dom.monster.wrapper.classList.add('monster-an');
            setTimeout(() => {
                this.dom.monster.explosion.classList.remove('monster__explosionImg-an');
                this.dom.monster.wrapper.classList.remove('monster-an');
            }, 1900)
        }, 3800 + 1381)
    }


    // calculate damage for monster from user
    userDamage(){
      const monsterDefence : number = 100 - (this.userData.currentMission.monster.defence * 100 / this.userStats.defence) ;
      let luck : number = 100 - (this.userData.currentMission.monster.luck * 100/ this.userStats.luck);
      luck = (Math.floor(Math.random() * luck)) + 1;
      const damage : number = (this.userStats.damage * monsterDefence / 100 + ( this.userStats.damage * luck / 100)) / 2;
      console.log('user damage', damage)
    }
    monsterDamage(){
        const userDefence : number = (this.userStats.defence * 100/ 4 / this.userData.currentMission.monster.defence) ;
       let damage: number = (this.userData.currentMission.monster.damage - userDefence) / 10 
       let random = Math.floor(Math.random() * 10) + 1;
       damage = Math.ceil(damage  + (damage * (random * 10) / 100 ))
        console.log('monster damage', damage)
        
    }
    userAttackAnimation() {
        this.dom.user.explosion.classList.add('fight__explosion-an');
        this.dom.user.sword.classList.add('fight__sword-an');
        this.dom.user.weaponWrapper.classList.add('fight__weaponWrapper-an')

        this.dom.monster.explosion.classList.remove('monster__explosionImg-an');
        this.dom.monster.wrapper.classList.remove('monster-an');
        this.userDamage();
        setTimeout(() => {
            this.dom.user.explosion.classList.remove('fight__explosion-an');
            this.dom.user.sword.classList.remove('fight__sword-an');
            this.dom.user.weaponWrapper.classList.remove('fight__weaponWrapper-an')
         
            this.dom.monster.explosion.classList.add('monster__explosionImg-an');
            this.dom.monster.wrapper.classList.add('monster-an');

            this.monsterDamage();
        }, 2000);
    }
    userAttack() {
      
        this.userAttackAnimation();
        this.userInterval = setInterval(() => {
            this.userAttackAnimation();
        }, 4000)
    }


















    onDataChange() { }
    getDOMElements() {
        this.dom = {
            monster: {
                wrapper: document.querySelector('.fight__characterWrapper-monster'),
                explosion: document.querySelector('.monster__explosionImg')
            },
            user: {
                weaponWrapper: document.querySelector('.fight__weaponWrapper'),
                sword: document.querySelector('.fight__sword'),
                explosion: document.querySelector('.fight__explosion')
            }
        }
    }
    initScripts() {
        this.userAttack();
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