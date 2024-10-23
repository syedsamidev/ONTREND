import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/Newsletter'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={'Us'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="OnTrend About Us" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>At <b>ONTREND</b>, we believe fashion is for everyone. Our mission is to bring the latest trends in men's, women's, and kids' clothing right to your doorstep.</p>
          <p>With a passion for style and quality, we curate pieces that not only look good but feel great too. From everyday essentials to statement pieces, we’ve got you covered.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission is to make fashion accessible and affordable for all. We strive to provide stylish, high-quality garments for the entire family, while offering exceptional customer service and an easy shopping experience.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'Why'} text2={'Choose Us?'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>We take pride in the quality of our products. Every item is carefully crafted to ensure durability and comfort, so you can wear it with confidence.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>Shop from the comfort of your home with our seamless online shopping experience. Browse our collections and find the perfect fit for your style and budget.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Our team is here to help you every step of the way. Whether it’s finding the right size or handling a return, we’re committed to making your experience hassle-free.</p>
        </div>
      </div>

      <Newsletter/>
    </div>
  )
}

export default About
