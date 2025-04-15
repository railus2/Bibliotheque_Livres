// loans.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class LoansService {
    private apiUrl = environment.apiUrl + '/loans';

  constructor(private http: HttpClient, private logService:LogService) { }

    getLoans(): Observable<any> {
        return this.http.get<any>(this.apiUrl).pipe(
               catchError((error)=>{
                 this.logService.log('Erreur lors de la récupération des emprunts:' + JSON.stringify(error));
                   return throwError(()=>error)
              })
          )
    }
      getLoansCount(): Observable<any> {
        return this.http.get<any>(this.apiUrl + '/count').pipe(
               catchError((error)=>{
                 this.logService.log('Erreur lors de la récupération des emprunts:' + JSON.stringify(error));
                   return throwError(()=>error)
              })
          )
    }
    addLoan(loan:any):Observable<any>{
        return this.http.post<any>(this.apiUrl, loan).pipe(
              catchError((error)=>{
              this.logService.log('Erreur lors de l ajout d un emprunt:' + JSON.stringify(error));
                return throwError(()=>error)
             })
        );
    }
    deleteLoan(id: number): Observable<any>{
        return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
           catchError((error)=>{
                 this.logService.log('Erreur lors de la suppression d un emprunt:' + JSON.stringify(error));
                return throwError(()=>error)
            })
         );
      }
}