import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { handleError, handleSuccess } from '../util'

const Login = () => {
  const navigate = useNavigate();

  const [Login, setLogin] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    const copyLoginInfo = { ...Login };
    copyLoginInfo[name] = value;
    setLogin(copyLoginInfo);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = Login;

    if (!email || !password) {
      return handleError("All fields are required!")
    }

    try {
      const res = await fetch("https://authentication-app-api-rouge.vercel.app/login", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Login) });
      const result = await res.json();
      console.log(result);
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name)
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      }
      else {
        const details =
          result?.error?.details?.[0]?.message ||
          result?.message ||
          "Login failed";
        handleError(details);
      }
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <div className='w-full flex justify-center md:h-[80vh] items-center flex-col gap-10'>
      <h1 className='text-4xl font-bold text-[rgb(46,64,92)]'>Login</h1>
      <form className='flex flex-col gap-5 justify-center items-center' onSubmit={handleSubmit}>
        <div className='flex gap-5 justify-center items-center'>
          <label htmlFor='email'>Email</label>
          <input onChange={handleChange} className='border border-gray-400 rounded-2xl py-1 px-4 outline-0 filter focus:drop-shadow-[0_0_5em_black] placeholder-gray-400 text-[15px] w-[20rem]' type="email" name='email' placeholder='example@gmail.com' required />
        </div>
        <div className='flex gap-5 justify-center items-center'>
          <label htmlFor='password'>Password</label>
          <input onChange={handleChange} className='border border-gray-400 rounded-2xl py-1 px-4 outline-0 filter focus:drop-shadow-[0_0_3em_black] placeholder-gray-400 text-[15px] w-[20rem]' type="password" name='password' placeholder='Enter your password here...' required />
        </div>
        <button type='submit' className='cursor-pointer bg-[rgb(99,102,241)] w-[7rem] rounded-2xl text-[1.2rem] py-1 px-4 text-white filter hover:drop-shadow-[0_0_0.5em_rgb(99,102,241)] transition-all duration-[0.3s]'>Login</button>
        <span className='text-[15px] font-bold'>Don't have an account? <Link to={'/signup'} className='text-[rgb(99,102,241)] hover:underline'>click here to SignUp</Link></span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login
