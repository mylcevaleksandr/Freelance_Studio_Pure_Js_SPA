import {Dashboard} from "./components/dashboard";
import {Four} from "./components/four";
import {Login} from "./components/login";
import {Signup} from "./components/signup";

export class Router {
    constructor() {
        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');
        this.initEvents();
        this.routes = [
            {
                route: '/',
                title: 'Дашборд',
                filePathTemplate: '/templates/dashboard.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Dashboard();
                }
            },
            {
                route: '/404',
                title: 'Страницы нет',
                filePathTemplate: '/templates/404.html',
                useLayout: false,
                load: () => {
                    new Four();
                }
            },
            {

                route: '/login',
                title: 'Авторизация',
                filePathTemplate: '/templates/login.html',
                useLayout: false,
                load: () => {
                    new Login();
                }
            },
            {
                route: '/signup',
                title: 'Регистрация',
                filePathTemplate: '/templates/signup.html',
                useLayout: false,
                load: () => {
                    new Signup();
                }
            },
        ];
    }

    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
    }

    async activateRoute() {
        const urlRoute = window.location.pathname;
        const currentRoute = this.routes.find(item => item.route === urlRoute);
        if (currentRoute) {
            if (currentRoute.title) {
                this.titlePageElement.innerText = currentRoute.title + ' | Freelance Studio';
            }
            if (currentRoute.filePathTemplate) {
                let contentBlock = this.contentPageElement;
                if (currentRoute.useLayout) {
                    contentBlock.innerHTML = await fetch(currentRoute.useLayout).then(response => response.text());
                    contentBlock = document.getElementById('content-layout');
                    document.body.classList.add('sidebar-mini');
                    document.body.classList.add('layout-fixed');
                } else {
                    document.body.classList.remove('sidebar-mini');
                    document.body.classList.remove('layout-fixed');
                }
                contentBlock.innerHTML = await fetch(currentRoute.filePathTemplate).then(response => response.text());
            }
            if (currentRoute.load() && typeof currentRoute.load() === 'function') {
                currentRoute.load();
            }
        } else {
            console.log('no route');
            window.location = '/404';
        }
    }
}