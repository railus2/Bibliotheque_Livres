import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../../services/books.service';
import { AuthService } from '../../../services/auth.service';
import { LoansService } from '../../../services/loans.service';
import { LogService } from '../../../services/log.service';
import { NotificationService } from '../../../services/notification.service';
import { CommentsService } from '../../../services/comments.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  book: any;
  isLoaned = false;
  loan:any;
  newComment : string = '';
    constructor(private route: ActivatedRoute, private bookService: BooksService, public authService: AuthService,  private loansService: LoansService, private logService:LogService,  private router: Router, private notificationService: NotificationService, private commentsService: CommentsService) {}

  ngOnInit(): void {
      this.route.params.subscribe(params => {
          const bookId = +params['id'];
          this.bookService.getBook(bookId).subscribe((book) => {
            this.book = book;
            this.checkIfLoaned();
          })
      })
  }
  checkIfLoaned(){
        this.loansService.getLoans().subscribe((loans)=>{
            this.loan = loans.find(loan => loan.user.id === this.authService.currentUser.id && loan.book.id === this.book.id);
            this.isLoaned = !!this.loan
          this.logService.log("isLoaned : " + this.isLoaned);
      },
       (error)=>{
           this.logService.log('Erreur lors de la récupération des emprunts:' + JSON.stringify(error));
         }
        )
  }
  editBook() {
     this.router.navigate(['/admin/books/edit/' + this.book.id]);
  }

  borrowBook() {
       this.logService.log('Click on borrowButton');
    if (this.book) {
      const newLoan = {
        user_id : this.authService.currentUser.id,
        book_id : this.book.id,
        loan_date: this.formatDate(new Date()),
        return_date: this.formatDate(new Date(new Date().setDate(new Date().getDate() + 15)))
      }
        this.logService.log("Data to send: " + JSON.stringify(newLoan));
      this.loansService.addLoan(newLoan).subscribe(() =>{
          this.logService.log('Emprunt réussis');
            this.isLoaned = true;
           this.notificationService.addNotification({
                user_id: this.authService.currentUser.id,
                message:  `L'emprunt du livre ${this.book.title} vient d'être effectué`
             }).subscribe();
             this.checkIfLoaned();
      }, (error) =>{
          this.logService.log("Erreur lors de l'emprunt : "+ JSON.stringify(error))
            this.isLoaned = false;
      });
    }
  }
     formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
  }
     formatRelativeTime(dateString: string): string {
      const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
        const diffInMinutes = Math.round(diffInSeconds / 60);
        const diffInHours = Math.round(diffInMinutes / 60);
        const diffInDays = Math.round(diffInHours / 24);
        const diffInMonths = Math.round(diffInDays / 30);
        const diffInYears = Math.round(diffInMonths / 12);

        if (diffInYears > 0) {
            return `il y a ${diffInYears} an${diffInYears > 1 ? 's' : ''}`;
        }
      if (diffInMonths > 0) {
            return `il y a ${diffInMonths} mois`;
      }
       if (diffInDays > 0) {
            return `il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
        }
         if (diffInHours > 0) {
            return `il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
        }
         if (diffInMinutes > 0) {
            return `il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
        }
        return 'il y a quelques secondes'
  }
  addComment(){
      if(this.newComment){
          this.commentsService.addComment({
                user_id: this.authService.currentUser.id,
                book_id: this.book.id,
                content: this.newComment
            }).subscribe((response)=>{
               this.logService.log('Commentaire créé : ' + JSON.stringify(response));
                this.route.params.subscribe(params => {
                     const bookId = +params['id'];
                     this.bookService.getBook(bookId).subscribe((book) => {
                        this.book = book
                    })
                })
            this.newComment = "";
            }, (error)=>{
                this.logService.log('Erreur lors de l ajout d un commentaire : ' + JSON.stringify(error));
            })
      }
  }
  deleteComment(commentId:number){
       this.commentsService.deleteComment(commentId).subscribe(()=>{
            this.route.params.subscribe(params => {
                const bookId = +params['id'];
                this.bookService.getBook(bookId).subscribe((book) => {
                    this.book = book
                 })
             })
         }, (error) =>{
              this.logService.log('Erreur lors de la suppression du commentaire : ' + JSON.stringify(error))
         })
  }
}