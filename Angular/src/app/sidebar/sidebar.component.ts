import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES_ADMIN: RouteInfo[] = [
    { path: '/admin/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/admin/books',         title: 'Livres',             icon:'nc-book-bookmark',    class: '' },
    { path: '/admin/list-users',          title: 'Utilisateurs',      icon:'nc-single-02',  class: '' },
    { path: '/admin/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/user/profile',          title: 'Profile',      icon:'nc-single-02',  class: '' },
];

export const ROUTES_USER: RouteInfo[] = [
    { path: '/user/books',     title: 'Livres',         icon:'nc-book-bookmark',       class: '' },
    { path: '/user/loans',         title: 'Emprunts',             icon:'nc-tile-56',    class: '' },
    { path: '/user/profile',          title: 'Profile',      icon:'nc-single-02',  class: '' },

];
@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    constructor(private authService: AuthService, private router: Router){}
    ngOnInit() {
          if (this.authService.currentUser?.role === 'admin'){
             this.menuItems = [...ROUTES_ADMIN, {path: '/logout', title: 'Déconnexion',     icon:'nc-button-power',  class: '' }];
        }else{
            this.menuItems = [...ROUTES_USER, {path: '/logout', title: 'Déconnexion',     icon:'nc-button-power',  class: '' }];
        }
    }
    logout(){
      this.authService.currentUser = null;
      this.router.navigate(['/login'])
    }
}