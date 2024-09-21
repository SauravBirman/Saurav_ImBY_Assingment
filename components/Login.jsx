import React from 'react';
import Logo from '../public/images/logo.png';
import GoogleLogo from '../public/images/google-logo.png';
import Image from "next/future/image";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from '../firebase';

const Login = () => {
    const login = async () => {
        await signInWithPopup(auth, provider);
    }

    return (
        <div className='w-full h-screen overflow-hidden bg-[#252525] flex justify-center items-center'>
            <div className='bg-[#333333] p-10 rounded-lg shadow-lg flex flex-col items-center space-y-10'>
                <h1 className='text-5xl font-bold text-white'>Hey, Login to Dereyasa</h1>
                <button 
                    className='flex items-center text-3xl bg-white text-black px-5 py-2 rounded-md hover:bg-[#e2e2e2] transition-colors font-semibold space-x-3' 
                    onClick={login}
                >
                    <Image src={GoogleLogo} width={40} height={40} priority={true} quality={100} alt="" />
                    <span>Login With Google</span>
                </button>
            </div>
        </div>
    );
}

export default Login;
