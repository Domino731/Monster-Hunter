const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months: string[] = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
const today: Date = new Date();


// get differences between the dates
const getDifferenceInDays = (date1: Date, date2: Date): number => {
    const diffInMs: number = Math.abs(date2.getTime() - date1.getTime());
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

// general date format
export const formatDate = (date: Date): string => {

    if (date.getDay() === today.getDay()) {
        return `Today`;
    }
    else if (getDifferenceInDays(date, today) === 1) {
        return `Yesterday`;
    }
    else if (getDifferenceInDays(date, today) < 7) {
        return `${days[date.getDay()]}`;
    }
    else {
        return `${date.getDate()} ${months[date.getMonth()]}`;
    }
}

// date format for chat
export const formatChatDate = (date: Date): string => {
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    if (date.getDay() === today.getDay()) {
        return `${date.getHours()}:${minutes}`;
    }
    else if (getDifferenceInDays(date, today) < 7) {
        return `${days[date.getDay()]}, ${date.getHours()}:${minutes}`;
    }
    else if (date.getMonth() === today.getMonth()) {
        return `${months[date.getMonth() + 1]}, ${date.getDate()}, ${days[date.getDay()]}`;
    }
    else {
        return months[date.getMonth() + 1];
    }
}

// date format fo mails
export const formatMailDate = (date: Date): string => {
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    if (date.getDay() === today.getDay()) {
        return `  Today </br>${date.getHours()}:${minutes}`;
    }
    else if (getDifferenceInDays(date, today) < 7) {
        return `${days[date.getDay()]} </br> ${date.getHours()}:${minutes}`;
    }
    else if (date.getMonth() === today.getMonth()) {
        return `${months[date.getMonth() + 1]}, ${date.getDate()}, ${days[date.getDay()]};
        </br>  ${date.getHours()}:${minutes}
        `
    }
    else {
        return `${months[date.getMonth() + 1]} ${date.getDate()}`;
    }
}

