import {
  ChangePasswordInterFace,
  ForgotPasswordInterFace,
  LoginInterface,
  RegisterInterface,
  ResetCodeInterFace,
  resetPassword,
} from '../../models/auth/auth';

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

export const initForgotPassword: ForgotPasswordInterFace = {
  email: '',
};

export const initResetCode: ResetCodeInterFace = {
  resetCode: '',
};

export const initChangePassword: ChangePasswordInterFace = {
  email: '',
  newPassword: '',
};
