import { UserData, MailData } from '../types';
import { formatMailDate } from '../functions/formatDate';
/**
 * get html code for inbox section
 * @param user - data about current logged user
 */
export const getInboxHTMLCode = (user: UserData) : string => {
    return `
    <section class='inbox background'>

    <div class='closeIcon closeIcon__email disabled'>
        <img src='./images/close.png' />
    </div>

    <div class='inbox__item' id='email-list'>

        <div class='inbox__header glass'>
            <img src='./images/inbox_icon_message.png' alt='_message' class='inbox__emailIcon'
                title='Amount of e-mails' />
            <strong class='inbox__emailAmount'>${user.inbox.length}</strong>
        </div>

        <ul class='inbox__list'> </ul>

    </div>


    <div class='inbox__item' id='email-container'> </div>

    </section>
    `;
}

/**
 * get html code for mail
 * @param mailData - data about mail
 */
export const mailHTMLCode = (mailData: MailData) : string => {
  return `
  <div class='inbox__deleteIcon'>
  <i class="fas fa-trash-alt"></i>
</div>

<div class='inbox__listItem glass'>
  <h2 class='inbox__listTitle '>${mailData.title}</h2>
  <div class='inbox__listSubTitle'><span>From: ${mailData.createdBy}</span></div>
      

  
  <div class='inbox__listDate'>${formatMailDate(mailData.createdAt)}</div>
</div>  
  `;
}