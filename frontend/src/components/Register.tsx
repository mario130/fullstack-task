import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';

const Register = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      name: Yup.string().required('Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Za-z]/, 'Password must contain at least one letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        setErrorMessage(null);
        const response = await api.post('/users/signup', {
          email: values.email,
          name: values.name,
          password: values.password,
        });
        console.log('User registered:', response.data);
      } catch (error: any) {
        if (error.response && error.response.status === 409) {
          setErrorMessage('Email already exists');
        } else {
          setErrorMessage('Registration error. Please try again later.');
        }
        console.error('Registration error:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
        {formik.touched.email && formik.errors.email ? <div className="text-red-500 text-sm">{formik.errors.email}</div> : null}
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
        {formik.touched.name && formik.errors.name ? <div className="text-red-500 text-sm">{formik.errors.name}</div> : null}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
        {formik.touched.password && formik.errors.password ? <div className="text-red-500 text-sm">{formik.errors.password}</div> : null}
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div> : null}
      </div>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        Register
      </button>
    </form>
  );
};

export default Register;