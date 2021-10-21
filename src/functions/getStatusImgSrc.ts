/**
 * Get graphic which is representing user's status 
 * @param status - the status on the basis of which the appropriate graphics will be returned
 */
export const getStatusImgSrc = (status: 'free' | 'guard' | 'mission') : string => {
   if(status === 'mission'){
       return './images/menu_mission.png';
   }
   else if (status === 'guard'){
       return './images/menu_guard.png';
   }
   else if (status === 'free'){
       return './images/beer.png';
   }
}