import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext'
const Login = () => {
    const {loginUser, signInWithGoogle} = useAuth();
    const navigate = useNavigate();
    const [message, setMessage] = useState("")
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

    const onSubmit = async (data) => {
        try {
            await loginUser(data.email, data.password);
            alert("Login Successful");
            navigate("/")
        } catch (error) {
            setMessage("Please provide a valid email or password!!")
            console.log(error)
        }
    }

    const hanleGoogleSignIn = async () =>{
        try {
            await signInWithGoogle();
            alert("Login Successful!");
            navigate("/")
        } catch (error) {
            alert("Google sign in failed!");
            console.log(error)
        }
    }
  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
        <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' >
            <h2 className='text-xl font-semibold mb-4'>Please Login</h2>

            <form action=""  onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <lable className="text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email">Email</lable>
                    <input
                    {...register("email", { required: true })}
                    type="email" name="email" id="email" placeholder='Email Address'
                    className='shadow appearance-none border rounded w-full py-22 px-3 
                    leading-tight focus:outline-none focus:shadow-sm'/>
                </div>

                <div className='mb-4'>
                    <lable className="text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email">Password</lable>
                    <input
                    {...register("password", { required: true })}
                    type="password" name="password" id="password" placeholder='Password'
                    className='shadow appearance-none border rounded w-full py-22 px-3 
                    leading-tight focus:outline-none focus:shadow-sm'/>
                </div>
                {
                    message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
                }
                

                <div>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>Login
                    </button>
                </div>
            </form>
            <p className='align-baseline font-medium mt-4 text-sm'>Haven't an account? Please <Link to="/register" className='text-blue-500 hover:text-blue-700'>Register</Link></p>

                {/* google sign in */}
                <div className='mt-4'>
                <button
                onClick={hanleGoogleSignIn}
                className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>
                <FaGoogle  className='mr-2'/>
                Sign in with Google
                </button>
            </div>
        </div>
    </div>
  )
}

export default Login