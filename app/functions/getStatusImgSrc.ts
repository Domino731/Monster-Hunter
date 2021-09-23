export const getStatusImgSrc = (status: 'free' | 'guard' | 'mission') => {
   if(status === 'mission'){
       return './images/menu_mission.png'
   }
   else if (status === 'guard'){
       return './images/menu_guard.png'
   }
   else if (status === 'free'){
       return './images/beer.png'
   }
}