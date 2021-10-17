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
import { AdminPanel } from '../views/adminPanel';

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
        {
            path: "/admin-panel",
            view: AdminPanel
        }
    ];

    // check each router for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    });

    // find index of specific route in routes array, then create new component
    let match = potentialMatches.find(potentialMatches => potentialMatches.isMatch)
    const routeIndex = routes.indexOf(routes.find(el => el.path === match.route.path));

    // check if potentail match exist
    if (match) {
        match = {
            route: new routes[routeIndex].view,
            isMatch: true
        }
    }
    else {
        match = {
            route: new routes[0].view,
            isMatch: true
        };
    }

    // add loading which will be removed by component class
    document.querySelector('.loading').classList.remove('disabled');
};

/** 
 * navigate to particular game section
 * @param url - url needed to change the history state -> router() function will create specific game section
 */
const navigateTo = (url: string) => {
    history.pushState(null, null, url);
    return router();
};



export const initRouter = () => {

    // add events for links in navigation in order to redirect user to particular game section by using navigate() function
    document.addEventListener("click", (e: any) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        };
    });

    // for development
    const developmentRender = new Blacksmith();
    window.addEventListener("popstate", router);
};
