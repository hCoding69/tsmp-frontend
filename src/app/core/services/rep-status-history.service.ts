import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class RepStatusHistoryService {
  private readonly API_URL = `${environment.apiUrl}/rep-profiles`;
  private readonly STATUS_URL = `${environment.apiUrl}/rep-status`;

  constructor(private http: HttpClient) {}

  getHistory(repProfileId: string) {
    return this.http.get<ApiResponse<any[]>>(`${this.API_URL}/${repProfileId}/status-history`);
  }

  getLatest(repProfileId: string) {
    return this.http.get<ApiResponse<any>>(`${this.API_URL}/${repProfileId}/status-history/latest`);
  }

addStatus(repProfileId: string, dto: { actualStatusId: string; newStatusId: string; comment: string }) {
  return this.http.post<ApiResponse<any>>(`${this.API_URL}/${repProfileId}/status-history`, dto);
}

  getAllStatusOptions() {
    return this.http.get<ApiResponse<any[]>>(this.STATUS_URL);
  }
}