export class MobileNav {
    private dom: {
        navContainer: HTMLElement;
        navIcon: HTMLImageElement
    }
    constructor(){
        this.dom = {
            navContainer: document.querySelector('.nav'),
            navIcon: document.querySelector('.mobileNav__icon')
        }
        this.init();
    }
    toogleNav(){
        this.dom.navIcon.addEventListener('click', ()=> {
           const flag : boolean = this.dom.navContainer.style.display === 'block';
           if(flag){
            this.dom.navContainer.style.display = 'none'
           } 
           else{
            this.dom.navContainer.style.display = 'block'
           }
        })
         
    }
    init(){
       this.toogleNav();
    }
}