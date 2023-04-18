import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { login } from '../config';
import { useUserContext } from '../context/UserContext';
import { useRedirectActiveUser } from '../hooks';

const Login = () => {
  const { user } = useUserContext();
  useRedirectActiveUser(user);

  const handleLogin = async (
    { email, password },
    { isSubmitting, setErrors }
  ) => {
    try {
      const userCredentials = await login({ email, password });
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        return setErrors({ email: 'User not found' });
      }
      if (error.code === 'auth/wrong-password') {
        return setErrors({ password: 'Wrong password' });
      }
    } finally {
      isSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Must be a valid email')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && touched.email && <p>{errors.email}</p>}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && touched.password && <p>{errors.password}</p>}
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
