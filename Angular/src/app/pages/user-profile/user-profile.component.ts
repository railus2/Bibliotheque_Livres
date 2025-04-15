import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoansService } from '../../services/loans.service';
import { UsersService } from '../../services/users.service';
import { LogService } from '../../services/log.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
  })
  export class UserProfileComponent  implements OnInit{
     public loans: any[] = [];
      user :any = {
           name:'',
           email:'',
          address:'',
          contact:'',
          password:''
      };
      edit: boolean = false;
      public activeLoans: any[] = [];
  
          constructor(public authService: AuthService, private loansService: LoansService, private usersService: UsersService, private logService:LogService){}
  
      ngOnInit(){
          this.loansService.getLoans().subscribe((loans)=>{
             this.loans = loans.filter(loan => loan.user.id === this.authService.currentUser.id);
             this.activeLoans = this.loans.filter(loan =>  new Date(loan.return_date) > new Date() );
            this.logService.log('nombre de pret en cours : ' +  this.activeLoans.length)
        });
          if (this.authService.currentUser) {
             this.user = {...this.authService.currentUser};
          }
      }
  
      update(){
           const userData = {...this.user};
            if(!this.user.password) {
               delete userData.password;
           }
           this.usersService.updateUser(this.user.id, userData).subscribe((user)=>{
                this.authService.currentUser = user;
               alert('profile updated')
              this.edit = false;
          })
      }
  }