import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
    selector: 'books-cmp',
    moduleId: module.id,
    templateUrl: 'books.component.html',
    styleUrls: ['./books.component.scss']
})


export class BooksComponent implements OnInit{
public books: any[] = [];
constructor (private booksService: BooksService, private router: Router, public authService: AuthService){}
  ngOnInit(){
    this.booksService.getBooks().subscribe((books)=>{
      this.books = books;
    })
  }

  showBook(id: number){
      this.router.navigate(['/admin/books/' + id]);
  }

  editBook(id: number){
      this.router.navigate(['/admin/books/edit/' + id]);
  }
   deleteBook(id: number){
      this.booksService.deleteBook(id).subscribe(()=>{
          this.booksService.getBooks().subscribe((books)=>{
              this.books = books;
            })
      })
  }
  addBook(){
      this.router.navigate(['/admin/books/add']);
  }
}