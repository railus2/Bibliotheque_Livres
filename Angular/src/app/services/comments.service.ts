import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LogService } from './log.service';
@Injectable({
    providedIn: 'root'
})
export class CommentsService {
    private apiUrl = environment.apiUrl + '/comments';

    constructor(private http: HttpClient,  private logService:LogService) {
    }
    addComment(comment:any): Observable<any>{
        return this.http.post<any>(this.apiUrl, comment).pipe(
           catchError((error)=>{
                 this.logService.log('Erreur lors de l ajout d un commentaire:' + JSON.stringify(error));
                 return throwError(()=>error)
            })
        );
    }

    deleteComment(id:number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
            catchError((error)=>{
                this.logService.log('Erreur lors de la suppression d un commentaire:' + JSON.stringify(error));
                return throwError(()=>error);
            })
        );
    }
}