import { Component } from './component';
import { getTavernHTMLCode } from '../HTMLCode/tavern';
import { MissionData, CurrentMission } from '../types';
import { updateUserData } from '../firebase/operations';
import { Travel } from './travel';
import { setCountdown } from '../functions/countdown';
import { getMissionDetails } from '../functions/getMissionDetails';

/** class responsible for tavern section by which user can select a mission  */ 
export class Tavern extends Component {

    // When the user clicks on the mission graphic (papyrus) the value will change to mission data ( chooseMission() method).
    // And when user click on the button responsible for starting this mission, this mission will be saved as the current one and the travel will start - startMission() method. 
    private selectedMission: MissionData | null;
    private dom: {
        // button needed to apply on him function responsible for starting new mission - startMission() method
        startMissionBtn: HTMLButtonElement | null;
        // container needed to insert missions with click events by which user can select mission - renderAvailbleMissions() method
        missionsListWrapper: HTMLElement | null;
        // container with mission content container, needed to apply on him roll animation - chooseMission() method
        missionContentWrapper: HTMLElement | null;
        // container with mission details  which are set by the  getMissionDetails function - chooseMission() method
        missionDetails: HTMLElement | null;
        // image with actual selected mission person changing  when user select other mission - chooseMission() method
        character: HTMLImageElement | null;
        // when the user hovers over the button responsible for starting a new mission, this bar will drop - onBtnHover() method
        willingnessBarGreen: HTMLElement | null;
        // if user doesnt have enough willingness to start new mission then show this error -  startMission() method
        missionError: HTMLElement | null;
        // if user doesnt have enough willingness to start new mission then add red border to this bar - startMission() method
        willingnessBarWrapper: HTMLElement | null;
        // wrapper with countdown which counts down the time to reset mission willingness by setCountdown() function - initScripts() method 
        countdown: HTMLElement | null;
    }

    constructor() {
        super()
        this.freepikAttribute = `<a href='https://www.freepik.com/vectors/restaurant'>Restaurant vector created by upklyak - www.freepik.com</a>`;
        this.bodyBackgroundSrc = '/images/background_missions.jpg';
        this.dom = {
            startMissionBtn: document.querySelector('.mission__acceptBtn'),
            missionContentWrapper: document.querySelector('.mission__informations'),
            missionDetails: document.querySelector('#mission_content_wrapper'),
            character: document.querySelector('.mission__character'),
            willingnessBarGreen: document.querySelector(' .tavern__willingnessBar-green'),
            missionError: document.querySelector('.tavern__missionError'),
            willingnessBarWrapper: document.querySelector('.tavern__willingnessBarWrapper'),
            countdown: document.querySelector('.tavern__countdownWrapper span'),
            missionsListWrapper: document.querySelector('.tavern__listWrapper')
        }
        this.selectedMission = null;
    }

    /**
     * set selectedMission with specific mission data, based on this data
     * when the user presses the button a new mission with this data will be started
     * @param missinId - id of mission needed to find specific mission
     */
    chooseMission(missinId: string) {
        let mission: MissionData | null = null;

        // remove error 
        this.dom.missionError.innerText = ``;

        // clear mission content
        this.dom.missionContentWrapper.classList.add('disabled');

        // find specific mission from user's data
        const missionIndex: number = this.userData.availableMissions.findIndex(el => el.id === missinId);
        mission = this.userData.availableMissions[missionIndex];

        // create details about this mission
        this.dom.missionDetails.innerHTML = getMissionDetails(mission);
        this.dom.character.src = mission.character
        this.dom.character.classList.remove('disabled')
        this.dom.missionContentWrapper.classList.remove('disabled');

        // set selected mission
        this.selectedMission = mission;

        // scroll to this mission - mainly for mobile devices
        this.dom.missionContentWrapper.scrollIntoView();
    }

     /** start new mission (if user has enough willingness to start new mission) and redirect the user to travel section   */ 
    startMission() {
        this.dom.startMissionBtn.addEventListener('click', () => {
            if (this.selectedMission !== null && this.userData.status === 'free') {
                // check if user have enough willingness to start new mission, then add new mission to user's data, else show error
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

                    // create new travel section
                    updateUserData(this.userData)
                        .then(() => {
                            const travel = new Travel();
                        })
                }

                else {
                    // show error and add red border to willingness bar 
                    this.dom.missionError.innerText = `You don't have enough willingness to start new mission`;
                    this.dom.willingnessBarWrapper.classList.add('tavern__willingnessBarWrapper-error');

                    // remove this error after 2s
                    setTimeout(() => {
                        this.dom.missionError.innerText = ``;
                        this.dom.willingnessBarWrapper.classList.remove('tavern__willingnessBarWrapper-error');
                    }, 2000);
                }
            }
        })
    }

     /** render available mission with a click event that allows user to select a specific mission   */ 
    renderAvailableMissions() {
        this.userData.availableMissions.forEach(el => {

            // create new element with graphic and add event 
            const mission: HTMLImageElement = document.createElement('img');
            mission.src = el.papyrus;
            mission.className = 'tavern__papyrus';
            mission.addEventListener('click', () => this.chooseMission(el.id));
            this.dom.missionsListWrapper.appendChild(mission);
        });
    }

     /** when user hovers over the button responsible for starting a new mission (startMissionBtn), show how much it takes willingness   */ 
    onBtnHover() {
        this.dom.startMissionBtn.addEventListener('mouseover', () => {
            this.dom.willingnessBarGreen.style.height = `${this.userData.missionWillingness - this.selectedMission.time}%`;
        });
        this.dom.startMissionBtn.addEventListener('mouseleave', () => {
            this.dom.willingnessBarGreen.style.height = `${this.userData.missionWillingness}%`;
        });
    }



    onDataChange() {
        // set willingness bar
        this.dom.willingnessBarGreen.style.height = `${this.userData.missionWillingness}%`;
    }
    getDOMElements() {
        this.dom = {
            startMissionBtn: document.querySelector('.mission__acceptBtn'),
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
        // set countdown which is counts to mission willingness bar reset
        setCountdown(this.dom.countdown);
        this.renderAvailableMissions();
        this.onBtnHover();
        this.startMission();
    }
    render() {
        this.root.innerHTML = getTavernHTMLCode(this.userData);
    }
}