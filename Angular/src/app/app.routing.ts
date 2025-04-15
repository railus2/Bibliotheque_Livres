import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
 import { BookDetailsComponent } from './pages/books/book-details/book-details.component';
 import { EditBookComponent } from './pages/books/edit-book/edit-book.component';
 import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/list-users/list-users.component';
import { BooksComponent } from './pages/books/books.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { LoansComponent } from './pages/loans/loans.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AddBookComponent } from './pages/books/add-book/add-book.component';



export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
         path: 'register',
        component: RegisterComponent
    },
    {
    path: 'admin',
    component: AdminLayoutComponent,
      canActivate: [AuthGuard],
    children: [
        { path: 'dashboard', component: DashboardComponent},
        { path: 'list-users',          component: UsersComponent },
        { path: 'list-users/:id',          component: UserProfileComponent },
        { path: 'books',          component: BooksComponent },
        { path: 'books/add',        component: AddBookComponent },
        { path: 'books/:id',       component: BookDetailsComponent },
        { path: 'books/edit/:id',  component: EditBookComponent },
        { path: 'notifications',  component: NotificationsComponent },
        ]
    },
   {
        path: 'user',
        component: UserLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'books',      component: BooksComponent },
             { path: 'books/:id',       component: BookDetailsComponent },
            { path: 'profile',           component: UserProfileComponent },
            { path: 'loans',          component: LoansComponent },
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
]