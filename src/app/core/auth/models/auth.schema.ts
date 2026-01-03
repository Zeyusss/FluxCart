import { email, required, schema, validate, customError, pattern } from '@angular/forms/signals';
import { LoginInterface, RegisterInterface } from '../../models/auth/auth';

export const registerSchema = schema<RegisterInterface>((rootPath) => {
  required(rootPath.name, { message: 'Name is Required!' }),
    required(rootPath.email, { message: 'Email is Required!' }),
    email(rootPath.email, { message: 'Please Enter Valid Email!' });
  required(rootPath.password, { message: 'Password is Required!' }),
    pattern(rootPath.password, /^(?=.*[A-Z])(?=.*\d).{8,}$/, {
      message: 'Min 8 chars, 1 uppercase, 1 number',
    });
  validate(rootPath.rePassword, (ctx) => {
    const password = ctx.valueOf(rootPath.password);
    const rePassword = ctx.value();
    return password === rePassword
      ? undefined
      : customError({
          message: 'Password do not match!',
          kind: 'Password Missmatch',
        });
  });
  required(rootPath.phone, { message: 'Phone is Required!' }),
    pattern(rootPath.phone, /^01[0-2,5][0-9]{8}$/, {
      message: 'You Should Use Egyptian Phone Number',
    });
});

export const loginSchema = schema<LoginInterface>((rootPath) => {
  required(rootPath.email, { message: 'Email is Required!' }),
    email(rootPath.email, { message: 'Please Enter Valid Email!' });
  required(rootPath.password, { message: 'Password is Required!' }),
    pattern(rootPath.password, /^(?=.*[A-Z])(?=.*\d).{8,}$/, {
      message: 'Min 8 chars, 1 uppercase, 1 number',
    });
});
