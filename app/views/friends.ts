export class Friends {

    private root: HTMLElement
    private dom: {
        sortBtn: HTMLElement,
        filterBtn: HTMLElement,
        sortForm: HTMLElement,
        filterForm: HTMLElement
    }
    constructor() {
        this.root = document.getElementById("game__view")
        this.dom = {
            sortBtn: document.querySelector('#friends_sort_btn'),
            filterBtn: document.querySelector('#friends_filter_btn'),
            sortForm: document.querySelector('#friends_sort_form'),
            filterForm: document.querySelector('#friends_filter_form')
        }
        this.init();
    }

    async render() {
        this.root.innerHTML = `<section class='friends'>
           <div class='friends__topBar'>

             <div class='friends__searchWrapper'>
               <img src='./images/friends_icon_search.png' alt='search' class='friends__searchIcon'/>
               <input type='text' class='friends__searchInput' name='friends_search_input'>
             </div>

             <div class='friends__settingsWrapper'>
                <img  src='./images/friends_icon_sort.png' alt='sort' class='friends__settingsIcon' id='friends_sort_btn'/>
                <img  src='./images/friends_icon_filter.png' alt='filter' class='friends__settingsIcon'  id='friends_filter_btn'/>


                <form class='friends__settingsForm' id='friends_sort_form'>
                <div class='friends__checkboxWrapper friends__checkboxWrapper-highestLevel'>
                    <label> 
                    
                    From highest level
                      <input type='checkbox'>
                      <span></span>
                      <i class="fas fa-check"></i>
                    </label>
                </div>
                
                 <div class='friends__checkboxWrapper friends__checkboxWrapper-LowestLevel'>
                    <label>   
                    From lowest level
                      <input type='checkbox'>
                      <span></span>
                      <i class="fas fa-check"></i>
                    </label>
                </div>
                
                <div class='friends__checkboxWrapper friends__checkboxWrapper-highestGold'>
                    <label>   
                    Highest amount of gold
                      <input type='checkbox'>
                      <span></span>
                      <i class="fas fa-check"></i>
                    </label>
                </div>
                
                <div class='friends__checkboxWrapper friends__checkboxWrapper-LowestGold'>
                    <label>   
                      Lowest amount of gold
                      <input type='checkbox'>
                      <span></span>
                      <i class="fas fa-check"></i>
                    </label>
                </div>
                
                 <div class='friends__checkboxWrapper friends__checkboxWrapper-timePlayed'>
                    <label>   
                     Game time
                      <input type='checkbox'>
                      <span></span>
                      <i class="fas fa-check"></i>
                    </label>
                </div>
                </form>
                




                <form class='friends__settingsForm friends__settingsForm-filter' id='friends_filter_form'>
                <div class='friends__checkboxWrapper friends__checkboxWrapper-highestLevel'>
                    <label> 
                      Online friends
                      <input type='checkbox'>
                      <span></span>
                      <i class="fas fa-check"></i>
                    </label>
                </div>

                 <div class='friends__checkboxWrapper friends__checkboxWrapper-LowestLevel'>
                    <label>   
                    Ofline friends
                      <input type='checkbox'>
                      <span></span>
                      <i class="fas fa-check"></i>
                    </label>
                </div>

               <div class='friends__checkboxWrapper friends__checkboxWrapper-highestGold'>
                    <label>   
                    With a higher level than yours

                      <input type='checkbox'>
                      <span></span>
                      <i class="fas fa-check"></i>
                    </label>
                </div>

                <div class='friends__checkboxWrapper friends__checkboxWrapper-LowestGold'>
                    <label>   
                    With a lower level than yours
                      <input type='checkbox'>
                      <span></span>
                      <i class="fas fa-check"></i>
                    </label>
                </div>

              </form>

             </div>
           </div>

           <div class='friends__list'>
             <div class='friends__item'> 
               <div class='friend'> 
                 <div class='friend__portraitWrapper'>
                   <img src='./images/hero_portraits/human_1.png' alt='portait' class='friend__portrait'/>
                 </div>
                 <h2 class='friend__name'>MMMMMMMMMMMMMMMM</h2>
                 <div class='friend__levelWrapper'> 
                   <img src='./images/friends_icon_level.png' alt='level' class='friend__levelIcon'/>
                   <strong class='friend__level'>LEVEL: 125</strong>
                 </div>
               </div>
             </div>
           </div>
        </section>`;
    }

    showFormsEvents() {

        // toogle filter form
        this.dom.filterBtn.addEventListener("click", () => {

            //hide sort form
            this.dom.sortForm.style.display = 'none';

            // toogle filter form
            const flag: boolean = this.dom.filterForm.style.display === "block";
            flag ? this.dom.filterForm.style.display = "none" : this.dom.filterForm.style.display = "block"
        });


        // toogle sort form
        this.dom.sortBtn.addEventListener("click", () => {

            //hide filter form
            this.dom.filterForm.style.display = 'none';

            // toogle sort form
            const flag: boolean = this.dom.sortForm.style.display === "block";
            flag ? this.dom.sortForm.style.display = "none" : this.dom.sortForm.style.display = "block"
        });
    }


    initScripts() {
        this.showFormsEvents();
    }
    getDOMElements() {
        this.dom = {
            sortBtn: document.querySelector('#friends_sort_btn'),
            filterBtn: document.querySelector('#friends_filter_btn'),
            sortForm: document.querySelector('#friends_sort_form'),
            filterForm: document.querySelector('#friends_filter_form')
        }
    }
    init() {
        this.render();
        this.getDOMElements();
        this.initScripts();
    }
}


