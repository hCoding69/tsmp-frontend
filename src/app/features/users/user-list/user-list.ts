import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UserSummary } from '../../../core/models/user.model';
import { ApiResponse } from '../../../core/models/api-response.model';
import { PagedResponse } from '../../../core/models/paged-response.model';
import { UserService } from '../../../core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserList implements OnInit {
  users: UserSummary[] = [];
  displayedColumns: string[] = ['displayName', 'email', 'role', 'actions'];

  totalElements = 0;
  pageSize = 20;
  pageIndex = 0;
  isLoading = false;

  private readonly API_URL = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private userService : UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;

    const params = {
      page: this.pageIndex.toString(),
      size: this.pageSize.toString()
    };

    this.http.get<ApiResponse<PagedResponse<UserSummary>>>(this.API_URL, { params }).subscribe({
      next: (response) => {
        this.users = response.data.data;
        this.totalElements = response.data.totalElements;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

deleteUser(userId: string, name: string): void {
  const dialogRef = this.dialog.open(ConfirmDialog, {
    data: {
      title: 'Delete user',
      message: `Are you sure you want to permanently delete ${name}?`,
      confirmText: 'Delete'
    }
  });

  dialogRef.afterClosed().subscribe((confirmed) => {
    if (confirmed) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  });
}

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }
}