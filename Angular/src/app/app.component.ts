
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LogService } from './services/log.service';
import { NotificationsComponent } from './pages/notifications/notifications.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
     @ViewChild(NotificationsComponent) notificationComponent!: NotificationsComponent;

    constructor(private authService: AuthService, private router:Router,private logService: LogService) {}
    ngAfterViewInit(): void {
    }
  ngOnInit(){
       this.router.events
          .pipe(filter(event => event instanceof NavigationEnd))
          .subscribe((event : RouterEvent) => {
            if(event instanceof NavigationEnd){
             this.logService.log('--------------------------');
             this.logService.log('NsavigationEnd event.url:' + event.url);
            this.logService.log('authService.isAuthenticated():' + this.authService.isAuthenticated());
              this.logService.log('authService.currentUser:' + JSON.stringify(this.authService.getCurrentUser()));
                  if(!this.authService.isAuthenticated()){
                       if (event.url === "/#/register"){
                            this.router.navigate(['/#/register']);
                        }else{
                            this.router.navigate(['/#/login']);
                        }
                }else {
                   if (this.authService.getCurrentUser()?.role === 'admin'){
                        this.router.navigate(['/admin/.']);
                    }else{
                         this.router.navigate(['/user/.']);
                   }
                   if(this.notificationComponent && (event.url === '/admin/dashboard' || event.url ==='/user/books')){
                      if (this.authService.currentUser?.role === 'user'){
                            this.notificationComponent.loans.filter(loan => loan.user.id === this.authService.currentUser.id).forEach(loan => this.notificationComponent.calculateProgress(loan.return_date, loan))
                      }
                    }

                 }
            this.logService.log('--------------------------');
            }
          });
   }
}