import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
    private apiUrl = environment.apiUrl + '/books';

  constructor(private http: HttpClient,  private logService:LogService) { }

    getBooks(): Observable<any> {
        return this.http.get<any>(this.apiUrl).pipe(
            catchError((error)=>{
                 this.logService.log('Erreur lors de la récupération des livres:' + JSON.stringify(error));
                 return throwError(()=>error);
            })
        )
    }
    getBooksCount():Observable<any>{
          return this.http.get<any>(this.apiUrl + '/count').pipe(
                catchError((error)=>{
                  this.logService.log('Erreur lors de la récupération du nombre de livres:' + JSON.stringify(error));
                  return throwError(()=>error);
              })
          );
    }


    getBook(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
            catchError((error)=>{
                this.logService.log('Erreur lors de la récupération d un livre:' + JSON.stringify(error));
                 return throwError(()=>error);
           })
        )
    }

    updateBook(id: number, book:any): Observable<any>{
         return this.http.put<any>(`${this.apiUrl}/${id}`, book).pipe(
              catchError((error)=>{
               this.logService.log('Erreur lors de la mise à jour d un livre:' + JSON.stringify(error));
                 return throwError(()=>error);
             })
         );
    }

    deleteBook(id: number): Observable<any>{
         return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
            catchError((error)=>{
                this.logService.log('Erreur lors de la suppression d un livre:' + JSON.stringify(error));
                return throwError(()=>error);
              })
         );
    }

    deleteComment(commentId:number):Observable<any>{
         return this.http.delete<any>(`${environment.apiUrl}/comments/${commentId}`).pipe(
             catchError((error)=>{
                 this.logService.log('Erreur lors de la suppression d un commentaire:' + JSON.stringify(error));
                 return throwError(()=>error);
            })
         );
    }
      addBook(book:any): Observable<any>{
          return this.http.post<any>(this.apiUrl, book).pipe(
              catchError((error)=>{
                  this.logService.log('Erreur lors de la création d un livre:' + JSON.stringify(error));
                 return throwError(()=>error);
             })
         );
    }
}