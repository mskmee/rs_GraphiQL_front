import * as yup from 'yup';

export const signInSchema = yup.object().shape({
  email: yup.string().required('errors.email.required').email('errors.email.invalid'),
  password: yup
    .string()
    .required('errors.password.required')
    .min(8, 'errors.password.min')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      'errors.password.matches'
    ),
});

export type SignInData = yup.InferType<typeof signInSchema>;

export const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .required('errors.name.required')
    .matches(/^[A-ZА-Я][a-zA-Zа-яА-Я]*$/, 'errors.name.matches'),
  email: yup.string().required('errors.email.required').email('errors.email.invalid'),
  password: yup
    .string()
    .required('errors.password.required')
    .min(8, 'errors.password.min')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      'errors.password.matches'
    ),
  repeatPassword: yup
    .string()
    .required('errors.repeatPassword.required')
    .test('password-match', 'errors.repeatPassword.test', function (value) {
      return value === this.parent.password;
    }),
});

export type SignUpData = yup.InferType<typeof signUpSchema>;

export const resetSchema = yup.object().shape({
  email: yup.string().required('errors.email.required').email('errors.email.invalid'),
});

export type ResetData = yup.InferType<typeof resetSchema>;
