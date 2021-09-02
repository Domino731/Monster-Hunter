import { route } from './../types';
import { Profile } from '../views/profile';
export const router = async () => {
    const routes: route[] = [
        {
            path: "/Missions",
            //@ts-ignore
            view: Profile
        },
        {
            path: "/Profile",
            //@ts-ignore
            view: Profile
        },
        {
            path: "/Blacksmith",
             //@ts-ignore
            view: Profile
        },
        {
            path: "/Wizard",
             //@ts-ignore
            view: Profile
        },
        {
            path: "/Inbox",
             //@ts-ignore
            view: Profile
        },
        {
            path: "/Pets",
             //@ts-ignore
            view: Profile
        },
        {
            path: "/Stats",
             //@ts-ignore
            view: Profile
        }
    ]

    // test each router for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    })


    let match = potentialMatches.find(potentialMatches => potentialMatches.isMatch)

    // if there is no go to default route -> /profile
    if(!match){

        match = {
        //@ts-ignore
          route: new routes[0].view(),
          isMatch: true
        }
    }
    
    
      
    
    // document.querySelector("#game__view").innerHTML =  view.render()
}

/**
 * 
 * @param url - url needed to change the history state
 */
 const navigateTo = (url: string) => {
    history.pushState(null, null, url);
    return router()
    
  }

  export class Router{
      constructor(){
        this.init()
      }

      init(){
          document.addEventListener("click", (e)=> {
            console.log(123)
          })
      }
  }

  export const initRouter = () => {
      document.addEventListener("click", (e: any) => {
          if(e.target.matches("[data-link]")){
                 e.preventDefault();
                 navigateTo(e.target.href)
          }
      })

      window.addEventListener("popstate", router)
  }