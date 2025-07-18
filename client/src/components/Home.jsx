import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../util';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState('')
  const [products, setProducts] = useState([])

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('LogOut Successfully')
    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }
  const fetchProducts = async () => {
    try {
      const headers = { headers: {'Authorization': localStorage.getItem('token')}}
      const res = await fetch("https://authentication-app-api-rouge.vercel.app/product", headers)
      const result = await res.json();
      console.log(result)
      setProducts(result)
    } catch (error) {
      handleError(error)
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [])


  return (
    <div className='w-full h-[80vh] flex justify-center items-center flex-col gap-5'>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout} className='cursor-pointer bg-[rgb(99,102,241)] w-[7rem] rounded-2xl text-[1.2rem] py-1 px-4 text-white filter hover:drop-shadow-[0_0_0.5em_rgb(99,102,241)] transition-all duration-[0.3s]'>Logout</button>
      <div>
        {products && products?.map((items,index)=> {
          return(
            <ul key={index}>
            <span>{items.name} : {items.price}</span>
          </ul>
          )
        })}
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home
