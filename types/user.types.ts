export interface User {
  id: number;
  username: string;
  name: string;
  roles: Role[];
  email: string;
  phone: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface Role {
  id: number;
  name: string;
}
