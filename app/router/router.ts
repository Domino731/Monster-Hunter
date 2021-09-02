import { route } from './../types';
import { Profile } from '../views/profile';
export const router = async () => {
    const routes: route[] = [
        {
            path: "/Missions",
            view:  new Profile()
        },
        {
            path: "/Profile",
            view: new Profile()
        },
        {
            path: "/Blacksmith",
            view: new Profile()
        },
        {
            path: "/Wizard",

            view: new Profile()
        },
        {
            path: "/Inbox",
            view: new Profile()
        },
        {
            path: "/Pets",
            view: new Profile()
        },
        {
            path: "/Stats",
            view: new Profile()
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
    if (!match) {

        match = {
            route: routes[0].view,
            isMatch: true
        };
    };
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

    window.addEventListener("popstate", router);
};