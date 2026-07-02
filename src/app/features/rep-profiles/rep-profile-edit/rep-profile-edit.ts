import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RepProfileService } from '../../../core/services/rep-profile.service';

import { RepProfileResponse } from '../../../core/models/rep-profile.model';
import { RepStatusHistoryService } from '../../../core/services/rep-status-history.service';
import { RepTitleHistoryService } from '../../../core/services/rep-title-history.service';

@Component({
  selector: 'app-rep-profile-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSelectModule,
    MatTableModule,
    FormsModule
  ],
  templateUrl: './rep-profile-edit.html',
  styleUrl: './rep-profile-edit.scss'
})
export class RepProfileEdit implements OnInit {
  // ─── Form infos ──────────────────────────
  profileForm: FormGroup;
  profile: RepProfileResponse | null = null;
  profileId!: string;
  isLoading = false;
  isSaving = false;
  errorMessage = '';

  // ─── Statut & Titre ──────────────────────
  statusOptions: any[] = [];
  titleOptions: any[] = [];
  selectedStatusId = '';
  selectedTitleId = '';
  isUpdatingStatus = false;
  isUpdatingTitle = false;
  statusChangeForm: FormGroup;
  titleChangeForm: FormGroup;

  // ─── Historique ──────────────────────────
  statusHistory: any[] = [];
  titleHistory: any[] = [];
  statusHistoryColumns = ['previousValue', 'newValue', 'startDate', 'comment'];
  titleHistoryColumns = ['previousValue', 'newValue', 'startDate', 'comment'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private repProfileService: RepProfileService,
    private repStatusHistoryService: RepStatusHistoryService,
    private repTitleHistoryService: RepTitleHistoryService
  ) {
    this.profileForm = this.fb.group({
      address: ['', Validators.required],
      birthday: ['', Validators.required],
      agentCode: ['', Validators.required],
      professionalEmail: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      comment: ['']
    });

    this.statusChangeForm = this.fb.group({
      actualStatusId: ['', Validators.required],
      newStatusId: ['', Validators.required],
      comment: ['', Validators.required]
    });

    this.titleChangeForm = this.fb.group({
      actualTitleId: ['', Validators.required],
      newTitleId: ['', Validators.required],
      comment: ['', Validators.required]
    });

  }

ngOnInit(): void {
  this.profileId = this.route.snapshot.paramMap.get('id')!;
  this.loadProfile();
  this.loadStatusHistory();
  this.loadTitleHistory();
  this.loadStatusOptions();
  this.loadTitleOptions();
}
  // ─── Onglet Informations ─────────────────

  loadProfile(): void {
    this.isLoading = true;

    this.repProfileService.getByProfileId(this.profileId).subscribe({
      next: (response) => {
        this.profile = response.data;
        this.profileForm.patchValue({
          address: this.profile.address,
          birthday: this.profile.birthday,
          agentCode: this.profile.agentCode,
          professionalEmail: this.profile.professionalEmail,
          phoneNumber: this.profile.phoneNumber,
          comment: this.profile.comment
        });
        this.statusChangeForm.get('actualStatusId')?.disable();
        this.titleChangeForm.get('actualTitleId')?.disable();
        if (this.profile.currentStatus) {
          this.selectedStatusId = this.profile.currentStatus.id;
        }
        if (this.profile.currentStatus) {
          this.selectedStatusId = this.profile.currentStatus.id;
          this.statusChangeForm.patchValue({
            actualStatusId: this.profile.currentStatus.id
          });
        }
        if (this.profile.currentTitle) {
          this.selectedTitleId = this.profile.currentTitle.id;
          this.titleChangeForm.patchValue({
            actualTitleId: this.profile.currentTitle.id
          });
        }
        if (this.profile.currentTitle) {
          this.selectedTitleId = this.profile.currentTitle.id;
        }
        this.isLoading = false;
      },
      
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }


loadStatusOptions(): void {
  this.repStatusHistoryService.getAllStatusOptions().subscribe({
    next: (response) => { this.statusOptions = response.data; },
    error: (err) => console.log(err)
  });
}

loadTitleOptions(): void {
  this.repTitleHistoryService.getAllTitleOptions().subscribe({
    next: (response) => { this.titleOptions = response.data; },
    error: (err) => console.log(err)
  });
}
  onSubmit(): void {
    if (this.profileForm.invalid) return;

    this.isSaving = true;
    this.errorMessage = '';

    this.repProfileService.update(this.profileForm.value, this.profileId).subscribe({
      next: () => {
        this.router.navigate(['/rep-profiles']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Une erreur est survenue';
        this.isSaving = false;
      }
    });
  }

  // ─── Onglet Statut & Titre ────────────────

updateStatus(): void {
    console.log('form valid:', this.statusChangeForm.valid);
  console.log('form value:', this.statusChangeForm.getRawValue());
  if (this.statusChangeForm.invalid) return;
  this.isUpdatingStatus = true;

this.repStatusHistoryService.addStatus(this.profileId, this.statusChangeForm.getRawValue()).subscribe({
    next: (response) => {
        console.log('status updated:', response);

      this.isUpdatingStatus = false;
      this.loadProfile();
      this.loadStatusHistory();
      this.statusChangeForm.reset();
    },
    error: (err) => {
      console.log(err);
      this.isUpdatingStatus = false;
    }
  });
}


updateTitle(): void {
  if (this.titleChangeForm.invalid) return;
  this.isUpdatingTitle = true;

  this.repTitleHistoryService.addTitle(this.profileId, this.titleChangeForm.getRawValue()).subscribe({
    next: () => {
      this.isUpdatingTitle = false;
      this.loadProfile();
      this.loadTitleHistory();
      this.titleChangeForm.reset();
    },
    error: (err) => {
      console.log(err);
      this.isUpdatingTitle = false;
    }
  });
}

  // ─── Onglet Historique ────────────────────

  loadStatusHistory(): void {
    this.repStatusHistoryService.getHistory(this.profileId).subscribe({
      next: (response) => {
        this.statusHistory = response.data;
      },
      error: (err) => console.log(err)
    });
  }

  loadTitleHistory(): void {
    this.repTitleHistoryService.getHistory(this.profileId).subscribe({
      next: (response) => {
        this.titleHistory = response.data;
      },
      error: (err) => console.log(err)
    });
  }
}