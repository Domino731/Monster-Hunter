export class MobileNav {
    private dom: {
        navContainer: HTMLElement;
        navIcon: HTMLImageElement;
        links: NodeListOf<Element>;
        mobileNavContainer: HTMLElement;
    }
    constructor(){
        this.dom = {
            navContainer: document.querySelector('.nav'),
            navIcon: document.querySelector('.mobileNav__icon'),
            links: document.querySelectorAll('.nav a'),
            mobileNavContainer: document.querySelector('.mobileNav')
        }
        this.init();
    }
    toogleNav(){
        this.dom.navIcon.addEventListener('click', ()=> {
           const flag : boolean = this.dom.navContainer.style.display === 'block';
           if(flag){
            this.dom.navContainer.style.display = 'none';
            this.dom.navIcon.src = './images/menu.png';
           } 
           else{
            this.dom.navContainer.style.display = 'block';
             this.dom.navIcon.src = './images/close.png';
           }
        })
    }

    hideNav(){
              this.dom.links.forEach(el => el.addEventListener('click', () => {             
                 if(this.dom.navContainer.style.display === 'block'){
                    this.dom.navContainer.style.display = 'none'; 
                 } 
                 this.dom.navIcon.src = './images/menu.png';
              }));
    }
    init(){
       this.toogleNav();
       this.hideNav();
    }
}