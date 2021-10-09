export class MobileNav {
    private dom: {
        navContainer: HTMLElement;
        navIcon: HTMLImageElement;
        links: NodeListOf<Element>;
    }
    constructor(){
        this.dom = {
            navContainer: document.querySelector('.nav'),
            navIcon: document.querySelector('.mobileNav__icon'),
            links: document.querySelectorAll('.nav a')
        }
        this.init();
    }
    toogleNav(){
        console.log(this.dom.links)
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
        if(window.innerHeight >= 1000 || window.innerWidth < 1024){
              this.dom.links.forEach(el => el.addEventListener('click', () => this.dom.navContainer.style.display = 'none'));
        }
    
    }
    init(){
       this.toogleNav();
       this.hideNav();
    }
}