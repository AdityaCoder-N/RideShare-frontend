import React,{useState} from 'react'

import { AddressAutofill } from '@mapbox/search-js-react';

const CreateRide = () => {

    const [formData,setFormData] = useState({departureDate:'',departureTime:'',cost:'',seatsAvailable:''})
    const [source,setSource] = useState('');
    const [destination,setDestination] = useState('');

    const onSourceSelect = (feature) => {
    
        setSource(feature.place_name);
    };
    
    const onDestinationSelect = (feature) => {
    setDestination(feature.place_name);
    };

    const onchange=(e)=>{
        console.log(e.target.name)
        console.log(e.target.value)
        setFormData({...formData,[e.target.name]:e.target.value})
    }
  return (
    <div className='h-[92vh] flex justify-center items-center bg-image '>

        <form action="" className='bg-[rgba(255,255,255,0.28)] rounded-xl p-8 backdrop-blur-md '>
            <h2 className='text-4xl font-bold'>Create a Ride!</h2>
            <p className='text-lg mb-4'>Help other civillians reach their destination by sharing your ride.</p>

            <div className='flex flex-col gap-1 mt-6'>
                <label htmlFor="" className='font-semibold ml-1'>Source Location</label>
                <AddressAutofill accessToken="pk.eyJ1IjoiYWRpdHlhLTE3IiwiYSI6ImNscWM5aG42ZTAxMTUya3NhaWtxZTlmeGUifQ.xxZYdLlsK_dOvLig0Ynanw"
                onSelect={onSourceSelect}>
                <input
                    name="source" placeholder="Where will you start from?" type="text"
                    autoComplete="address-line1"
                    className='py-3 px-2 w-full rounded-xl outline-none bg-gray-300 placeholder:text-[#888888] placeholder:font-semibold placeholder:text-xl'
                    value={source}
                    onChange={(e)=>setSource(e.target.value)}
                />
                </AddressAutofill>
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Destination Location</label>
                <AddressAutofill accessToken="pk.eyJ1IjoiYWRpdHlhLTE3IiwiYSI6ImNscWM5aG42ZTAxMTUya3NhaWtxZTlmeGUifQ.xxZYdLlsK_dOvLig0Ynanw" onSelect={onDestinationSelect}>
                <input
                    name="destination" placeholder="Where to?" type="text"
                    autoComplete="address-line1"
                    className='py-3 px-2 w-full rounded-xl outline-none bg-gray-300 placeholder:text-[#888888] placeholder:font-semibold placeholder:text-xl'
                    value={destination}
                    onChange={(e)=>setDestination(e.target.value)}
                />
                </AddressAutofill>
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Departure Date</label>
                
                <input
                    name="departureDate" placeholder="Enter valid date" type="date"
                    className='py-3 px-2 w-full rounded-xl outline-none bg-gray-300 placeholder:text-[#888888] placeholder:font-semibold placeholder:text-xl'
                    value={formData.departureDate}
                    onChange={onchange}
                />
                
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Departure Time</label>
                
                <input
                    name="departureTime" placeholder="Enter valid Time" type="time"
                    className='py-3 px-2 w-full rounded-xl outline-none bg-gray-300 placeholder:text-[#888888] placeholder:font-semibold placeholder:text-xl'
                    value={formData.departureTime}
                    onChange={onchange}
                />
                
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Seats Available</label>
                
                <input
                    name="seatsAvailable" placeholder="Enter Number of seats available" type="number"
                    className='py-3 px-2 w-full rounded-xl outline-none bg-gray-300 placeholder:text-[#888888] placeholder:font-semibold placeholder:text-xl'
                    value={formData.seatsAvailable}
                    onChange={onchange}
                />
                
            </div>
            <div className='flex flex-col gap-1 mt-4 cursor-pointer'>
                
                <button
                    type='submit'
                    className='py-3 px-2 w-full rounded-xl outline-none bg-[#192e48] text-white hover:bg-[#0f1a27]'>
                        Submit</button>
                
            </div>


        </form>
        
    </div>
  )
}

export default CreateRide