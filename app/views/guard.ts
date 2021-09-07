export class Guard {

    private root: HTMLElement
    private sliderValue: HTMLElement
    private inputSlider: HTMLElement

    constructor() {
        this.root = document.getElementById('game__view')
        this.sliderValue = document.getElementById('#slider_value')
        this.inputSlider = document.getElementById('#guard_input_slider')
        this.init();
    }

    async render() {
        this.root.innerHTML = `<section class='guard'>
           <div class='guard__item'>
             <div class='guard__kingWrapper'>
                <img src='./images/guard_king.png' alt='King' class='guard__king'/>
             </div>
             <div class='guard__infoWrapper'>
              <h2 class='guard__title'>King guard</h2>
              <p class='guard__text' >As you know, there are lots of monsters around my castle. 
              I can't even do my job. I have heard that you are a brave knight who is not afraid of monsters,
               and they hide in their hiding places when they see you. 
               Protect this castle from monsters and I will reward you.
               </p>
             
              <div class='range'>

                <div class='sliderValue'>
                  <span id='slider_value'>1h</span>
                </div>

                <div class='field'>        
                   <input type='range' name='guard_time_slider' class='field__progressBar-1' id='guard_input_slider' min='1' max='10' value='1'>
                </div>
                
              </div>

               <div class='guard__award'>
                 <img src='./images/guard_reward_icon.png' alt='King' class='guard__awardIcon'/>
                 <strong class='guard__awardAmount'>Reward: 123</strong>
               </div>
 
               <div class='guard__acceptBtnWrapper'> 
                 <button class='guard__acceptBtn'>START</button>
               </div>
             </div>

            
           </div>
        </section>`;

     
    }

 
    guardSliderEvent() {
        this.inputSlider.oninput = (e) => {

            // set text inside span to notify user about selected guard time
            const input = e.target as HTMLInputElement
            this.sliderValue.innerText = input.value + 'h'
            
            // change style
            const styleLeft: number = parseInt(input.value) * 10;
            if(styleLeft < 50){
                 this.sliderValue.style.left = styleLeft - 10 + '%'
            } 
            else if (styleLeft > 50){
                this.sliderValue.style.left = styleLeft - 9 + '%'
            }
            else{
                this.sliderValue.style.left = '40%'
            }
            this.inputSlider.className = `field__progressBar-${input.value}`
            
        };
    }



    initScripts(){
        this.guardSliderEvent();
    }
    getDOMElements() {
        this.sliderValue = document.querySelector('#slider_value');
        this.inputSlider = document.querySelector('#guard_input_slider');
    }

    init() {
        this.render();
        this.getDOMElements();
        this.initScripts();
    }
}

//<a href='https://www.freepik.com/vectors/background'>Background vector created by vectorpocket - www.freepik.com</a>