import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class AdminService {

  editRoleSubject = new Subject<any>();
  roleUpdatedSubject = new Subject<void>();

  constructor(private httpClient: HttpClient,
              private router: Router,
              private dialog: MatDialog) {}

  createUser(userData: any): Observable<any> {
    const url = `${environment.backendUrl}/admin/add-user`;
    return this.httpClient.post(url, userData);
  }

  createRole(roleData: any): Observable<any> {
    const url = `${environment.backendUrl}/admin/add-role-code`;
    return this.httpClient.post(url, roleData);
  }

  updateRole(roleData: any): Observable<any> {
    const url = `${environment.backendUrl}/admin/update-role-code`;
    return this.httpClient.put(url, roleData);
  }

  getRoles(): Observable<any> {
    const url = `${environment.backendUrl}/admin/role-codes`;
    return this.httpClient.get(url);
  }

  editRole(role: any) {
    this.editRoleSubject.next(role);
  }

  notifyRoleUpdated() {
    this.roleUpdatedSubject.next();
  }
}
