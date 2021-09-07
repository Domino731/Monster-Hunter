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
                  <span id='slider_value'>100</span>
                </div>

                <div class='field'>
                   <div class='value left'>0</div>
                   <input type='range' name='guard_time_slider' id='guard_input_slider' min='1' max='10' value='1'>
                   <div class='value right'>100</div>
                </div>
              </div>
             </div>
           </div>
        </section>`;

     
    }

 
    guardSliderEvent() {
        this.inputSlider.oninput = (e) => {

            // set text inside span to notify user about selected guard time
            const input = e.target as HTMLInputElement
            this.sliderValue.innerText = input.value
            
            // change style
            const styleLeft: number = parseInt(input.value) * 10;
            if(styleLeft < 50){
                 this.sliderValue.style.left = styleLeft - 10 + '%'
            } 
            else if (styleLeft > 50){
                this.sliderValue.style.left = styleLeft - 5 + '%'
            }
            else{
                this.sliderValue.style.left = '45%'
            }
            
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