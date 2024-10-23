import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
        <p className='text-gray-500'>{text1}<span className='text-gray-700 font-medium pl-2'>{text2}</span></p>
        <div className='ml-3 w-16 sm:w-20 h-[2.5px] bg-gradient-to-r from-gray-400 to-gray-800 '></div>
    </div>
  )
}

export default Title