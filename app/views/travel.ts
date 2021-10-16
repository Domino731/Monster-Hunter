import { View } from './view';
import { getTravelHTMLCode } from '../HTMLCode/travel';
import { updateUserData } from '../firebase/operations';
import { Tavern } from './tavern';
import { MonsterFight } from './monsterFight';
export class Travel extends View {
    private dom: {
        startMissionBtn: HTMLButtonElement
        countdownProgressBar: HTMLElement | null
        travelTimeLeft: HTMLElement,
        cancelBtn: HTMLElement
    }
    private countdownInterval: null | ReturnType<typeof setInterval>
    constructor() {
        super()
        this.countdownInterval = null
        this.dom = {
            startMissionBtn: document.querySelector('mission__acceptBtn'),
            travelTimeLeft: document.querySelector('.countdown__time'),
            countdownProgressBar: document.querySelector('.countdown__progressBar'),
            cancelBtn: document.querySelector('.countdown__cancelBtn')
        }
    }
    render() {
        this.root.innerHTML = getTravelHTMLCode(this.userData);
    }
    onDataChange() {

    }
    travelCountdown() {
    const guardStart: any = new Date();
    const guardEnd: any = this.userData.currentMission.end;

    // milliseconds between start and end of guard
    const diffMs = (guardEnd - guardStart);

    const minutes = (diffMs / 1000) / 60;

    // set the countdown date
    const target_date = new Date().getTime() + ((minutes * 60) * 1000);

    this.countdownInterval = setInterval(() => {

  
      let hours, minutes, seconds; // variables for time units

      // find the amount of "seconds" between now and target
      const current_date = new Date().getTime();
      let seconds_left: any = ((target_date - current_date) / 1000);

      if (seconds_left >= 0) {
      
        seconds_left = seconds_left % 86400;

        hours = parseInt((seconds_left / 3600).toString());
        seconds_left = seconds_left % 3600;

        minutes = parseInt((seconds_left / 60).toString());
        seconds = parseInt((seconds_left % 60).toString());

        // set time
        this.dom.travelTimeLeft.innerText = `${hours !== 0 ? hours + 'h : ' : ''} ${minutes}m : ${seconds}s`;

        // set progress bar
        const start: number = this.userData.currentMission.start.getTime();
        const end: number = this.userData.currentMission.end.getTime(); 
        const today: number = new Date().getTime();

        const total = end - start;
        const progress = today - start;

        const result: string = Math.round(progress / total * 100) + "%";
        this.dom.countdownProgressBar.style.width = result;  
        }
            else {
                // remove interval
                const unlisten = async () => {
                    await clearInterval(this.countdownInterval)
                }
                unlisten();
               //redirect him to monster fight view
               const monsterFight = new MonsterFight();    
            }
        }, 1000)
    }

    // cancle current mission
    cancelMissionEvent() {
        this.dom.cancelBtn.addEventListener('click', () => {

            // remove mission from user's account
            this.userData.currentMission = null;
            this.userData.status = 'free';
            updateUserData(this.userData)
            // remove interval
            const unlisten = async () => {
                await clearInterval(this.countdownInterval)
            }
            unlisten();
            // redirect him to tavern
            const tavern = new Tavern();
        })
    }
    getDOMElements() {
        this.dom = {
            startMissionBtn: document.querySelector('mission__acceptBtn'),
            travelTimeLeft: document.querySelector('.countdown__time'),
            countdownProgressBar: document.querySelector('.countdown__progressBar'),
            cancelBtn: document.querySelector('.countdown__cancelBtn')
        }
    }
    initScripts() {
        this.cancelMissionEvent();
        this.travelCountdown();
    }
}