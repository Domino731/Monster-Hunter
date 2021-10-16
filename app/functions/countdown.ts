
/**
 * function that counts timeto the end of the day
 * @param element - wrapper where you want to inster this countdown
 */
export const setCountdown = (element: HTMLElement) => {

  // init dates
  const today: any = new Date();
  const tomorrow: any = new Date();

  // send end of the day
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  // milliseconds between now & tommorow
  const diffMs: number = (tomorrow - today);
  const minutes: number = Math.floor((diffMs / 1000) / 60);

  // set the countdown date
  const target_date: number = new Date().getTime() + ((minutes * 60) * 1000);

  // set interval which is that counts the time
  return setInterval(() => {

    // variables for time units
    let hours, minutes, seconds;

    // find the amount of "seconds" between now and target
    const current_date = new Date().getTime();
    let seconds_left: any = (target_date - current_date) / 1000;


    if (seconds_left >= 0) {

      // calculate time
      seconds_left = seconds_left % 86400;
      hours = parseInt((seconds_left / 3600).toString());
      seconds_left = seconds_left % 3600;
      minutes = parseInt((seconds_left / 60).toString());
      seconds = parseInt((seconds_left % 60).toString());

      // set this time in wrapper
      element.innerHTML = `${hours}h : ${minutes}m : ${seconds}s`;
    }

    // when coundown ends reload site - dateOperations() method in Compotent class will 'refresh user's data' -> new shop, wizard wheel spin
    else {
      location.reload();
    }
  }, 1000);
}