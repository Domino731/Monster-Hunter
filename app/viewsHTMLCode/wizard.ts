export const getWizardHTMLCode = (): string => {
    return `
     <section class='wizard'>
        <div class='wizard__characterWrapper'>
          <img class='wizard__chracterImg' src='./images/wizard.png' alt='wizard'/> 
        </div>

        <div class='wizard__descriptionWrapper'> 
           <div class='wizard__description'>
              <h2 class='wizard__title'>try one's fortune </h2>
              <p class='wizard__text'> 
              Here's the magic circle created by the legendary gods. 
              It has served warriors since the beginning of the war against monsters. It has all the necessary items for battles with monsters. The magic circle requires a lot of mana to spin, 
              the mana is renewed every midnight when one of the legendary gods gives up some of his mana.    
              </p>
              <button class='wizard__btn'>SPIN</button>
           </div>
        </div>

        <div class='spinningWheel__wrapper'>
        <div class='spinningWheel__content'>
        <div class="one">1</div>
        <div class="two">2</div>
        <div class="three">3</div>
        <div class="four">4</div>
        <div class="five">5</div>
        <div class="six">6</div>
        <div class="seven">7</div>
        <div class="eight">8</div>
        <div class='circle circle-animation'> </div>
    </div>
        </div>
     <section>
     `
}