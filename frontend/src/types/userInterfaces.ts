export interface UserData {
  username: string;
  password: string;
  role: string;
  info: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  };
}

export interface UserUpdateData {
  username?: string;
  password?: string;
  info?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
}

export interface UserInfo {
  id: number;
  username: string;
  role: string;
  info: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  };
}
