"use client";

import axios from 'axios';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { signIn } from "next-auth/react"; 
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import Input from '@/components/input';

const AuthPage = () => {

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const [ variant, setVariant ] = useState('login');
    
    const router = useRouter(); 

    const toggleVariant = useCallback(() => {
       setVariant((current) => current === "login" ? "register" : "login") 
    },[])

    const login = useCallback(async () => {

        try {
            await signIn("credentials", {
                email,
                password,
                redirect: false,
                callbackUrl: "/"
            })

            router.push("/profiles");

        } catch(error) {
            console.log(error);
        }
    },[email,password, router])

    const register = useCallback(async () => {
        try {
            await axios.post("/api/register", {
                name,
                email,
                password
            })

            login();
        } catch(error) {
            console.log(error);
        }
    },[name, email, password, login])

  return (
    <div className="relative w-full h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className='w-full h-full bg-black lg:bg-opacity-50'>
            <nav className='px-10 py-5'>
                <Image
                    src="/images/logo.png"
                    alt='logo'
                    width={180}
                    height={40}
                />
            </nav>
            <div className='flex justify-center'>
                <div className='bg-black bg-opacity-70 p-16 w-full lg:w-2/5 lg:max-w-md rounded-md'>
                    <h2 className='text-white text-3xl font-bold mb-10'>{variant === "login" ? "Sign In" : "Register"}</h2>
                    <div className='flex flex-col gap-4'>
                        {variant === "register" && (
                            <Input 
                            id='name' 
                            type='text'
                            label='Username' 
                            value={name}
                            onChange={(e: any) => { setName(e.target.value)}}
                        />
                        )}
                        <Input
                            id='email' 
                            type='email'
                            label='Email address or phone number' 
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                        />
                        <Input
                            id='password' 
                            type='password'
                            label='Password'
                            value={password}
                            onChange={(e: any) => setPassword(e.target.value)} 
                        /> 
                    </div>
                    <button onClick={variant === "login" ? login : register} className='w-full bg-red-600 py-3 flex justify-center items-end text-white rounded-md mt-10 hover:bg-red-700 transition'>
                        {variant === "login" ? "Login" : "Sign up"}
                    </button>
                    <div className='flex justify-center items-center gap-x-4 mt-10'>
                        <div 
                            onClick={() => { signIn('google', { callbackUrl: "/profiles" }) }} 
                            className='bg-white p-1 rounded-full hover:bg-opacity-75 cursor-pointer'
                        >
                            <FcGoogle size={32} />
                        </div>
                        <div
                            onClick={() => { signIn('github', { callbackUrl: "/profiles" }) }} 
                            className='bg-white p-1 rounded-full hover:bg-opacity-75 cursor-pointer'
                        >
                            <FaGithub size={32} />
                        </div>
                    </div>
                    <p className='text-neutral-500 mt-10 text-sm'>
                        {variant === "login" ? "First time using Netflix?" : "Already have an account?"}
                        <span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer'>
                            {variant === "login" ? "Create an account" : "Login"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AuthPage