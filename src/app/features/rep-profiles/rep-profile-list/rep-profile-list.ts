import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RepProfileService } from '../../../core/services/rep-profile.service';
import { RepProfileResponse } from '../../../core/models/rep-profile.model';

@Component({
  selector: 'app-rep-profile-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './rep-profile-list.html',
  styleUrl: './rep-profile-list.scss'
})
export class RepProfileList implements OnInit {
  profiles: RepProfileResponse[] = [];
  displayedColumns: string[] = ['agentCode', 'professionalEmail', 'phoneNumber', 'currentStatus', 'currentTitle', 'actions'];

  totalElements = 0;
  pageSize = 20;
  pageIndex = 0;
  isLoading = false;

  constructor(private repProfileService: RepProfileService) {}

  ngOnInit(): void {
    this.loadProfiles();
  }

  loadProfiles(): void {
    this.isLoading = true;

    this.repProfileService.getAll(this.pageIndex, this.pageSize).subscribe({
      next: (response) => {
        this.profiles = response.data.data;
        console.log(this.profiles)
        this.totalElements = response.data.totalElements;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProfiles();
  }
}