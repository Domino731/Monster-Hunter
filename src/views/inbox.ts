import { getInboxHTMLCode, mailHTMLCode } from '../HTMLCode/inbox';
import { Component } from './view';
import { updateUserData } from '../firebase/operations';

// class responsible for inbox - user can open email and read about game, new features and other...
export class Inbox extends Component {

  private dom: {
    // container with all emails and amount of mails, needed to hide this container when user selects a specific mail (only below 1024px) - closeMail() and toogleMails() methods
    mailListContainer: HTMLElement | null;
    // icon by which can close email (only below 1024px) - closeMail() and toogleMails() methods
    closeMailIcon: HTMLElement | null;
    // container into which the html email code will be inserted - openMail() method
    emailContainer: HTMLElement | null;
    // list in which emails will berendered- renderMails() method
    emailList: HTMLElement | null;
    // amount of all emails in user's inbox, changing when user deletes mail - deleteMail() method
    emailAmount: HTMLElement | null;
  }
  constructor() {
    super();
    this.freepikAttribute = `<a href='https://www.freepik.com/vectors/character'>Character vector created by macrovector - www.freepik.com</a>`;
    this.bodyBackgroundSrc = '/images/background_inbox.jpg';
    this.dom = {
      mailListContainer: document.querySelector('.inbox__item:first-child'),
      closeMailIcon: document.querySelector('.closeIcon__email'),
      emailContainer: document.querySelector('#email-container'),
      emailList: document.querySelector('.inbox__list'),
      emailAmount: document.querySelector('.inbox__emailAmount')
    }
  }

  /**
   * 
   * @param mailData - email html code which will be inserted into container mail
   */
  openEMail(mailCode: string) {
    // set mail
    this.dom.emailContainer.innerHTML = mailCode;
    if (window.innerWidth < 1024) {
      this.toggleMail();
    }
  }

  // this method is responsible to toggling between mails list and mail content container (only below 1024px)
  toggleMail() {
    const flag: boolean = this.dom.emailContainer.classList.contains('disabled')
    if (flag) {
      this.dom.emailContainer.classList.remove('disabled');
      this.dom.mailListContainer.classList.add('disabled');
      this.dom.closeMailIcon.classList.remove('disabled');
    }
    else {
      this.dom.emailContainer.classList.add('disabled');
      this.dom.mailListContainer.classList.remove('disabled');
      this.dom.closeMailIcon.classList.add('disabled');
    }
  }

  /**
   * method responsible for deleting email from user inbox
   * @param id - id of email needed to find what email should be deleted
   */
  deleteEMail(id: string) {

    // find and delete email
    const index: number = this.userData.inbox.findIndex(el => el.id === id);
    this.userData.inbox.splice(index, 1);
    this.dom.emailAmount.innerText = `${this.userData.inbox.length}`;

    // update user data -> renderMails() placed in onDataChange() will rerender emails list
    updateUserData(this.userData);
  }

  // method responsible for hiding current selected email container (mainly for devices below 1024px)
  closeEMail() {
    this.dom.closeMailIcon.addEventListener('click', () => {
      this.dom.emailContainer.classList.add('disabled');
      this.dom.mailListContainer.classList.remove('disabled');
      this.dom.closeMailIcon.classList.add('disabled');
    });
  }

  // hide email container on mobile devices -> emails list will be on full width, and when user click on specific email this list will be hidden and email container will showed (on full device width)
  mobile() {
    if(window.innerWidth < 1024){
      this.dom.emailContainer.classList.add('disabled');
    }
  
    window.addEventListener('resize', ()=> {
      if(! this.dom.emailContainer.classList.contains('disabled')){
        this.dom.emailContainer.classList.add('disabled');
      }
    });
  }

  // render e-mails in list
  renderEMails() {

    // clear previous list (mainly for situation when user deletes e-mail)
    this.dom.emailList.innerHTML = '';
    this.userData.inbox.forEach(el => {

      // create list elements
      const li: HTMLElement = document.createElement('li');
      li.innerHTML = mailHTMLCode(el);

      // find dom elements in order to add events 
      const deleteIcon: HTMLElement = li.querySelector('.inbox__deleteIcon i');
      const mailWrapper: HTMLElement = li.querySelector('.inbox__listItem');

      // add events -> opportunitie to show speficic mail and delete this mail
      deleteIcon.addEventListener('click', () => this.deleteEMail(el.id));
      mailWrapper.addEventListener('click', () => this.openEMail(el.content));

      // update list
      this.dom.emailList.appendChild(li);
    })
  }



  initScripts() {
    this.renderEMails();
    this.mobile();
    this.closeEMail();
  }
  getDOMElements() {
    this.dom = {
      mailListContainer: document.querySelector('#email-list'),
      closeMailIcon: document.querySelector('.closeIcon__email'),
      emailContainer: document.querySelector('#email-container'),
      emailList: document.querySelector('.inbox__list'),
      emailAmount: document.querySelector('.inbox__emailAmount')
    }
  }
  render() {
    this.root.innerHTML = getInboxHTMLCode(this.userData);
  }
  onDataChange() {
    this.renderEMails();
  }
}
