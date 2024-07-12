import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class AdminService {

  constructor(private httpClient: HttpClient,
    private router: Router,
    private dialog: MatDialog) {}

  createUser(userData: any): Observable<any> {
    const url = `${environment.backendUrl}/admin/add-user`;
    return this.httpClient.post(url, userData);
  }
}
