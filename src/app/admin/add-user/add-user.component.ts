import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [AdminService]
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  roleList: any = null;
  isLoading: boolean = true;

  constructor(private router: Router,
              private fb: FormBuilder,
              private adminService: AdminService,
              private dialog: MatDialog) {
    this.userForm = this.fb.group({
      userIdentifier: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      activeIndicator: [true],
      userRoleCode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchRoleList();
  }

  fetchRoleList(): void {
    this.adminService.getRoles().subscribe(
      (data: any[]) => {
        this.roleList = data;
        if (this.roleList && this.roleList.length > 0) {
          this.userForm.patchValue({ userRoleCode: this.roleList[0].userRoleCode });
        }
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching role list', error);
        this.isLoading = false;
      }
    );
  }

  onSubmit() {
    if (!this.userForm.valid) {
      console.log("form invalid");
      return;
    }
    this.adminService.createUser(this.userForm.value).subscribe(
      () => {
        console.log("user created");
        this.dialog.open(DialogComponent, {data: {message: "User created successfully!"}});
        this.resetForm();
      },
      (error) => {
        console.log("error while creating user");
      }
    );
  }

  resetForm() {
    this.userForm.reset({
      userIdentifier: '',
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      activeIndicator: true,
      userRoleCode: this.roleList && this.roleList.length > 0 ? this.roleList[0].userRoleCode : ''
    });
    this.userForm.markAsUntouched();
    this.userForm.markAsPristine();
  }

  onBack() {
    this.router.navigate(['admin']);
  }
}
