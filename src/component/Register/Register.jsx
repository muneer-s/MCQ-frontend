import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../api/api';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        role: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {

            const data = await signup(formData);
            alert('Registration successful!');
            navigate('/login');
        } catch (err) {
            setError('Server error. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center bg-white mb-10">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 relative">
                    <span className="relative z-10">Register</span>
                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-28 h-1 bg-orange-300 z-0"></span>
                </h2>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-bold mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 rounded px-2 py-2 outline-none"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-bold mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded px-2 py-2 outline-none"
                            required
                        />
                    </div>

                    {/* Mobile */}
                    <div>
                        <label className="block text-sm font-bold mb-1">Mobile Number</label>
                        <div className="flex mb-6">
                            <div className="flex items-center border border-gray-300 rounded-l p-3">
                                <img src="https://flagcdn.com/w40/in.png" alt="IN" className="w-5 h-4 mr-2" />
                                <select className="outline-none bg-transparent text-gray-700 text-sm mr-2" disabled>
                                    <option>+91</option>
                                </select>
                            </div>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                className="w-full border border-l-0 border-gray-300 rounded-r px-4 py-2 text-center outline-none"
                                required
                            />
                        </div>
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
                                    checked={formData.role === 'Student'}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Student
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Employee"
                                    checked={formData.role === 'Employee'}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                Employee
                            </label>
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-bold mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                            required
                        />
                    </div>

                    {/* Error message */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {/* Save Button */}
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
