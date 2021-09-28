import { getInboxHTMLCode } from '../viewsHTMLCode/inbox';
import { View } from './view';
import { MailData } from '../types';
export class Inbox extends View {

  private dom : {
    mails: NodeListOf<Element>;
    mailContainer: HTMLElement;
  }
    constructor() {
        super();
        this.dom = {
          mails: document.querySelectorAll('.inbox__listItem'),
          mailContainer: document.querySelector('#mail-container')
        }
    }
    render() {
        this.root.innerHTML = getInboxHTMLCode(this.userData);
    }

    openMail(){
       this.dom.mails.forEach(el => el.addEventListener('click', ()=> {
         const element : HTMLElement = el as HTMLElement;
         const mail: MailData = this.userData.inbox[this.userData.inbox.findIndex(el => el.id === element.dataset.mailId)];
         this.dom.mailContainer.innerHTML = mail.content;
       }))
    }
    initScripts(){
      this.openMail();
    }
    onDataChange(){}
    getDOMElements(){
      this.dom = {
        mails: document.querySelectorAll('.inbox__listItem'),
        mailContainer: document.querySelector('#mail-container')
      }
    }
}

//dragon background
//<a href='https://www.freepik.com/vectors/character'>Character vector created by macrovector - www.freepik.com</a>

// friend img
//<a href='https://www.freepik.com/vectors/abstract'>Abstract vector created by upklyak - www.freepik.com</a>

// introduce img
// <a href='https://www.freepik.com/vectors/building'>Building vector created by macrovector - www.freepik.com</a>