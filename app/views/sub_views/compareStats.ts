// compare statistic between selected and actual item in equipment
export const compareStats = (selectedItemStat: number, acutalItemStat: number | undefined) : string => {
   const difference: number = selectedItemStat - acutalItemStat;
   if(difference > 0){
       return `<strong class='better'>/ +${difference}</strong>`;
   }
   else if (difference < 0){
      return  `<strong class='worse'>/ ${difference}</strong>`;
   }
   else{
       return '';
   }
}