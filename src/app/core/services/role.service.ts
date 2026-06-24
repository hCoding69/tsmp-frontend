import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, AuthResponse } from '../models/auth.model';
import { environment } from '../../../environments/environment';
import { UserSummary } from '../models/user.model';
import { ApiResponse } from '../models/api-response.model';
import { Role, RoleOption } from '../models/role.model';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private readonly ROLES_URL = `${environment.apiUrl}/roles`;
  constructor(private http: HttpClient){}

getRoles() {
  return this.http.get<ApiResponse<RoleOption[]>>(`${this.ROLES_URL}`);
}

}