export interface Role {
  id: string;
  createdAt: string | null;
  updatedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  name: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
}

export interface RoleOption {
  id: string;
  name: string;
}