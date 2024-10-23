import React, { useContext, useState, useEffect } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const {navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext);
  const [localCartItems, setLocalCartItems] = useState(cartItems);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipcode: '',
    phone: '',
    info: '',
  });

    // Handle form input changes
    const handleInputChange = (event) => {
      const name = event.target.name
      const value = event.target.value
      setFormData(data => ({...data, [name]:value}))
    };

    const onSubmitHandler = async (event) => {
      event.preventDefault();
      try {
        let orderItems = [];
        const currentCartItems = token ? cartItems : localCartItems; // Use localCartItems for guests
    
        // Collect cart items for the order
        for (const items in currentCartItems) {
          for (const item in currentCartItems[items]) {
            if (currentCartItems[items][item] > 0) {
              const itemInfo = structuredClone(products.find(product => product._id === items));
              if (itemInfo) {
                itemInfo.size = item;
                itemInfo.quantity = currentCartItems[items][item];
                orderItems.push(itemInfo);
              }
            }
          }
        }
    
        // Construct order data
        let orderData = {
          items: orderItems,
          amount: getCartAmount() + delivery_fee,
          address: formData,
          phoneNumber: formData.phone,
        };
    
        // Send the order request (with token if available)
        const config = token ? { headers: { token } } : {};
        const response = await axios.post(backendUrl + '/api/order/place', orderData, config);
    
        // Handle successful order placement
        if (response.data.success) {
          setCartItems({});
          if (!token) {
            localStorage.removeItem('guestCart'); // Clear guest cart
            setLocalCartItems({});
            navigate('/collection');
            toast.success("Order Placed!");
          } else{
            navigate('/orders');
            toast.success("Order Placed!");
          }
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error('Error placing order. Please try again.');
      }
    };
    

  // Fetch guestCart from localStorage if user is not logged in
  useEffect(() => {
      if (!token) {
        const storedGuestCart = localStorage.getItem('guestCart');
        if (storedGuestCart) {
          setLocalCartItems(JSON.parse(storedGuestCart));
        }
      }
    }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'Delivery'} text2={'Information'}/>
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' name='firstName' value={formData.firstName} 
            onChange={handleInputChange} required/>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' name='lastName' value={formData.lastName} 
            onChange={handleInputChange} />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' name='email' value={formData.email} 
          onChange={handleInputChange}/>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Address' name='address' value={formData.address} 
          onChange={handleInputChange} required/>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' name='city' value={formData.city} 
            onChange={handleInputChange} required/>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' name='zipcode' value={formData.zipcode} 
            onChange={handleInputChange}/>
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="tel" placeholder='Phone' name='phone' value={formData.phone} 
          onChange={handleInputChange} required/>
        <textarea 
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full h-32 resize-none' 
          placeholder='Additional Information (e.g., special instructions)' name='info' value={formData.info}
          onChange={handleInputChange}>
        </textarea>
      </div>

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal/>
        </div>
        <div className='mt-12'>
          <Title text1={'Payment'} text2={'Method'}/>
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div className='flex items-center gap-3 border p-4 px-5 rounded-md bg-gray-50 cursor-not-allowed w-full'>
              <p className='text-gray-700 font-medium '>Cash on Delivery</p>
            </div>
          </div>
          <p className='text-sm text-gray-500 mt-2'>We currently only offer Cash on Delivery as a payment method.</p>
        </div>
        <div className='w-full text-end mt-8'>
          <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
        </div>

      </div>
    </form>
  )
}

export default PlaceOrder