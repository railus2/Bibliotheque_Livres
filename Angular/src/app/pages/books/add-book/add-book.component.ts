import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../../../services/books.service';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
    @ViewChild('titleInput') titleInput!: ElementRef;
     @ViewChild('authorInput') authorInput!: ElementRef;
      @ViewChild('isbnInput') isbnInput!: ElementRef;
       @ViewChild('categoryInput') categoryInput!: ElementRef;
        @ViewChild('publicationDateInput') publicationDateInput!: ElementRef;
         @ViewChild('ratingInput') ratingInput!: ElementRef;
          @ViewChild('summaryInput') summaryInput!: ElementRef;
     public book: any = {
         title:'',
         author:'',
         isbn:'',
         category:'',
         publication_date: new Date().toISOString().slice(0, 10),
         cover_image: "book_placeholder.jpg",
          rating:0,
         summary:''
     }
      constructor(private router: Router, private bookService: BooksService) {
      }

  openFileExplorer() {
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

  save(){
          this.bookService.addBook({
              title: this.titleInput.nativeElement.value,
               author: this.authorInput.nativeElement.value,
               isbn: this.isbnInput.nativeElement.value,
                category: this.categoryInput.nativeElement.value,
                 publication_date:  this.publicationDateInput.nativeElement.value,
                  rating:  this.ratingInput.nativeElement.value,
                   summary: this.summaryInput.nativeElement.value
            }).subscribe(()=>{
            this.router.navigate(['/admin/books'])
        });
    }
}