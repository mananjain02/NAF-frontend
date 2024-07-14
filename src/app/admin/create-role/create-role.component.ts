import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css'],
  animations: [
    trigger('formAnimation', [
      state('hidden', style({
        height: '0',
        opacity: 0,
        display: 'none'
      })),
      state('visible', style({
        height: '*',
        opacity: 1,
        display: 'flex'
      })),
      transition('hidden <=> visible', [
        animate('0.25s ease-in-out')
      ]),
    ]),
  ],
})
export class CreateRoleComponent implements OnInit {
  roleForm: FormGroup;
  isEditMode = false;
  title = 'Create Role';
  formState: 'hidden' | 'visible' = 'hidden';
  toggleButtonText = 'Create Role';

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

  ngOnInit(): void {
    this.adminService.editRoleSubject.subscribe(role => {
      if (role) {
        this.isEditMode = true;
        this.title = 'Edit Role';
        this.roleForm.patchValue(role);
        this.showForm();
      }
    });
  }

  onSubmit() {
    if (!this.roleForm.valid) {
      this.markFormGroupTouched(this.roleForm);
      console.log('form invalid');
      return;
    }
    if (this.isEditMode) {
      this.adminService.updateRole(this.roleForm.value).subscribe(
        (response) => {
          console.log('role updated', response);
          this.adminService.notifyRoleUpdated();
          this.resetForm();
        },
        (error) => {
          console.error('Error updating role', error);
        }
      );
    } else {
      this.adminService.createRole(this.roleForm.value).subscribe(
        (response) => {
          console.log('role created', response);
          this.adminService.notifyRoleUpdated();
          this.resetForm();
        },
        (error) => {
          console.error('Error creating role', error);
        }
      );
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  resetForm() {
    this.roleForm.reset();
    this.roleForm.markAsUntouched();
    this.roleForm.markAsPristine();
    this.isEditMode = false;
    this.title = 'Create Role';
    this.hideForm();
  }

  clearForm() {
    this.roleForm.reset();
    this.roleForm.markAsUntouched();
    this.roleForm.markAsPristine();
    this.title = "Create Role";
    this.isEditMode = false;
  }

  onBack() {
    this.router.navigate(['admin']);
  }

  toggleForm() {
    if (this.formState === 'hidden') {
      this.showForm();
    } else {
      this.hideForm();
    }
  }

  showForm() {
    this.formState = 'visible';
    this.toggleButtonText = 'Close';
  }

  hideForm() {
    this.clearForm();
    this.formState = 'hidden';
    this.toggleButtonText = 'Create Role';
  }
}
