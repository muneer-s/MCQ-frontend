import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/api'; // Adjust path if needed
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const validationSchema = Yup.object({
    mobile: Yup.string()
      .required('Mobile number is required')
      .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        'Password must contain uppercase, lowercase, number and at least 8 characters'
      ),
  });

  const formik = useFormik({
    initialValues: {
      mobile: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setServerError('');
      try {
        const data = await login(values);
        localStorage.setItem('token', data.token)
        alert('Login successful!');
        navigate('/startingPage');
      } catch (err) {
        setServerError(err.message || 'Login failed');
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center bg-white px-4">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-cyan-900 relative">
        <span className="relative z-10">Login</span>
        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 h-2 w-24 bg-orange-300 z-0 rounded-sm"></span>
      </h1>

      {/* Card */}
      <form onSubmit={formik.handleSubmit} className="mt-10 w-full max-w-md bg-white p-8 rounded shadow-md">
        {/* Mobile Number */}
        <label className="block text-lg font-semibold text-gray-800 mb-2">Mobile Number</label>
        <div className="flex mb-2">
          <div className="flex items-center border border-gray-300 rounded-l p-3">
            <img src="https://flagcdn.com/w40/in.png" alt="IN" className="w-5 h-4 mr-2" />
            <select className="outline-none bg-transparent text-gray-700 text-sm mr-2" disabled>
              <option>+91</option>
            </select>
          </div>
          <input
            type="tel"
            name="mobile"
            placeholder="Enter your phone number"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-l-0 border-gray-300 rounded-r px-4 py-2 text-center outline-none"
          />
        </div>
        {formik.touched.mobile && formik.errors.mobile && (
          <p className="text-red-600 text-sm mb-3">{formik.errors.mobile}</p>
        )}

        {/* Password */}
        <label className="block text-lg font-semibold text-gray-800 mb-2">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full border border-gray-300 rounded px-4 py-2 outline-none mb-2"
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-600 text-sm mb-3">{formik.errors.password}</p>
        )}

        {/* Server Error */}
        {serverError && <p className="text-red-600 text-sm mb-4">{serverError}</p>}

        {/* Login Button */}
        <button type="submit" className="w-full bg-[#234B5E] text-white py-2 rounded font-semibold">
          Login
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-500 font-medium hover:underline">
            Register Now
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
