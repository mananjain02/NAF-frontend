import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  constructor(private router: Router) {}

  onAddUser() {
    this.router.navigate(['admin','add-user'])
  }

  onAddRole() {
    this.router.navigate(['admin','create-role'])
  }

  onEditUser() {
    this.router.navigate(['admin','edit-user'])
  }
}
