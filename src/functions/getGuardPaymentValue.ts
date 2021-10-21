
/**
 * get guard payout value which is according to user's level
 * @param userLevel - level needed to return appropriate payout
 */
export const getGuardPaymentValue = (userLevel: number): number => {
    if (userLevel >= 400) {
        return 9000;
    }
    else if (userLevel >= 300) {
        return 8000;
    }
    else if (userLevel >= 250) {
        return 7000;
    }
    else if (userLevel >= 250) {
        return 6000;
    }
    else if (userLevel >= 200) {
        return 5000;
    }
    else if (userLevel >= 160) {
        return 4000;
    }
    else if (userLevel >= 130) {
        return 3000;
    }
    else if (userLevel >= 100) {
        return 2000;
    }
    else if (userLevel >= 75) {
        return 1000;
    }
    else if (userLevel >= 50) {
        return 800;
    }
    else if (userLevel >= 40) {
        return 690;
    }
    else if (userLevel >= 30) {
        return 500;
    }
    else if (userLevel >= 20) {
        return 410;
    }
    else if (userLevel >= 15) {
        return 330;
    }
    else if (userLevel >= 10) {
        return 220;
    }
    else if (userLevel >= 5) {
        return 160;
    }
    else {
        return 100;
    }
}