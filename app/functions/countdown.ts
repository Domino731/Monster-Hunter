export const setCountdown = (element: HTMLElement) => {
    const today: any = new Date();

      const tomorrow: any = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      // milliseconds between now & tommorow
      const diffMs = (tomorrow - today);
      console.log(diffMs)
      const minutes = Math.floor((diffMs / 1000) / 60);

      // set the countdown date
      const target_date = new Date().getTime() + ((minutes * 60) * 1000);

      setInterval(() => {
             
            let hours, minutes, seconds; // variables for time units

            // find the amount of "seconds" between now and target
            const current_date = new Date().getTime();
            let seconds_left: any = (target_date - current_date) / 1000;


            if (seconds_left >= 0) {
            seconds_left = seconds_left % 86400;

            hours = parseInt((seconds_left / 3600).toString());
            seconds_left = seconds_left % 3600;

            minutes = parseInt((seconds_left / 60).toString());
            seconds = parseInt((seconds_left % 60).toString());

            element.innerHTML = `${hours}h : ${minutes}m : ${seconds}s`;
           }

         // when coundown ends reload site -> dateOperations method will 'refresh user's data' -> new shop, wizard wheel spin
        else{
               window.location.reload();
        }
      }, 1000)
}