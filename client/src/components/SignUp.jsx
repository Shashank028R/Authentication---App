import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { handleError, handleSuccess } from '../util'

const SignUp = () => {
  const navigate = useNavigate()
  const [SignUp, setSignUp] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    console.log(name,value)
    const copySignUpInfo = {...SignUp};
    copySignUpInfo[name] = value;
    setSignUp(copySignUpInfo);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password} = SignUp;

    if(!name || !email || !password){
      return handleError("All fields are required!")
    }

    try {
      const res = await fetch("http://localhost:8000/auth/signup", {method: 'POST', headers: {'Content-Type': 'application/json'},body: JSON.stringify(SignUp)});
      const result = await res.json();
      const {success,message,error} = result
      if(success){
        handleSuccess(message)
        setTimeout(() => {
          navigate('/login')
        }, 2000);
      }else if(error){
        const details = error?.details[0].message
        handleError(details)
      }
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <div className='w-full flex justify-center md:h-[80vh] items-center flex-col gap-10'>
      <h1 className='text-4xl font-bold text-[rgb(46,64,92)]'>SignUp</h1>
      <form className='flex flex-col gap-5 justify-center items-center' onSubmit={handleSubmit}>
        <div className='flex gap-5 justify-center items-center'>
          <label htmlFor='name'>Name</label>
          <input onChange={handleChange} className='border border-gray-400 rounded-2xl py-1 px-4 outline-0 filter focus:drop-shadow-[0_0_5em_black] placeholder-gray-400 text-[15px] w-[20rem]' type="text" name='name' autoFocus placeholder='Enter your name here...' required />
        </div>
        <div className='flex gap-5 justify-center items-center'>
          <label htmlFor='email'>Email</label>
          <input onChange={handleChange} className='border border-gray-400 rounded-2xl py-1 px-4 outline-0 filter focus:drop-shadow-[0_0_5em_black] placeholder-gray-400 text-[15px] w-[20rem]' type="email" name='email' placeholder='example@gmail.com' required />
        </div>
        <div className='flex gap-5 justify-center items-center'>
          <label htmlFor='password'>Password</label>
          <input onChange={handleChange} className='border border-gray-400 rounded-2xl py-1 px-4 outline-0 filter focus:drop-shadow-[0_0_3em_black] placeholder-gray-400 text-[15px] w-[20rem]' type="password" name='password' placeholder='Enter your password here...' required />
        </div>
        <button type='submit' className='cursor-pointer bg-[rgb(99,102,241)] w-[7rem] rounded-2xl text-[1.2rem] py-1 px-4 text-white filter hover:drop-shadow-[0_0_0.5em_rgb(99,102,241)] transition-all duration-[0.3s]'>Sign UP</button>
        <span className='text-[15px] font-bold'>Already Signup? <Link to={'/login'} className='text-[rgb(99,102,241)] hover:underline'>click here to Login</Link></span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default SignUp
