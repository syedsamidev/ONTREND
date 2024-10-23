import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestseller, setBestseller] = useState([]);

    useEffect(() => {
        if (products.length > 0) { // Check if products are available
            const bestProduct = products.filter(item => item.bestSeller);
            setBestseller(bestProduct.slice(0, 5));
        }
    }, [products]);
    
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'Customer'} text2={'Favourites'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Explore our best sellers – top-quality, trendy pieces loved by customers for style and comfort.</p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {bestseller.map((item,index)=>(<ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>))}
        </div>
    </div>
  )
}

export default BestSeller