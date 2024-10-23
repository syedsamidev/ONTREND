import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [current, setCurrent] = useState('Login');
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  
    try {
      const endpoint = current === 'Sign Up' ? '/api/user/register' : '/api/user/login';
      const payload = current === 'Sign Up' ? { name, email, password } : { email, password };
  
      const response = await axios.post(`${backendUrl}${endpoint}`, payload);
      
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success(current === 'Sign Up' ? "Registration successful!" : "Login successful!");
      } else {
        toast.error(response.data.message);
      }
      
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message); // Specific backend error
      } else {
        toast.error("An unexpected error occurred");
      }
      console.log(error.response?.data || error.message); // Log error details
    }
  };

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])
  

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-900'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
      <hr className='border-none h-[1.5px] w-7 bg-gray-800'/>
        <p className='prata-regular text-3xl'>{current}</p>
        <hr className='border-none h-[1.5px] w-7 bg-gray-800'/>
      </div>
      {current === "Login" ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name'  required/>}
      <input onChange={(e)=>setEmail(e.target.value)} value={email}  type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
      <input onChange={(e)=>setPassword(e.target.value)} value={password}  type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer hover:underline'>Forgotten password?</p>
        {
          current === 'Login' 
          ? <p onClick={()=>setCurrent('Sign Up')} className='cursor-pointer hover:underline'>Create new account</p>
          : <p onClick={()=>setCurrent('Login')}  className='cursor-pointer hover:underline'>Login Here</p>
        }
      </div>
      <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4 rounded-md w-full'>
        {current === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}

export default Login