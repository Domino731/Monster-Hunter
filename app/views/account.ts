export class Account {

    private root: HTMLElement
    constructor() {
        this.root = document.getElementById("game__view")
        this.init();
    }

    async render() {
        this.root.innerHTML = `<section class='account'>
          <div class='account__item'>
             <h2 class='account__nick'>NightNinja_890</h2>

             <div class='account__element'>
                <div class='account__elementIcon'>
                  <img  src='./images/account_date.png' alt='calendar'/>
                </div>
                <div class='account__elementContent'> 
                    12 November 2020
                </div>
             </div>

             <form>
              <div class='account__element'>
                <div class='account__elementIcon'>
                  <img  src='./images/account_email.png' alt='email'/>
                </div>           
                   <input type='text' name='account_email' class='account__elementContent account__elementContent-email' placeholder='New e-mail'>               
             </div>

             <div class='account__element account__element-password'>
             <div class='account__elementIcon'>
               <img  src='./images/account_password.png' alt='lock'/>
             </div>            
                <input type='password' name='account_email' class='account__elementContent account__elementContent-password' placeholder='New password'>            
             </div>

              <div class='account__element account__element-password'>
             <div class='account__elementIcon'>
               <img  src='./images/account_password.png' alt='lock'/>
             </div>            
                <input type='password' name='account_email' class='account__elementContent account__elementContent-password' placeholder='Repeat new password' >            
             </div>
              <button class='account__btn'>Update your profile</button>
             </form>


          </div>
        </section>`;
    }

    init() {
        console.log(this.root)
       this.render();
    }
}

//<a href='https://www.freepik.com/vectors/light'>Light vector created by vectorpouch - www.freepik.com</a>