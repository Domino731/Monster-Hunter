import { auth } from './../firebase/index';
export const getAccountHTMLCode = (userNick: string, deleteCode: string) : string => {
    return `
    <section class='account background'>
          <div class='account__item' id='update-account'>
             <h2 class='account__title account__title-nick'>${userNick}DDD</h2>

             <div class='account__element'>
                <div class='account__elementIcon'>
                  <img  src='./images/account_date.png' alt='calendar'/>
                </div>
                <div class='account__elementContent'> 
                    12 November 2020
                </div>
             </div>

             <form id='account-update'>
              <div class='account__element'>
                <div class='account__elementIcon'>
                  <img  src='./images/account_email.png' alt='email'/>
                </div>           
                   <input type='text' name='email' value=${auth.currentUser.email} class='account__elementContent account__elementContent-email' placeholder='Leave blank to keep email same'>               
             </div>

             <div class='account__element account__element-password'>
             <div class='account__elementIcon'>
               <img  src='./images/account_password.png' alt='lock'/>
             </div>            
                <input type='password' name='password' class='account__elementContent account__elementContent-password' placeholder='New password'>            
             </div>

              <div class='account__element account__element-password'>
             <div class='account__elementIcon'>
               <img  src='./images/account_password.png' alt='lock'/>
             </div>            
                <input type='password'  class='account__elementContent account__elementContent-password' placeholder='Repeat new password' name='passwordRepeat' >            
             </div>
              
            
               <div class='account__msg account__msg-error disabled' id='update_profile_error'> 
                 Password do not match!
               </div>


               <div class='account__msg account__msg-success disabled' id='update_profile_email'> 
                 E-mail has been updated.
               </div>

               
               <div class='account__msg account__msg-success disabled' id='update_profile_password'> 
                  Password has been updated.
               </div>
           
              <button class='account__btn account__btn-update' id='btn-update-account'>Update your account</button>
              <div class='account__succcessfullUpdate disabled'>Successfully updated</div>
             </form>


          </div>


         <div class='account__item disabled' id='delete-account'> 
             <h2 class='account__title account__title-delete'>Delete your account</h2>

             <strong class='account__deleteCode'>${deleteCode}</strong>
             <div class='account__element account__element-password'>
             <div class='account__elementIcon'>
               <img  src='./images/account_signature.png' alt='lock'/>
             </div>            
                <input type='text' name='deleteCode' class='account__elementContent account__elementContent-password' placeholder='Rewrite above code to delete account'>            
             </div>
             <button class='account__btn account__btn-delete disabled' id='btn-delete-account'>Delete your account</button>
         </div>

    
          <div class='account__deleteIcon'> 
            <img src='./images/account_delete_icon.png' title='Delete your account'/>
          </div>
        </section>
    `
}