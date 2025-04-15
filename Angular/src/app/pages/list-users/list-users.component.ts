// user.component.ts
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'; // Remplacez par votre service
import { Router } from '@angular/router';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'user-cmp',
  moduleId: module.id,
  templateUrl: './list-users.component.html',
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private usersService: UsersService, private router: Router, private logService: LogService) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.logService.log('Structure des utilisateurs reçus :' + JSON.stringify(users));
        this.users = users;
      },
      error: (err) => {
        this.logService.log('Erreur lors de la récupération des utilisateurs :' + JSON.stringify(err));
      },
    });
  }

  editUser(id: number) {
    this.router.navigate(['/admin/users/' + id]);
  }

    deleteUser(id: number) {
      if (confirm('Etes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            this.logService.log('Suppression de l utilisateur:' + id);
          this.usersService.deleteUser(id).subscribe(()=>{
             this.usersService.getUsers().subscribe((users) => {
                 this.users = users;
             })
          })
      }
  }
}