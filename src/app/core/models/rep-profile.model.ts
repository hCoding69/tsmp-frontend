export interface RepStatus {
  id: string;
  name: string;
}

export interface RepTitle {
  id: string;
  name: string;
}

export interface RepBadge {
  id: string;
  name: string;
}

export interface RepProfileResponse {
  id: string;
  address: string;
  birthday: string;
  agentCode: string;
  professionalEmail: string;
  phoneNumber: string;
  comment: string | null;
  currentStatus: RepStatus | null;
  currentTitle: RepTitle | null;
  currentBadgeStatus: RepBadge | null;
}

export interface RepProfileRequest {
  id?: string;
  address: string;
  birthday: string;
  agentCode: string;
  professionalEmail: string;
  phoneNumber: string;
  comment?: string;
  userId?: string;
  referralHrId?: string;
}