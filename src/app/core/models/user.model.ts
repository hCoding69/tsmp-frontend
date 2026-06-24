import { Role } from "./role.model";

export interface UserSummary {
  id: string;
  displayName: string;
  email: string;
  role: Role;
}

export interface UpdateUserRequest{
  displayName?: string;
  email?: string;
  roleId?: string;
}