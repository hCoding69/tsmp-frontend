import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { PagedResponse } from '../models/paged-response.model';
import { RepProfileRequest, RepProfileResponse } from '../models/rep-profile.model';

@Injectable({ providedIn: 'root' })
export class RepProfileService {

    constructor(private http: HttpClient){}

    private readonly API_URL = `${environment.apiUrl}/rep-profiles`;

    getAll(page: number, size: number) {
        return this.http.get<ApiResponse<PagedResponse<RepProfileResponse>>>(this.API_URL, {
        params: { page: page.toString(), size: size.toString() }
        });
    }

    getByUser(userId: string) {
        return this.http.get<ApiResponse<RepProfileResponse>>(`${this.API_URL}/user/${userId}`);
    }

    getByAgentCode(agentCode: string) {
        return this.http.get<ApiResponse<RepProfileResponse>>(`${this.API_URL}/agent/${agentCode}`);
    }

    create(dto: RepProfileRequest) {
        return this.http.post<ApiResponse<RepProfileResponse>>(this.API_URL, dto);
    }

    update(dto: RepProfileRequest, id: string) {
        return this.http.put<ApiResponse<RepProfileResponse>>(`${this.API_URL}/${id}`, dto);
    }
}