import { LoginInterface, RegisterInterface, resetPassword } from '../../models/auth/auth';

export const initRegisterForm: RegisterInterface = {
  name: '',
  email: '',
  password: '',
  rePassword: '',
  phone: '',
};

export const initLoginForm: LoginInterface = {
  email: '',
  password: '',
};

export const initResetPassword: resetPassword = {
  currentPassword: '',
  password: '',
  rePassword: '',
};
