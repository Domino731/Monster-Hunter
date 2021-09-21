import { missionTitlesData } from "../properties/missions/missionsTitles";
import { missionDscData } from '../properties/missions/missionsDsc';
import uniqid from 'uniqid';
import { MissionData, UserStats, FullUserStats } from '../types';
import { papyrusSrcData } from '../properties/missions/papyrusSrc';
import { monstersData } from '../properties/missions/monsters';
import { charactersData } from "../properties/missions/charactersData";
import { User } from "firebase";
import { backgroundsData } from '../properties/missions/backgroundsData';

// arrays with needed data to create mission, everytime when getRandomMission funtion creates new mission 
// these arrays are reduced due to avoid mission duplicates
let missionDscArr: string[] = missionDscData
let missionTitlesArr: string[] = missionTitlesData
let papyrusSrcArr: string[] = papyrusSrcData
let monstersArr: string[] = monstersData
let charactersArr: string[] = charactersData
const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}




/**
 * Function that returns an array with random missions (3 missions)
 * @param nextLvlExp - experience needed to level up
 * @param guardPayout - guard payout value
 */
export const getRandomMissions = (nextLvlExp: number, guardPayout: number, userStats: FullUserStats): MissionData[] => {
    const missions: MissionData[] = [];
    missions.push(getRandomMission(nextLvlExp, guardPayout, userStats));
    missions.push(getRandomMission(nextLvlExp, guardPayout, userStats));
    missions.push(getRandomMission(nextLvlExp, guardPayout, userStats));
    return missions
}




/**
 * Function that returns random mission 
 * @param nextLvlExp - experience needed to level up
 * @param guardPayout - guard payout value
 * @param userStats - user statistics on the basis of which statistics for the monster will be created
 */
export const getRandomMission = (nextLvlExp: number, guardPayout: number, userStats: FullUserStats): MissionData => {

    // at first check if data ararys aren't empty
    if (missionTitlesArr.length === 0) {
        missionTitlesArr = missionTitlesData;
    }
    if (missionDscArr.length === 0) {
        missionDscArr = missionDscData;
    }
    if (papyrusSrcArr.length === 0) {
        papyrusSrcArr === papyrusSrcData;
    }
    if(charactersArr.length === 0){
        charactersArr === charactersData;
    }
    // points from which experience, gold and mission time will be calculated
    const missionGoldPoints: number = getRandomInt(1, 20);
    const missionExpPoints: number = getRandomInt(1, 20);
    // create mission data 
    const mission: MissionData = {
        exp: Math.ceil(missionExpPoints * (Math.random() * 10 / 3) / nextLvlExp),
        gold: Math.ceil((guardPayout / 10) * (missionGoldPoints / 3) * 0.7),
        title: missionTitlesArr[Math.floor(Math.random() * missionTitlesArr.length)],
        dsc: missionDscArr[Math.floor(Math.random() * missionDscArr.length)],
        time: Math.ceil((missionGoldPoints + missionExpPoints) / 2),
        id: `${uniqid.process() + uniqid(missionExpPoints, missionGoldPoints)}`,
        papyrus: papyrusSrcArr[Math.floor(Math.random() * papyrusSrcArr.length)],
        character: charactersArr[Math.floor(Math.random() * charactersArr.length)],
        background: backgroundsData[Math.floor(Math.random() * backgroundsData.length)],
        monster: {
            src: monstersArr[Math.floor(Math.random() * monstersData.length)],
            strength: Math.ceil(userStats.strength * 0.8),
            defence:  Math.ceil(userStats.defence * 0.8),
            physicalEndurance: Math.ceil(userStats.physicalEndurance * 0.8),
            luck: Math.ceil(userStats.physicalEndurance * 0.8),
            damage: Math.ceil(userStats.damage * 0.8),
            health: Math.ceil(userStats.health * 0.8),
            damageReduce: Math.ceil(userStats.damageReduce * 0.8),
            critical: Math.ceil(userStats.critical * 0.8),
        }
    }

    // prevent of duplicates
    missionDscArr.splice(missionDscArr.indexOf(mission.dsc), 1);
    missionTitlesArr.splice(missionTitlesArr.indexOf(mission.title), 1);
    papyrusSrcArr.splice(papyrusSrcArr.indexOf(mission.papyrus), 1);
    charactersArr.splice(charactersArr.indexOf(mission.character), 1);
    return mission
}