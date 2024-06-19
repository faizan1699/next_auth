"use client";
import React, { useState } from 'react';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Register = () => {

    const router = useRouter;

    const [alert, setAlert] = useState('');
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    }

    const handleRegister = (e) => {

        e.preventDefault();

        const { name, email, password } = inputs;

        if (name, email, password.length > 6) {

            try {
                const response = axios.post('api/register', { email, password })
                console.log("response ok", response);
                setAlert("user created successfully");
            }
            catch (err) {
                console.log("response ok", err);
                setAlert("Error to user creating");
            }

        }
        else {

            console.log("pls fill reqires fields");
            setAlert("pls fill reqires fields");

        }

        setTimeout(() => {
            setAlert(' ');
        }, 5000);

    }

    return (

        <div className='flex min-h-screen flex-col justify-between items-center py-10 rounded-lg shadow-md w-full text-md'>

            <div className='border bg-[#212121] p-6 rounded shadow-md w-96 '>

                <h1 className='font-bold text-center text-[#fff] mb-4 '>Register</h1>
                <h6 className='font-bold text-center text-red-500 mb-2 '>{alert && alert}</h6>

                <form onSubmit={handleRegister}>

                    <input className='w-full text-sm form-control border-grey-400 text-black rounded px-3 py-2 mb-2' name='name' value={inputs.name} onChange={handleInputChange} type="text" placeholder='name' />
                    <input className='w-full text-sm form-control border-grey-400 text-black rounded px-3 py-2 mb-2' name='email' value={inputs.email} onChange={handleInputChange} type="email" placeholder='email' />
                    <input className='w-full text-sm form-control border-grey-400 text-black rounded px-3 py-2 mb-2' name='password' value={inputs.password} onChange={handleInputChange} type="password" placeholder='password' />

                    <button type="submit" className='w-full text-sm bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>Register</button>

                </form>

                <div className='text-end'>
                    <h4 className='text-center my-2 font-bold text-blue-300'>- OR -</h4>
                    <Link href="/login" className='text-md text-blue-500 hover:underline hover:text-white'>Login with existing account ?</Link>
                </div>

            </div>

        </div>

    )
}

export default Register