import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AdminService } from '../admin.service';
import { Subscription } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(100%)' }),
          stagger(100, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ], { optional: true })
      ]),
    ]),
  ],
})
export class RoleListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['userRoleCode', 'userTaskSeq', 'userRoleDescription', 'userTask', 'actions'];
  dataSource = new MatTableDataSource<any>();
  isLoading = true;
  private subscriptions: Subscription[] = [];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchRoleList();
    this.subscriptions.push(
      this.adminService.roleUpdatedSubject.subscribe(() => {
        console.log("fetching new");
        this.fetchRoleList();
      })
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  fetchRoleList(): void {
    this.adminService.getRoles().subscribe(
      (data: any[]) => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching role list', error);
        this.isLoading = false;
      }
    );
  }

  onEdit(role: any): void {
    this.adminService.editRole(role);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
