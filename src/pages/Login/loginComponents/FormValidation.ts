import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().email().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});
