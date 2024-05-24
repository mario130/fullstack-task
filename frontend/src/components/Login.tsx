import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        setErrorMessage(null);
        const response = await api.post('/auth/login', values);
        console.log('User logged in:', response.data);
        
        localStorage.setItem('token', response.data.access_token);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          setErrorMessage('Invalid email or password');
        } else {
          setErrorMessage('Login error. Please try again later.');
        }
        console.error('Login error:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? <div className="text-red-500">{formik.errors.password}</div> : null}
      </div>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;