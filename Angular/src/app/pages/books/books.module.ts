import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BooksComponent } from './books.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { AddBookComponent } from './add-book/add-book.component';
 const routes: Routes = [
     {
      path: '',
        component: BooksComponent,
    }
];

@NgModule({
    declarations: [
    BooksComponent,
        BookDetailsComponent,
        EditBookComponent,
        AddBookComponent
    ],
    imports: [
        CommonModule,
         RouterModule.forChild(routes),
         FormsModule
    ]
})
export class BooksModule { }