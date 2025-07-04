export interface UserI {
  id: number;
  username: string;
  name: string;
  roles: RoleI[];
  email: string;
  phone: string;
  is_active: boolean;
}

export interface RoleI {
  id: number;
  name: string;
}
