import { View } from './view';
import { getTavernHTMLCode } from '../viewsHTMLCode/tavern';
import { MissionData, CurrentMission } from '../types';
import { getMissionDetails } from './sub_views/getMissionDetails';
import { updateUserData } from '../firebase/operations';
import { Travel } from './travel';
import { setCountdown } from '../functions/countdown';
export class Tavern extends View {
    private selectedMission: MissionData | null;
    private dom: {
        startMissionBtn: HTMLButtonElement | null;
        missionList: NodeListOf<Element> | null;
        missionsListWrapper: HTMLElement | null;
        missionContentWrapper: HTMLElement| null;
        missionDetails: HTMLElement| null;
        character: HTMLImageElement| null;
        willingnessBarGreen: HTMLElement| null;
        missionError: HTMLElement| null;
        willingnessBarWrapper: HTMLElement| null;
        countdown: HTMLElement | null;
    }
    constructor() {
        super()
        this.dom = {
            startMissionBtn: document.querySelector('.mission__acceptBtn'),
            missionList: document.querySelectorAll('.tavern__listWrapper img'),
            missionContentWrapper: document.querySelector('.mission__informations'),
            missionDetails: document.querySelector('#mission_content_wrapper'),
            character: document.querySelector('.mission__character'),
            willingnessBarGreen: document.querySelector(' .tavern__willingnessBar-green'),
            missionError: document.querySelector('.tavern__missionError'),
            willingnessBarWrapper: document.querySelector('.tavern__willingnessBarWrapper'),
            countdown: document.querySelector('.tavern__countdownWrapper span'),
            missionsListWrapper: document.querySelector('.tavern__listWrapper')
        }
        this.selectedMission = null
    }

    chooseMission( missinId: string) {

            let mission : MissionData | null = null;
            // remove error 
            this.dom.missionError.innerText = ``;
            // clear mission content
            this.dom.missionContentWrapper.classList.add('disabled');
            // find specific mission from user's data
            const missionIndex: number = this.userData.availableMissions.findIndex(el => el.id === missinId)
            mission = this.userData.availableMissions[missionIndex];
      
            // create details about this mission
            this.dom.missionDetails.innerHTML = getMissionDetails(mission);
            this.dom.character.src = mission.character
            this.dom.character.classList.remove('disabled')
            this.dom.missionContentWrapper.classList.remove('disabled');

            this.dom.missionContentWrapper.scrollIntoView();
            // set selected mission
            this.selectedMission = mission;
    }
    startMission() {
        this.dom.startMissionBtn.addEventListener('click', () => {
            if (this.selectedMission !== null) {
                // check if user have enough willingness to start new mission, then add new mission to user's data, else 
                // show error
                if (this.selectedMission.time <= this.userData.missionWillingness) {
                    // create mission date which will be passed into user's data in firestore
                    const start: Date = new Date();
                    const end: Date = new Date();
                    end.setMinutes(end.getMinutes() + this.selectedMission.time)
                    const newMission: CurrentMission = {
                        id: this.selectedMission.id,
                        exp: this.selectedMission.exp,
                        gold: this.selectedMission.gold,
                        time: this.selectedMission.time,
                        title: this.selectedMission.title,
                        character: this.selectedMission.character,
                        monster: this.selectedMission.monster,
                        background: this.selectedMission.background,
                        start,
                        end
                    }
                    this.userData.currentMission = newMission;
                    this.userData.status = 'mission';
                    this.userData.missionWillingness -= this.selectedMission.time;

                    updateUserData(this.userData)
                    // create new travel section
                    const travel = new Travel();
                }

                else {
                    this.dom.missionError.innerText = `You don't have enough willingness to start new mission`
                    this.dom.willingnessBarWrapper.classList.add('tavern__willingnessBarWrapper-error');
                    setTimeout(() => {
                        this.dom.missionError.innerText = ``
                        this.dom.willingnessBarWrapper.classList.remove('tavern__willingnessBarWrapper-error');
                    }, 2000)
                }
            }
        })
    }
    renderAvailbleMissions(){
      this.userData.availableMissions.forEach(el => {
          const mission : HTMLImageElement = document.createElement('img');
          mission.src= el.papyrus;
          mission.className = 'tavern__papyrus';
          mission.addEventListener('click', ()=> this.chooseMission(el.id));
          this.dom.missionsListWrapper.appendChild(mission);
      })

    } 
    onBtnHover() {
        this.dom.startMissionBtn.addEventListener('mouseover', () => {
            this.dom.willingnessBarGreen.style.height = `${this.userData.missionWillingness - this.selectedMission.time}%`
        })
        this.dom.startMissionBtn.addEventListener('mouseleave', () => {
            this.dom.willingnessBarGreen.style.height = `${this.userData.missionWillingness}%`
        })
    }

    onDataChange() { }
    getDOMElements() {
        this.dom = {
            startMissionBtn: document.querySelector('.mission__acceptBtn'),
            missionList: document.querySelectorAll('.tavern__listWrapper img'),
            missionContentWrapper: document.querySelector('.mission__informations'),
            missionDetails: document.querySelector('#mission_content_wrapper'),
            character: document.querySelector('.mission__character'),
            willingnessBarGreen: document.querySelector(' .tavern__willingnessBar-green'),
            missionError: document.querySelector('.tavern__missionError'),
            willingnessBarWrapper: document.querySelector('.tavern__willingnessBarWrapper'),
            countdown: document.querySelector('.tavern__countdownWrapper span'),
            missionsListWrapper: document.querySelector('.tavern__listWrapper')
        }
    }
    initScripts() {
        setCountdown(this.dom.countdown);
        this.renderAvailbleMissions();
        this.onBtnHover();
        this.startMission();
    }
    render() {
        this.root.innerHTML = getTavernHTMLCode(this.userData);
    }
}