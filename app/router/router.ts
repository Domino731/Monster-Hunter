import { route } from './../types';

export const router = async () => {
    const routes: route[] = [
        {
            path: "/profile",
            view: () => console.log("my profile")
        },
        {
            path: "/wizard",
            view: () => console.log("wizard")
        },
        {
            path: "/blacksmith",
            view: () => console.log("blacksmith")
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
          route: routes[0],
          isMatch: true
        }
    }

    console.log(match.route.view())
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