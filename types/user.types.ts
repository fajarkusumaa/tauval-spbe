export interface UserI {
  id: number;
  username: string;
  name: string;
  roles: RoleI[];
  email: string;
  phone: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface RoleI {
  id: number;
  name: string;
}
