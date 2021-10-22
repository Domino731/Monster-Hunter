/**
 * class responsible for mobile nav which is displaying below 1024px
 */ 
export class MobileNav {

    private dom: {
        // container with navigation menu need to toggle him by button - toggleNav() method
        navContainer: HTMLElement;
        // icon by which user can toogle container with navigation - toogleNav() method
        navIcon: HTMLImageElement;
        // when user click on one of these links then hide nav continer - hideNav() method
        links: NodeListOf<Element>;
    }
    constructor(){
        this.dom = {
            navContainer: document.querySelector('.nav'),
            navIcon: document.querySelector('.mobileNav__icon'),
            links: document.querySelectorAll('.nav a'),
        }
        this.init();
    }

    // click event applied on button by which user can toggle container with navigation
    toggleNav(){
        this.dom.navIcon.addEventListener('click', ()=> {

           // check if nav container is active
           const flag : boolean = this.dom.navContainer.style.display === 'block';
           if(flag){
            this.dom.navContainer.style.display = 'none';
            this.dom.navIcon.src = './images/menu.png';
           } 
           else{
            this.dom.navContainer.style.display = 'block';
             this.dom.navIcon.src = './images/close.png';
           }
        });

        
    }

    // click events applied on each link in navigation, when user click one of these links then hide container with navigation
    hideNav(){
              this.dom.links.forEach(el => el.addEventListener('click', () => {             
                 if(this.dom.navContainer.style.display === 'block'){
                    this.dom.navContainer.style.display = 'none'; 
                 } 
                 this.dom.navIcon.src = './images/menu.png';
              }));
    }

    // initialization of scripts
    init(){
       this.toggleNav();
       this.hideNav();
    }
}