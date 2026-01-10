export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface User {
  name: string;
  email: string;
  role: string;
}

export interface RegisterInterface {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface JwtPayload {
  id: string;
  name?: string;
  role?: string;
  iat: number;
  exp: number;
}

export interface resetPassword {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export interface resetPasswordResponse {
  message: string;
  user: User;
  token: string;
}
