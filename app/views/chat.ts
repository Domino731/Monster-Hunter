import { getChatHTMLCode } from '../viewsHTMLCode/chat';
export class Chat {
    private root: HTMLElement
    constructor(root: HTMLElement) {
        this.root = root;
        this.init();
    }


    async getChatroomData(){

    }
    // method which is responsible for injecting html code into game root
    render() {
        this.root.innerHTML = getChatHTMLCode();
    }

    // getting the dom elements of newly injected html code
    getDOMElements() {

    }

    // initialization of scripts
    initScripts() {
        
    }

    init() {
      this.getChatroomData()
      .then(()=> {
          this.render();
          this.getDOMElements();
          this.initScripts();
      })
      .catch(err => console.log(err))
    }
}