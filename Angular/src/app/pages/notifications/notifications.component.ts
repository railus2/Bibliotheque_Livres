import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { LoansService } from '../../services/loans.service';
import { AuthService } from '../../services/auth.service';
import { LogService } from '../../services/log.service';

@Component({
    selector: 'notifications-cmp',
    moduleId: module.id,
    templateUrl: 'notifications.component.html'
})

export class NotificationsComponent implements OnInit{
  loans: any[] = [];
  showModalNotification : boolean = false;
  notificationMessage = '';
    constructor(private toastr: ToastrService, private loansService: LoansService, private authService:AuthService, private logService: LogService) {}
     ngOnInit(): void {
          this.loansService.getLoans().subscribe((loans) => {
             this.loans = loans;
         });
    }
   calculateProgress(returnDate: Date, loan:any){
     const currentDate = new Date();
      const returnDateObject = new Date(returnDate);
      const totalTime = returnDateObject.getTime() - currentDate.getTime()
      const remainingTime = totalTime/ (24 * 3600 * 1000);
      if (remainingTime <= 0) {
        return { progress: 0, color: 'secondary' };
      }
      let color = 'warning'

      if(remainingTime >= 0 && remainingTime <= 7){
          if(remainingTime <= 3){
              color = 'danger';
                this.notificationMessage = "L'emprunt de " + loan.user.name + " pour le livre " + loan.book.title + " doit être rendu dans 3 jours"
                this.showModalNotification = true;
          }else{
               if(this.authService.currentUser){
                    const loan = this.loans.find(l => l.user.id === this.authService.currentUser.id)
                    if(loan)
                        this.toastr.info(
                            `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">L'emprunt de <b> ${loan.user.name}</b> pour le livre <b>${loan.book.title}</b> doit être rendu dans moins de 7 jours.</span>`,
                             "",
                             {
                                timeOut: 4000,
                                closeButton: true,
                                enableHtml: true,
                                toastClass: "alert alert-warning alert-with-icon",
                                positionClass: "toast-top-center"
                           }
                       );
              }
           }
          return  { progress: remainingTime/7*100, color };
      }
     return { progress: 100, color : 'secondary' };
    }
   showNotification(from: any, align, id: number) {
        if(this.authService.isAuthenticated() && this.authService.currentUser.role === "admin"){
                const color = Math.floor(Math.random() * 5 + 1);
                 if (this.loans) {
                    const loan = this.loans.find(l => l.id === id);
                      if (loan){
                            this.toastr.info(
                                  `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">L'emprunt de <b> ${loan.user.name}</b> pour le livre <b>${loan.book.title}</b> doit être rendu.</span>`,
                                    "",
                                    {
                                        timeOut: 4000,
                                        closeButton: true,
                                        enableHtml: true,
                                        toastClass: "alert alert-info alert-with-icon",
                                        positionClass: "toast-" + from + "-" + align
                                    }
                                );
                      }
                }
        }
  }
     checkNotifications(){

    }
}