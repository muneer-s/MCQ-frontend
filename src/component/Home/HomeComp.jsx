import React from 'react';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

const HomeComp = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/questionsPage'); // Change route as needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      <Header />
      <div className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
          Welcome to{' '}
          <span className="text-orange-500 underline decoration-4 decoration-orange-300">
            TSEEP Mastery Box
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10">
          Supercharge your growth with our AI-powered learning tools. Your journey starts here.
        </p>

        <button
          onClick={handleStart}
          className="px-8 py-3 rounded-full bg-blue-700 text-white text-lg font-semibold shadow-md hover:bg-blue-800 transition duration-300"
        >
          🚀 Get Started
        </button>
      </div>
    </div>
  );
};

export default HomeComp;
