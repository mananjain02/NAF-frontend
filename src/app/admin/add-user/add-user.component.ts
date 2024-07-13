import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [AdminService]
})
export class AddUserComponent {
  userForm: FormGroup;
  userRoles = ['1','2','3'];

  constructor(private router: Router,
    private fb: FormBuilder,
    private adminService: AdminService) {
    this.userForm = this.fb.group({
      userIdentifier: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      activeIndicator: [true],
      userRoleCode: ['1', Validators.required]
    });
  }

  onSubmit() {
    if (!this.userForm.valid) {
      console.log("form invalid");
      return;
    }
    this.adminService.createUser(this.userForm.value).subscribe(
    () => {
      console.log("user created");
    });
  }

  onBack() {
    this.router.navigate(['admin']);
  }
}
