import { View } from './view';
import { getTavernHTMLCode } from '../viewsHTMLCode/tavern';
import { MissionData } from '../types';
import { getMissionDetails } from './sub_views/getMissionDetails';
export class Tavern extends View {
    private dom: {
        startMissionBtn: HTMLButtonElement | null
        missionList: NodeListOf<Element> | null
        missionContentWrapper: HTMLElement
        missionDetails: HTMLElement
        character: HTMLImageElement 
    }
    constructor() {
        super()
        this.dom = {
            startMissionBtn: document.querySelector('.mission__acceptBtn'),
            missionList: document.querySelectorAll('.tavern__listWrapper img'),
            missionContentWrapper: document.querySelector('.mission__informations'),
            missionDetails: document.querySelector('#mission_content_wrapper'),
            character: document.querySelector('.mission__character')
        }
    }

    selectMissionEvent() {
        this.dom.missionList.forEach(el => el.addEventListener('click', () => {
            const element = el as HTMLElement;

            // clear mission content
            this.dom.missionContentWrapper.classList.add('disabled');
            // find specific mission from user's data
            const missionIndex : number = this.userData.availableMissions.findIndex(el => el.id === element.dataset.missionId)
            const mission : MissionData = this.userData.availableMissions[missionIndex];
          
            // check if user has active pet, then reduce mission travel time
            if(this.userData.pet.properties.travelTime){
                const newTravelTime = Math.floor(mission.time - ( mission.time * this.userData.pet.properties.travelTime / 100))
                mission.time = newTravelTime;
            }
            // create details about this mission
            this.dom.missionDetails.innerHTML = getMissionDetails(mission);
            this.dom.character.src = mission.character
            this.dom.character.classList.remove('disabled')
            this.dom.missionContentWrapper.classList.remove('disabled');
           
         }))
    }
    startMission() {
        this.dom.startMissionBtn.addEventListener('click', () => {
           
        })
    }

    onDataChange() {}
    getDOMElements() {
        this.dom = {
            startMissionBtn: document.querySelector('.mission__acceptBtn'),
            missionList: document.querySelectorAll('.tavern__listWrapper img'),
            missionContentWrapper: document.querySelector('.mission__informations'),
            missionDetails: document.querySelector('#mission_content_wrapper'),
            character: document.querySelector('.mission__character')
        }
    }
    initScripts() {
        this.startMission();
        this.selectMissionEvent();
    }
    render() {
        this.root.innerHTML = getTavernHTMLCode(this.userData);
    }
}