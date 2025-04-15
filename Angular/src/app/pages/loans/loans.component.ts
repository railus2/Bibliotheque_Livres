import { Component, OnInit } from '@angular/core';
import { LoansService } from '../../services/loans.service';
import { AuthService } from '../../services/auth.service';
import { LogService } from '../../services/log.service';


@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent  implements OnInit{
    public loans: any[] = [];
    constructor(private loansService: LoansService, private authService: AuthService, private logService:LogService){}

    ngOnInit(){
      this.loansService.getLoans().subscribe((loans)=>{
            this.loans = loans.filter(loan => loan.user.id === this.authService.currentUser.id);
      })
    }
     deleteLoan(id: number){
        this.logService.log('delete loan id:'+ id);
        this.loansService.deleteLoan(id).subscribe(()=>{
            this.loansService.getLoans().subscribe((loans)=>{
              this.loans = loans.filter(loan => loan.user.id === this.authService.currentUser.id);
           })
        },
         (error)=>{
          this.logService.log('Erreur lors de la suppression d un emprunt:' + JSON.stringify(error));
        })
    }
}