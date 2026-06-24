import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, AuthResponse } from '../models/auth.model';
import { environment } from '../../../environments/environment';
import { UpdateUserRequest, UserSummary } from '../models/user.model';
import { ApiResponse } from '../models/api-response.model';
import { PagedResponse } from '../models/paged-response.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly API_URL = `${environment.apiUrl}/users`;
  private readonly TOKEN_KEY = 'tsmp_token';
  private readonly ROLE_KEY = 'tsmp_role';

  constructor(private http: HttpClient){}

  editUser(dto: UpdateUserRequest, userId : String) : Observable<UserSummary> {
    return this.http.put<UserSummary>(`${this.API_URL}/${userId}/update`, dto);
  }

  getUserById(userId : string) {
    return this.http.get<ApiResponse<UserSummary>>(`${this.API_URL}/${userId}`);
  }

  existsByEmail(email: string, userId: string) {
    return this.http.get<ApiResponse<boolean>>(`${this.API_URL}/exists/${userId}/${email}`);
  }

  deleteUser(userId: string) {
    return this.http.delete<ApiResponse<boolean>>(`${this.API_URL}/${userId}`)
  }
  getUsersByRole(roleId: string, page: number = 0, size: number = 50) {
    return this.http.get<ApiResponse<PagedResponse<UserSummary>>>(`${this.API_URL}/role/${roleId}`, {
      params: { page: page.toString(), size: size.toString() }
    });
  }
}