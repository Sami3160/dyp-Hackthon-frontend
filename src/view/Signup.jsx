
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useAuth } from '../../Contexts/UserContext';
import { useAuth } from '../contexts/Auth';
import { Link, useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const { auth, signUp } = useAuth();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        document.title = 'Signup, Join us!';
    }, []);

    const onSubmit = async (data) => {
        const { name, email, password, role } = data;
        const a=await signUp(name, email, password, role);
        if(a==="success")navigate("/home")
        console.log(a)
    };

    useEffect(() => {
        if (auth?.token) {
            navigate('/');
        }
    }, [auth, navigate]);

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-purple-200">
            <h2 className="mt-2 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900 mb-10">Create your account</h2>
            <div className="flex justify-center items-center gap-20 bg-white rounded-xl">
                <img src="https://www.creative-tim.com/twcomponents/svg/secure-login-animate.svg" className='w-[40%] hidden md:block' alt="" />

                <div className="h-[60vh] md:h-[100%] relative flex flex-col p-4 rounded-md text-black bg-white w-full md:w-[40%]">
                    <div className="h-auto text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Join <span className="text-[#7747ff]">App</span></div>
                    <div className="text-sm h-auto font-normal mb-4 text-center text-[#1e0e4b]">Create your account</div>
                    {serverError && (
                        <div className="mb-4 p-2 h-auto bg-red-100 text-red-700 border border-red-300 rounded">
                            {serverError}
                        </div>
                    )}
                    <form className="flex flex-col gap-3 h-auto" onSubmit={handleSubmit(onSubmit)}>
                        <div className="block relative">
                            <label htmlFor="name" className="block h-auto text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Name</label>
                            <input
                                id="name"
                                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                                {...register('name', { required: 'Name is required', pattern: { value: /\S/, message: 'Name is invalid' } })}
                            />
                            {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name.message}</div>}
                        </div>
                        <div className="block relative">
                            <label htmlFor="email" className="block text-gray-600 h-auto cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
                            <input
                                id="email"
                                className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                                {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Email is invalid' } })}
                            />
                            {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email.message}</div>}
                        </div>
                        <div className="h-auto text-md flex gap-2">
                            <p>Signup as admin</p>
                            <select {...register("role")}>
                                <option value="admin" >Admin</option>
                                <option value="organizer" selected>Organizer</option>
                            </select>
                        </div>
                        <div className="block relative">
                            <label htmlFor="password" className="block text-gray-600 cursor-text h-auto text-sm leading-[140%] font-normal mb-2">Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className="rounded border border-gray-200  text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                                {...register('password', { required: 'Password is required' })}
                            />
                            {showPassword ? (
                                <BsEyeSlash
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute m-4 h-10 w-10 p-1 rounded-md text-white bg-purple-300 cursor-pointer -right-4 top-[14px]'
                                />
                            ) : (
                                <BsEye
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute m-4 h-10 w-10 p-1 rounded-md text-white bg-purple-300 cursor-pointer -right-4 top-[14px]'
                                />
                            )}
                            {errors.password && <div className="text-red-600 h-autoa text-sm mt-1">{errors.password.message}</div>}
                        </div>
                        <div>
                            <a className="text-sm text-[#7747ff]" href="#">Forgot your password?</a>
                        </div>
                        <button type="submit" className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Submit</button>
                    </form>
                    <div className="text-sm text-center mt-[1.6rem]">Already have an account? <Link className="text-sm text-[#7747ff]" to="/login">Sign in!</Link></div>
                </div>
            </div>
        </div>
    );
}

export default Signup;