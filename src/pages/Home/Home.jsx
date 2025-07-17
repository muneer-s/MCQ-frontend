import React, { useState } from 'react';
import Header from '../../component/Header/Header';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate()

    const gotoLogin = () => {
        navigate('/login')
    }

    return (
        <>
            <Header />
            <div className=" flex flex-col items-center w-auto justify-center bg-white px-4 mt-40">


                <div className="text-center my-10 mt-0 ">
                    {/* Main Heading */}
                    <h1 className="text-7xl font-oceanwide font-bold text-gray-800">
                        Welcome to{' '}
                        <span className="relative inline-block">
                            <span className="relative font-oceanwide z-10">TSEEP Mastery Box</span>
                            <span className="absolute left-0 bottom-1 w-full h-3 bg-orange-300 z-0"></span>
                        </span>
                    </h1>

                    {/* Sub Heading */}
                    <p className="text-gray-500 mt-4 text-3xl">
                        Unlock your potential with{' '}
                        <span className="font-semibold text-gray-700">AI inspired tool</span>
                    </p>
                </div>

                <div className='bg-black h-[1px] w-[1300px] mx-auto mt-20'></div>


                {/* Terms Checkbox */}
                <div className="flex w-[1300px]  mt-10">
                    <div className='w-2/3 flex items-start pl-14 '>
                        <input
                            type="checkbox"
                            id="terms"
                            className="mr-2 mt-1 w-5 h-5"
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                        />
                        <p className="text-md font-semibold text-black">
                            I confirm that I have read and accept the terms and conditions
                            <br />
                            <span className="text-md font-semibold text-black">and privacy policy.</span>
                        </p>
                    </div>
                    <div className=' w-1/3 flex justify-end pr-5 pt-5 mt-1'>

                        <button
                            disabled={!checked}
                            onClick={gotoLogin}
                            className={` px-6 h-12 py-2 rounded text-white text-sm font-semibold ${checked ? 'bg-blue-800 hover:bg-blue-900' : 'bg-gray-700 cursor-not-allowed'
                                }`}
                        >
                            Get Started
                        </button>
                    </div>


                </div>

                {/* Button */}

            </div>
        </>

    );
};

export default Home;
