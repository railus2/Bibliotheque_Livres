import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../../services/books.service'; // Remplacez par votre service

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent implements OnInit {
  book: any;

  constructor(private route: ActivatedRoute, private bookService: BooksService, private router: Router) {}

  ngOnInit(): void {
      this.route.params.subscribe(params => {
          const bookId = +params['id'];
          this.bookService.getBook(bookId).subscribe((book) => {
            this.book = book
          })
      })
  }

    save(){
        this.bookService.updateBook(this.book.id, this.book).subscribe(()=>{
            this.router.navigate(['/admin/books'])
        });
    }

    deleteComment(commentId:number){
        this.bookService.deleteComment(commentId).subscribe(()=>{
             this.route.params.subscribe(params => {
                  const bookId = +params['id'];
                  this.bookService.getBook(bookId).subscribe((book) => {
                    this.book = book
                  })
              })
        })

    }

     openFileExplorer() {
        // A adapter selon ce que vous voulez faire
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = () => {
         if (input.files && input.files.length > 0){
              // ici vous pouvez gérer l'image et faire l'appel a l'api afin de l'enregistrer
             console.log("fichiers selectionné" + input.files[0]);
           }
         };
         input.click();
     }
}