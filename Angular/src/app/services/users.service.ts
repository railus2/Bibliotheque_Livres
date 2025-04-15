import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LogService } from './log.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient, private logService:LogService) { }

  getUsers():Observable<any>{
      return this.http.get<any>(this.apiUrl).pipe(
        tap((users)=>{
             this.logService.log('Users Service : Data received :' + JSON.stringify(users));
        }),
        catchError((error)=>{
            this.logService.log('Erreur lors de la récupération des users:' + JSON.stringify(error));
           return throwError(()=>error);
        })
      )
  }
    updateUser(id:number, user:any):Observable<any>{
         return this.http.put<any>(`${this.apiUrl}/${id}`, user).pipe(
          catchError((error)=>{
               this.logService.log('Erreur lors de la mise à jour de l utilisateur:' + JSON.stringify(error));
                return throwError(()=>error);
           })
         );
    }
    deleteUser(id:number):Observable<any>{
        return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
         catchError((error)=>{
              this.logService.log('Erreur lors de la suppression de l utilisateur:' + JSON.stringify(error));
                 return throwError(()=>error)
            })
         );
    }
}
