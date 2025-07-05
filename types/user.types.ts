export interface UserI {
  id: number;
  username: string;
  name: string;
  role_ids: number[];
  roles: RoleI[];
  email: string;
  phone: string;
  is_active: boolean;
}

export interface RoleI {
  id: number;
  name: string;
}
