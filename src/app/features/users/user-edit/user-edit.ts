import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { first } from 'rxjs';
import { UserSummary } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RoleService } from '../../../core/services/role.service';

interface RoleOption {
  id: string;
  name: string;
}

@Component({
  selector: 'app-user-edit',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.scss',
})
export class UserEdit {

  userForm : FormGroup;
  roles : RoleOption[] = [];
  isLoading : boolean = false;
  userId!: string;
  user: UserSummary | null = null;

  constructor (
    private fb: FormBuilder,
    private router : Router,
    private route: ActivatedRoute,
    private userService : UserService,
    private roleService : RoleService
  ) {
    this.userForm = fb.group({
      firstName : ["", Validators.required],
      lastName :  ["", Validators.required],
      roleId : ["", Validators.required],
      email : ["", Validators.required]
    })    
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.getUserById(this.userId);
    this.getRole()
  }

  getUserById(userId : string) {
    this.userService.getUserById(userId).subscribe({
      next : (response) => {
        console.log(response)
        this.user = response.data;
        this.userForm.patchValue({
          firstName: this.user.displayName,
          lastName: this.user.displayName,
          email: this.user.email,
          roleId: this.user.role.id
        });
      },
      error : (err) => {
        console.log(err)
      }
    })
  }

  getRole() {
    this.roleService.getRoles().subscribe({
      next: (response) => {
        this.roles = response.data;
      },

      error : (err) => {
        console.log(err)
      }
    })
  }

checkEmailExists(): void {
  const email = this.userForm.get('email')?.value;
  if (!email) return;

  this.userService.existsByEmail(email, this.userId).subscribe({
    next: (response) => {
      if (response.data === true) {
        this.userForm.get('email')?.setErrors({ emailTaken: true });
      }
    }
  });
}

  onSubmit() {
    if(this.userForm.invalid) return

    const updated = {
      email: this.userForm.get('email')?.value,
      roleId: this.userForm.get('roleId')?.value,
      displayName: this.user?.displayName,
    };
    this.userService.editUser(updated, this.user?.id ?? this.userId).subscribe({
      next : (response) => {
        console.log(response)
        this.router.navigate(['/users']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
