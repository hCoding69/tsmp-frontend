import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RepProfileService } from '../../../core/services/rep-profile.service';
import { UserService } from '../../../core/services/user.service';
import { RoleService } from '../../../core/services/role.service';
import { UserSummary } from '../../../core/models/user.model';
import { RoleOption } from '../../../core/models/role.model';

@Component({
  selector: 'app-rep-profile-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './rep-profile-add.html',
  styleUrl: './rep-profile-add.scss'
})
export class RepProfileAdd implements OnInit {
  profileForm: FormGroup;
  repUsers: UserSummary[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private repProfileService: RepProfileService,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      userId: ['', Validators.required],
      address: ['', Validators.required],
      birthday: ['', Validators.required],
      agentCode: ['', Validators.required],
      professionalEmail: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      comment: ['']
    });
  }

  ngOnInit(): void {
    this.loadRepUsers();
  }

  loadRepUsers(): void {
    this.roleService.getRoles().subscribe({
      next: (response) => {
        const repRole = response.data.find((r: RoleOption) => r.name === 'REP');
        if (repRole) {
          this.userService.getUsersByRole(repRole.id).subscribe({
            next: (userResponse) => {
              this.repUsers = userResponse.data.data;
            },
            error: (err) => console.log(err)
          });
        }
      },
      error: (err) => console.log(err)
    });
  }

  checkIfAgentCodeExists(agentCode: string, userId:string | null) {
    return this.repProfileService.checkIfAgenCodeExists(agentCode, userId).subscribe({
      next: (response) => {
        console.log(response);
        if(response.data == true) {
          this.profileForm.get('agentCode')?.setErrors({ codeTaken: true });
        }
      },

      error: (err) => {
        console.log(err)
      }
    })
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.repProfileService.create(this.profileForm.value).subscribe({
      next: () => {
        this.router.navigate(['/rep-profiles']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Une erreur est survenue';
        this.isLoading = false;
      }
    });
  }


}