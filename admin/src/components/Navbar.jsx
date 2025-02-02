import React from 'react'
import { assets } from "../assets/assets"

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <div className='flex items-center gap-3'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
        <p className='text-xs font-semibold'>Admin Panel</p>
        </div>
        <button onClick={()=>{setToken('')}} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Log out</button>
    </div>
  )
}

export default Navbar