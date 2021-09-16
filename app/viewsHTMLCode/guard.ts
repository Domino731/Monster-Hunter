export const getGuardHTMLCode = () : string => {

    return  `
    <div class='guard__wrapper disabled' id='guard_menu'>
    <section class='guard-menu'>
    <div class='guard__item'>
      <div class='guard__kingWrapper'>
         <img src='./images/guard_king.png' alt='King' class='guard__king'/>
      </div>
      <div class='guard__infoWrapper'>
       <h2 class='guard__title'>King guard</h2>
       <p class='guard__text' >As you know, there are lots of monsters around my castle. 
       I can't even do my job. I have heard that you are a brave knight who is not afraid of monsters,
        and they hide in their hiding places when they see you. 
        Protect this castle from monsters and I will reward you.
        </p>
      
       <div class='range'>

         <div class='sliderValue'>
           <span id='slider_value'>1h</span>
         </div>

         <div class='field'>        
            <input type='range' name='guard_time_slider' class='field__progressBar-1' id='guard_input_slider' min='1' max='10' value='1'>
         </div>
         
       </div>

        <div class='guard__award'>
          <img src='./images/guard_reward_icon.png' alt='King' class='guard__awardIcon'/>
          <div class='guard__awardAmount'></div>
        </div>

        <div class='guard__acceptBtnWrapper'> 
          <button class='guard__acceptBtn'>START</button>
        </div>
      </div>
    </div>
    </div>
 </section>

 <div class='guard__wrapper disabled' id='guard_castleCity'>


   <setion class='guard-city'> 
       <div class='guard__summaryWrapper'> 
           <div class='guard__summary'> 
              <img class='guard__summaryIcon' src='./images/gold_bag_big.png' alt='gold bag'/>
              <h2 class='guard__summaryTitle'>Your payout</h2>
              <strong class='guard__summaryPayout'>1000</strong>
              <button class='guard__summaryBtn'>TAKE</button>
           </div>
       </div>

       <div class='guard__countdownWrapper'>
          <div class='guard__countdownBar'>
             
          </div>
          <div class='guard__countdownTime'></div>
       </div>


       <button class='guard__cancelBtn'>Cancel</button>
   </setion>
 </div>

 
 `
}