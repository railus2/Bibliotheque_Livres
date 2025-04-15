import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile.component';

const routes: Routes = [
    {
        path: '',
        component: UserProfileComponent,
    }
];

@NgModule({
    declarations: [UserProfileComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule
    ]
})
export class UserProfileModule { }