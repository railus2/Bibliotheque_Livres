import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
      name:'',
      email:'',
      password:''
  }
    constructor(private http: HttpClient, private authService: AuthService, private router: Router){

  }
  register(){
      this.authService.register(this.user).subscribe((user)=>{
        if (user.role === 'admin'){
                  this.router.navigate(['/admin/dashboard']);
            }else{
                  this.router.navigate(['/user/books']);
            }
    }, (error)=>{
            alert("Erreur lors de l'enregistrement, veuillez réessayer")
    })
  }
}