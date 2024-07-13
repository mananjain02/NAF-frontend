import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  roleList: any = null;

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminService.getRoles().subscribe(
      (resp) => {
        this.roleList = resp;
        console.log(this.roleList);
      },
      () => {
        console.log("error while fetching roles");
      }
    )
  }
}
