import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../../api/api';
import { useState } from 'react';
import Swal from 'sweetalert2';



const Register = () => {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object({
        fullName: Yup.string()
            .trim()
            .required('Full name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        mobile: Yup.string()
            .required('Mobile number is required')
            .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
        role: Yup.string()
            .required('Please select your current status'),
        password: Yup.string()
            .required('Password is required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                'Password must contain uppercase, lowercase, number and at least 8 characters'
            ),
    });

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            mobile: '',
            role: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setServerError('');
            setLoading(true);
            try {
                const data = await signup(values);

                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'Welcome !',
                    confirmButtonColor: '#234B5E',
                }).then(() => {
                    navigate('/login');
                });
            } catch (err) {
                setServerError('Server error. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="flex items-center justify-center bg-white mb-10">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 relative">
                    <span className="relative z-10">Register</span>
                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-28 h-1 bg-orange-300 z-0"></span>
                </h2>

                <form className="mt-8 space-y-5" onSubmit={formik.handleSubmit}>
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-bold mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 rounded px-2 py-2 outline-none"
                        />
                        {formik.touched.fullName && formik.errors.fullName && (
                            <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-bold mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded px-2 py-2 outline-none"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Mobile */}
                    <div>
                        <label className="block text-sm font-bold mb-1">Mobile Number</label>
                        <div className="flex mb-1">
                            <div className="flex items-center border border-gray-300 rounded-l p-3">
                                <img src="https://flagcdn.com/w40/in.png" alt="IN" className="w-5 h-4 mr-2" />
                                <select className="outline-none bg-transparent text-gray-700 text-sm mr-2" disabled>
                                    <option>+91</option>
                                </select>
                            </div>
                            <input
                                type="tel"
                                name="mobile"
                                value={formik.values.mobile}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your phone number"
                                className="w-full border border-l-0 border-gray-300 rounded-r px-4 py-2 text-center outline-none"
                            />
                        </div>
                        {formik.touched.mobile && formik.errors.mobile && (
                            <p className="text-red-500 text-sm">{formik.errors.mobile}</p>
                        )}
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block font-poppins text-sm font-bold mb-2">Current Status</label>
                        <div className="space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Student"
                                    checked={formik.values.role === 'Student'}
                                    onChange={formik.handleChange}
                                />
                                <span className="ml-2">Student</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Employee"
                                    checked={formik.values.role === 'Employee'}
                                    onChange={formik.handleChange}
                                />
                                <span className="ml-2">Employee</span>
                            </label>
                        </div>
                        {formik.touched.role && formik.errors.role && (
                            <p className="text-red-500 text-sm">{formik.errors.role}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-bold mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter Password"
                            className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-sm">{formik.errors.password}</p>
                        )}
                    </div>

                    {/* Server Error */}
                    {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-sky-900 text-white py-2 rounded hover:bg-sky-950 transition"
                        >
                            {loading ? 'Submitting...' : 'Save'}
                        </button>
                    </div>

                    {/* Login Redirect */}
                    <p className="text-center font-poppins text-sm mt-4">
                        Already have an account?{' '}
                        <Link to="/login">
                            <span className="text-blue-600 font-poppins hover:underline cursor-pointer">
                                Login Now
                            </span>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
