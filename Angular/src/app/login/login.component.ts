import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
      name:'',
      password:''
  }
    constructor(private authService: AuthService, private router: Router){

  }
  login(){
        this.authService.login(this.user).subscribe((user)=>{
            if (user.role === 'admin'){
                    this.router.navigate(['/admin/dashboard']);
              }else{
                    this.router.navigate(['/user/books']);
              }
        }, (error)=>{
            alert("Identifiant ou mot de passe incorrect")
    })
    
  }
}