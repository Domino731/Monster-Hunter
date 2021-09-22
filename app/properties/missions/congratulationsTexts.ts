export const congratulationsTexts : string[] = [
    `I know it wasn't easy, but you did it`,
    `I know it was hard, but at least your work will be well rewarded`,
    `One monster killed won't do anything, there are plenty of people in the kingdom who need help`,
    `One less monster`,
    `The King's Guard needs people like you`,
    `I don't know what i will do without you`,
    `Good work`
]

export const getRandomcongratulationsText = () : string => congratulationsTexts[Math.floor(Math.random() * congratulationsTexts.length)]