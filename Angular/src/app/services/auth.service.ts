// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // A remplacer par votre logique d'authentification
  currentUser: any = null // Stocker les infos de l'utilisateur courant
 private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

     login(user:any): Observable<any> {
            return this.http.post<any>(this.apiUrl + '/login', {name: user.name, password:user.password})
                .pipe(tap(currentUser => this.currentUser = currentUser),
                  catchError((error)=>{
                     this.currentUser = null;
                       return throwError(()=>error)
                  })
                );
        }
      register(user:any): Observable<any> {
            return this.http.post<any>(this.apiUrl + '/register', user)
                .pipe(tap(currentUser => this.currentUser = currentUser),
                   catchError((error)=>{
                       this.currentUser = null;
                       return throwError(()=>error)
                       })
                );
        }

      isAuthenticated(): boolean {
        // Vérifier si l'utilisateur est connecté
        return !!this.currentUser
      }
      getCurrentUser(): any{
         return this.currentUser;
      }
}