import { Routes } from '@angular/router';

import { BooksComponent } from '../../pages/books/books.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { LoansComponent } from '../../pages/loans/loans.component';

export const UserLayoutRoutes: Routes = [
    { path: 'books',      component: BooksComponent },
    { path: 'profile',    component: UserProfileComponent },
    { path: 'loans',          component: LoansComponent },
];