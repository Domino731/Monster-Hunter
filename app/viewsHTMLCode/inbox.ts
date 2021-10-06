import { UserData } from '../types';
import { formatMailDate } from '../functions/formatDate';
export const getInboxHTMLCode = (user: UserData) : string => {
    return `
    <section class='inbox'>
    <div class='inbox__closeMail disabled'> 
    <img src='./images/close.png' />
     </div>
           <div class='inbox__item' id='mail-list'>
             <div class='inbox__header'>
                <img src='./images/inbox_icon_message.png' alt='_message' class='inbox__mailIcon'/>
                <strong class='inbox__mailAmount'>${user.inbox.length}</strong>
             </div>

             <ul class='inbox__list'>
             ${
                user.inbox.map((el) => {
                  return `
                  <li>
                     <div class='inbox__deleteIcon'>
                     <i class="fas fa-trash-alt"  data-mail-id='${el.id}'></i>
                     </div>
                     <div class='inbox__listItem' data-mail-id='${el.id}' >  
                     <h2 class='inbox__listTitle'>${el.title}</h2>
                       <div class='inbox__listSubTitle'>
                       <span>From: ${el.createdBy}</span>
                       
                       </div>
                     <div class='inbox__listDate'>${formatMailDate(el.createdAt)}<div>
                     </div>
                </li>
                  `
                }).join('')
                }
             </ul>
           </div>


           <div class='inbox__item' id='mail-container'>
        
           </div>
           
        </section>
    `
}