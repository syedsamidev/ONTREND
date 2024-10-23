import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/Newsletter'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'Contact'} text2={'Us'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="OnTrend Contact Us" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>1-10/3 Industrial Area, <br/>Rawalpindi </p>
          <p>Tel : +92 81-5462068 <br/> Email: contact@ontrend.com</p>
          
          <p className='font-semibold text-lg text-gray-600'>Get in Touch</p>
          <p className='text-gray-500'>
            Have a question about our products or your order? We’d love to hear from you! Reach out to us via phone or email, and our friendly customer service team will be happy to assist.
          </p>

          <p className='font-semibold text-lg text-gray-600'>Store Hours</p>
          <p className='text-gray-500'>
            Monday - Saturday: 10 AM - 8 PM <br />
            Sunday: Closed
          </p>

          <p className='font-semibold text-lg text-gray-600'>Follow Us</p>
          <p className='text-gray-500'>
            Stay updated with the latest trends and offers by following us on social media. Connect with us on Instagram, Facebook, and Twitter for the newest arrivals and exclusive deals.
          </p>
        </div>
      </div>
      <Newsletter/>
    </div>
  )
}

export default Contact
