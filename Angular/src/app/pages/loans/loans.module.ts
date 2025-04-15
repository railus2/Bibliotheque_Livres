import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoansComponent } from './loans.component';

const routes: Routes = [
    {
        path: '',
        component: LoansComponent,
    }
];

@NgModule({
  declarations: [LoansComponent],
  imports: [
    CommonModule,
     RouterModule.forChild(routes),
      FormsModule
  ]
})
export class LoansModule { }