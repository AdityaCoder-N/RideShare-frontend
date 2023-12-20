import React,{useState} from 'react'
import sourceImg from '../assets/source.svg'
import dest from '../assets/destination.svg'
import { AddressAutofill } from '@mapbox/search-js-react';


const SearchRide = () => {

    const [source,setSource] = useState('');
    const [destination,setDestination] = useState('');

    const onsubmit = async(e)=>{
        e.preventDefault();
        console.log(source)
    }

    const onSourceSelect = (feature) => {
    
        setSource(feature.place_name);
    };
    
    const onDestinationSelect = (feature) => {
    setDestination(feature.place_name);
    };

  return (
    <form className='border-2 border-gray-400 rounded-xl p-4' onSubmit={onsubmit}>
        <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-semibold mb-2 ml-1'>Search Ride</h2>
            <span className='font-semibold'>Balance - 2342 coins</span>
        </div>
        <div className='relative mt-4'>
            <img src={sourceImg} alt="" className='absolute left-2 top-[50%] translate-y-[-50%]'/>
            <AddressAutofill accessToken="pk.eyJ1IjoiYWRpdHlhLTE3IiwiYSI6ImNscWM5aG42ZTAxMTUya3NhaWtxZTlmeGUifQ.xxZYdLlsK_dOvLig0Ynanw"
            onSelect={onSourceSelect}>
                <input
                    name="address" placeholder="Source Location" type="text"
                    autoComplete="address-line1"
                    className='py-3 px-2 pl-8 w-full rounded-xl outline-none bg-gray-300 placeholder:text-[#888888] placeholder:font-semibold placeholder:text-xl'
                    value={source}
                    onChange={(e)=>setSource(e.target.value)}
                />
            </AddressAutofill>
        </div>
        <div className='relative mt-4'>
            <img src={dest} alt="" className='absolute left-2 top-[50%] translate-y-[-50%]'/>
            <AddressAutofill accessToken="pk.eyJ1IjoiYWRpdHlhLTE3IiwiYSI6ImNscWM5aG42ZTAxMTUya3NhaWtxZTlmeGUifQ.xxZYdLlsK_dOvLig0Ynanw"
            onSelect={onDestinationSelect}>
                <input
                    name="address" placeholder="Destination Location" type="text"
                    autoComplete="address-line1"
                    className='py-3 px-2 pl-8 w-full rounded-xl outline-none bg-gray-300 placeholder:text-[#888888] placeholder:font-semibold placeholder:text-xl'
                    value={destination}
                    onChange={(e)=>setDestination(e.target.value)}
                />
            </AddressAutofill>
        </div>

        <button className='py-3 px-2 pl-8 w-full rounded-xl outline-none bg-black text-white mt-4 text-lg' type='submit'>Search</button>
        
    </form>
  )
}

export default SearchRide