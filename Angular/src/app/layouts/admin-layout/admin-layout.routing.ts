import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UsersComponent } from '../../pages/list-users/list-users.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { BookDetailsComponent } from '../../pages/books/book-details/book-details.component';
import { EditBookComponent } from '../../pages/books/edit-book/edit-book.component';
import { BooksComponent } from '../../pages/books/books.component';
import { AddBookComponent } from '../../pages/books/add-book/add-book.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'list-users',          component: UsersComponent },
    { path: 'books',          component: BooksComponent },
     { path: 'books/add',        component: AddBookComponent },
    { path: 'books/edit/:id',  component: EditBookComponent },
    { path: 'books/:id',       component: BookDetailsComponent },
    { path: 'notifications',  component: NotificationsComponent },
];