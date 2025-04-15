import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { LogService } from './log.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = environment.apiUrl + '/notifications';

  constructor(private http: HttpClient, private logService:LogService) { }

  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
        catchError((error)=>{
            this.logService.log('Erreur lors de la récupération des notifications:' + JSON.stringify(error));
             return throwError(()=>error)
        })
      );
  }
   markAsRead(id:number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/read`, {}).pipe(
       catchError((error)=>{
             this.logService.log('Erreur lors du marquage de la notification comme lu:' + JSON.stringify(error));
               return throwError(()=>error);
         })
        );
  }
   sendNotification(notification:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, notification).pipe(
        catchError((error)=>{
            this.logService.log('Erreur lors de l envoi de notification:' + JSON.stringify(error));
             return throwError(()=>error);
        })
    );
  }
  addNotification(notification: any): Observable<any>{
         return this.http.post<any>(this.apiUrl, notification).pipe(
            catchError((error)=>{
                  this.logService.log('Erreur lors de l ajout d une notification:' + JSON.stringify(error));
                 return throwError(()=>error);
            })
         );
     }

    deleteNotification(id:number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
            catchError((error)=>{
                 this.logService.log('Erreur lors de la suppression de la notification:' + JSON.stringify(error));
                return throwError(()=>error);
            })
        );
    }
}