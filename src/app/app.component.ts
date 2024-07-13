import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NAF-frontend';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    // this.authService.logout();
  }
}
