import * as yup from 'yup';

export const signInSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      'Password must contain at least one letter, one digit, and one special character'
    ),
});

export type SignInData = yup.InferType<typeof signInSchema>;

export const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z][a-zA-Z]*$/, 'Name must start with a capital letter and contain only letters'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      'Password must contain at least one letter, one digit, and one special character'
    ),
  repeatPassword: yup
    .string()
    .required('Repeat password is required')
    .test('password-match', 'Passwords must match', function (value) {
      return value === this.parent.password;
    }),
});

export type SignUpData = yup.InferType<typeof signUpSchema>;

export const resetSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email format'),
});

export type ResetData = yup.InferType<typeof resetSchema>;
