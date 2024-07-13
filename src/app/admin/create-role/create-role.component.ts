import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent {
  roleForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private adminService: AdminService) {
    this.roleForm = this.fb.group({
      userRoleCode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      userTaskSeq: ['', Validators.required],
      userRoleDescription: ['', Validators.required],
      userTask: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.roleForm.valid) {
      console.log('form invalid');
      return;
    }
    this.adminService.createRole(this.roleForm.value).subscribe(
      () => {
        console.log('role created');
      },
      (error) => {
        console.error('Error creating role', error);
      }
    );
  }

  popForm() {
    console.log("pop");
    this.roleForm = this.fb.group({
      userRoleCode: ['123', [Validators.required, Validators.pattern('^[0-9]*$')]],
      userTaskSeq: ['voo hoo', Validators.required],
      userRoleDescription: ['desc', Validators.required],
      userTask: ['yo you oy', Validators.required]
    });
  }

  onBack() {
    this.router.navigate(['admin']);
  }
}
