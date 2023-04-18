import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { register } from '../config';
import { useRedirectActiveUser } from '../hooks';
import { useUserContext } from '../context';

const Register = () => {
  const { user } = useUserContext();
  useRedirectActiveUser(user);

  const handleRegister = async (
    { email, password },
    { isSubmitting, setErrors }
  ) => {
    try {
      const userCredentials = await register({ email, password });
    } catch (error) {
      console.log(error.code);
      if (error.code === 'auth/email-already-in-use') {
        return setErrors({ email: 'Email already in use' });
      }
      if (error.code === 'auth/weak-password') {
        return setErrors({ password: 'Password is too weak' });
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
      <h1>Register</h1>
      <Formik
        initialValues={{ email: 'test@example.com', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
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
              Register
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Register;
