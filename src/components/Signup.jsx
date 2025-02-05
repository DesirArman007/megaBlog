import React,{useState} from 'react';
import authService from '../appwrite/auth';
import { Link,useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import {Button,Input,Logo} from './index.js';
import { useDispatch } from 'react-redux';
import {useForm} from "react-hook-form";

function Signup() {
    const naviagte = useNavigate();
    const dispatch = useDispatch();
    const [error,setError] = useState("");
    const {register,handleSubmit} = useForm();

    const create = async(data)=>{
        setError("")
        try{
            const userData=await authService.createAccount(data)
            if(userData){
               const userData = await authService.getCurrentUser()
    // agar user data hai toh login krwa do 
               if(userData){
// yaha store ko updatekr rahe hai
                    dispatch(login(userData));
                    naviagte("/")
                }
            }
        }catch(error){
            setError(error.message)
        }
    }
  return (
    <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'> Sign in to your Account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                    Already have any account?&nbps;
                    <Link
                        to="/login"
                        className="font-medium text-primary
                        transition-all duration-200 hover:underline">
                            Sign In
                        </Link>

            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input 
                    label="Full Name: "
                    placeholder="Enter your full name"
                    {...register("name",{
                        required:true
                    })}
                    />

                    <Input 
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required:true,
                        validate:{
                            matchPatern: (value) => /^\w+([.-]?\w   +)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test  (value) ||
                               "Email address must be a valid address",
                    }

                    })}
                      />
                      
                    <Input 
                    label="password"
                    placeholder="Enter your password"
                    type="password"
                    {...register("password",{
                     required:true,
                     validate:{
                        matchPatern:(value)=>/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value) ||
                        "Enter A Valid Passwword",
                        }
                    })}
                    />
                    <Button
                    type="submit"
                    className="w-full"
                    >
                    Create Account</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup