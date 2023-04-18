import React from 'react';
import { Link } from 'react-router-dom';

// Forms and validators
import { Formik } from 'formik';
import * as Yup from 'yup';

// Material UI
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '@mui/lab';

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
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Formik
        initialValues={{ email: 'test@example.com', password: '123123' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isSubmitting,
        }) => (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              type="text"
              value={values.email}
              onChange={handleChange}
              name="email"
              onBlur={handleBlur}
              id="email"
              label="Email"
              fullWidth
              sx={{ mb: 3 }}
              error={errors.email && touched.email}
              helperText={errors.email && touched.email && errors.email}
            />
            <TextField
              type="password"
              value={values.password}
              onChange={handleChange}
              name="password"
              onBlur={handleBlur}
              id="password"
              label="Password"
              fullWidth
              sx={{ mb: 3 }}
              error={errors.password && touched.password}
              helperText={
                errors.password && touched.password && errors.password
              }
            />
            <LoadingButton
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="contained"
              fullWidth
              sx={{ mb: 3 }}
            >
              Login
            </LoadingButton>

            <Button component={Link} to="/register" fullWidth>
              You do not have an account? Register!
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
