// get guard payment value which is according to user's level
export const getGuardPaymentValue = (userLevel: number): number => {
    if (userLevel >= 400){
        return 50000
    }
    else if(userLevel >= 300){
        return 30000
    }
    else if(userLevel >= 250){
        return 25000
    }
    else if(userLevel >= 250){
        return 25000
    }
    else if(userLevel >= 200){
        return 20000 
    }
    else if(userLevel >= 160){
        return 13000
    }
    else if(userLevel >= 130){
        return 9000
    }
    else if (userLevel >= 100){
        return 5000
    }
    else if (userLevel >= 75){
        return 3500
    }
    else if (userLevel >= 50){
        return 2000
    }
    else if (userLevel >= 40){
        return 1500
    }
    else if (userLevel >= 30){
        return 1000
    }
    else if (userLevel >= 20) { 
        return 700
    }
    else if (userLevel >= 15) {
        return 500
    }
    else if (userLevel >= 10) {
        return 320
    }
    else if(userLevel >= 5){
        return 160
    }
    else {
        return 100
    }
}