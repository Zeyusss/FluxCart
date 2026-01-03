import { LoginInterface, RegisterInterface } from '../../models/auth/auth';

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
