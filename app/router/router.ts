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
import { MonsterFight } from '../views/monsterFight';
import { Tavern } from '../views/tavern';
import { AdminPanel } from '../views/adminPanel';
let x;
export const router = async () => {
    const routes: route[] = [
        {
            path: "/missions",
            view: Missions
        },
        {
            path: "/profile",
            view: Profile
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
    ]

    // test each router for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    })


    let match = potentialMatches.find(potentialMatches => potentialMatches.isMatch)

    // find index of specific route in routes array, then create new object and insert html code.
    const routeIndex = routes.indexOf(routes.find(el => el.path === match.route.path))
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
};

/**
 * 
 * @param url - url needed to change the history state
 */
const navigateTo = (url: string) => {
    history.pushState(null, null, url);
    return router();
};


export const initRouter = () => {
    document.addEventListener("click", (e: any) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        };
    });

    // for development
    const developmentRender = new Account()
    window.addEventListener("popstate", router);
};

// <a href='https://www.freepik.com/vectors/building'>Building vector created by macrovector - www.freepik.com</a>