import { database } from "firebase";

const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months: string[] = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
const today: Date = new Date();

const getDifferenceInDays = (date1: Date, date2: Date): number => {
    const diffInMs = Math.abs(date2.getTime() - date1.getTime());
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

export const formatDate = (date: Date): string => {



    if (date.getDay() === today.getDay()) {
        return `Today`
    }
    else if (getDifferenceInDays(date, today) < 7) {
        return `${days[date.getDay()]}`
    }
    else {
        return `${months[date.getMonth()]}`
    }
}

export const formatChatDate = (date: Date) => {
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes() 
    if (date.getDay() === today.getDay()) {
        
        return `${date.getHours()}:${minutes }`;
    }
    else if (getDifferenceInDays(date, today) < 7) {
        return `${days[date.getDay()]}, ${date.getHours()}:${minutes}`;
    }
    else if (date.getMonth() === today.getMonth()) {
        return `${months[date.getMonth() + 1]}, ${days[date.getDay()]}, ${date.getHours()}:${minutes}`
    }
}

