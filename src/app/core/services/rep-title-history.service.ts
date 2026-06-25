import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class RepTitleHistoryService {
  private readonly API_URL = `${environment.apiUrl}/rep-profiles`;
  private readonly TITLE_URL = `${environment.apiUrl}/rep-title`;

  constructor(private http: HttpClient) {}

  getHistory(repProfileId: string) {
    return this.http.get<ApiResponse<any[]>>(`${this.API_URL}/${repProfileId}/title-history`);
  }

  getLatest(repProfileId: string) {
    return this.http.get<ApiResponse<any>>(`${this.API_URL}/${repProfileId}/title-history/latest`);
  }

  addTitle(repProfileId: string, dto: { newValueId: string }) {
    return this.http.post<ApiResponse<any>>(`${this.API_URL}/${repProfileId}/title-history`, dto);
  }

  getAllTitleOptions() {
    return this.http.get<ApiResponse<any[]>>(this.TITLE_URL);
  }
}