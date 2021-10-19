import { Blacksmith } from './../views/blacksmith';
import { route } from './../types';
import { Profile } from '../views/profile';
import { Missions } from '../views/missions';
import { Wizard } from '../views/wizard';
import { Inbox } from '../views/inbox';
import { Pets } from '../views/pets';
import { Account } from '../views/account';
import { Friends } from '../views/friends';
import { SearchFriend } from '../views/searchFriend';
import { Guard } from '../views/guard';

// function which is responsible for router in game. By user navigation user can easly switch game section
export const router = async () => {

    // array in which each element is including the path needed to find the specific component, and component with logic behind particualr game section
    const routes: route[] = [
        {
            path: "/profile",
            view: Profile
        },
        {
            path: "/missions",
            view: Missions
        },
        {
            path: "/blacksmith",
            view: Blacksmith
        },
        {
            path: "/wizard",
            view: Wizard
        },
        {
            path: "/inbox",
            view: Inbox
        },
        {
            path: "/pets",
            view: Pets
        },
        {
            path: "/friends",
            view: Friends
        },
        {
            path: "/search",
            view: SearchFriend
        },
        {
            path: "/guard",
            view: Guard
        },
        {
            path: "/account",
            view: Account
        },
    ];


    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    });

    // find index of specific route in routes array, then create new component
    let match = potentialMatches.find(potentialMatches => {
        return potentialMatches.isMatch
    })

    // check if potentail match exist
    if (match) {
        const routeIndex = routes.indexOf(routes.find(el => el.path === match.route.path));
        new routes[routeIndex].view;

    }
    else {
        new routes[0].view;
         
    }

    // add loading which will be removed by component class
    document.querySelector('.loading').classList.remove('disabled');
};

/** 
 * navigate to particular game section
 * @param url - url needed to change the history state -> router() function will create specific game section
 */
export const navigateTo = (url: string) => {

     // mark active section
    const links: NodeListOf<HTMLLinkElement> = document.querySelectorAll('.nav a');
    links.forEach(el =>  el.dataset.link === window.location.pathname && el.classList.add('nav__link-active'));  
    
    history.pushState(null, null, url);
    return router();
};


export const initRouter = () => {

    window.addEventListener('popstate', () => router);

   
    // add events for links in navigation in order to redirect user to particular game section by using navigate() function
    document.addEventListener("click", (e: any) => {
        if (e.target.matches("[data-link]")) {
            navigateTo(e.target.href);
        };
    });

    window.addEventListener("popstate", router);
};

