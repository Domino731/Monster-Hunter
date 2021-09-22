import { View } from './view';
import { getMonsterFightHTMLCode } from '../viewsHTMLCode/monsterFight';
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



    monsterAttackAnimation(){
        this.dom.monster.explosion.classList.add('monster__explosionImg-an');
        this.dom.monster.wrapper.classList.add('monster-an');
        setTimeout(() => {
            this.dom.monster.explosion.classList.remove('monster__explosionImg-an');
            this.dom.monster.wrapper.classList.remove('monster-an');
        }, 1900)
    }
    userAttackAnimation() {
        this.dom.user.explosion.classList.add('fight__explosion-an');
        this.dom.user.sword.classList.add('fight__sword-an');
        this.dom.user.weaponWrapper.classList.add('fight__weaponWrapper-an')

        this.dom.monster.explosion.classList.remove('monster__explosionImg-an');
        this.dom.monster.wrapper.classList.remove('monster-an');

        setTimeout(() => {
            this.dom.user.explosion.classList.remove('fight__explosion-an');
            this.dom.user.sword.classList.remove('fight__sword-an');
            this.dom.user.weaponWrapper.classList.remove('fight__weaponWrapper-an')

            this.dom.monster.explosion.classList.add('monster__explosionImg-an');
            this.dom.monster.wrapper.classList.add('monster-an');

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