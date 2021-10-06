import { getInboxHTMLCode } from '../viewsHTMLCode/inbox';
import { View } from './view';
import { MailData } from '../types';
import { updateUserData } from '../firebase/operations';
export class Inbox extends View {

  private dom: {
    mailListContainer: HTMLElement;
    closeMailIcon: HTMLElement
    mails: NodeListOf<Element>;
    mailContainer: HTMLElement;
    deleteMailBtns: NodeListOf<Element>;
    mailList: HTMLElement;
    mailAmount: HTMLElement
  }
  constructor() {
    super();
    this.dom = {
      mailListContainer: document.querySelector('.inbox__item:first-child'),
      closeMailIcon: document.querySelector('.inbox__closeMail'),
      mails: document.querySelectorAll('.inbox__listItem'),
      mailContainer: document.querySelector('#mail-container'),
      deleteMailBtns: document.querySelectorAll('.inbox__deleteIcon i'),
      mailList: document.querySelector('.inbox__list'),
      mailAmount: document.querySelector('.inbox__mailAmount')
    }
  }

  render() {
    this.root.innerHTML = getInboxHTMLCode(this.userData);
  }

  openMail() {
    this.dom.mails.forEach(el => el.addEventListener('click', (e) => {
      e.preventDefault();
      const element: HTMLElement = el as HTMLElement;
      const mail: MailData = this.userData.inbox[this.userData.inbox.findIndex(el => el.id === element.dataset.mailId)];
      this.dom.mailContainer.innerHTML = mail.content;

      if (window.innerWidth < 1024) {
        this.toogleMail();
      }
    }))
  }

  toogleMail() {
    const flag: boolean = this.dom.mailContainer.classList.contains('disabled')
    if (flag) {
      this.dom.mailContainer.classList.remove('disabled');
      this.dom.mailListContainer.classList.add('disabled');
      this.dom.closeMailIcon.classList.remove('disabled');
    }
    else {
      this.dom.mailContainer.classList.add('disabled');
      this.dom.mailListContainer.classList.remove('disabled');
      this.dom.closeMailIcon.classList.add('disabled');
    }
  }



  deleteMail() {
    this.dom.deleteMailBtns.forEach(el => el.addEventListener('click', () => {
      const element: HTMLElement = el as HTMLElement;
      const index: number = this.userData.inbox.findIndex(el => el.id === element.dataset.mailId);
      this.userData.inbox.splice(index, 1);
      this.dom.mailAmount.innerText = `${this.userData.inbox.length}`;
      updateUserData(this.userData);
      this.dom.mailList.removeChild(element.parentElement.parentElement);
    }));
  }
  closeMail(){
    this.dom.closeMailIcon.addEventListener('click', ()=> {
      this.dom.mailContainer.classList.add('disabled');
      this.dom.mailListContainer.classList.remove('disabled');
      this.dom.closeMailIcon.classList.add('disabled');
    })
  }
  mobile() {
    console.log(this.dom.mailContainer)
    if (window.innerWidth < 1024) {
      this.dom.mailContainer.classList.add('disabled')
    }
  }

  initScripts() {
    this.mobile();
    this.openMail();
    this.deleteMail();
    this.closeMail();
  }

  onDataChange() { }
  getDOMElements() {
    this.dom = {
      mailListContainer: document.querySelector('#mail-list'),
      closeMailIcon: document.querySelector('.inbox__closeMail'),
      mails: document.querySelectorAll('.inbox__listItem'),
      mailContainer: document.querySelector('#mail-container'),
      deleteMailBtns: document.querySelectorAll('.inbox__deleteIcon i'),
      mailList: document.querySelector('.inbox__list'),
      mailAmount: document.querySelector('.inbox__mailAmount')
    }
  }
}

//dragon background
//<a href='https://www.freepik.com/vectors/character'>Character vector created by macrovector - www.freepik.com</a>

// friend img
//<a href='https://www.freepik.com/vectors/abstract'>Abstract vector created by upklyak - www.freepik.com</a>

// introduce img
// <a href='https://www.freepik.com/vectors/building'>Building vector created by macrovector - www.freepik.com</a>