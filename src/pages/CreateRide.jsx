import React,{useState,useContext} from 'react'
import axios from 'axios';
import { AddressAutofill } from '@mapbox/search-js-react';
import { useNavigate } from 'react-router-dom';
import HostContext from '../context/HostContext';
const CreateRide = () => {
    
    const {host} = useContext(HostContext);
    const navigate = useNavigate();
    const mapToken='pk.eyJ1IjoiYWRpdHlhLTE3IiwiYSI6ImNscW0wZXB2NzJjZjkyaXRrNnJldnlmZmoifQ._mEj9WyWI7Q7O-gRZ_fRow'

    const [formData,setFormData] = useState({startDate:'',startTime:'',cost:'',seatsAvailable:'',vehichle:''})
    const [source,setSource] = useState('');
    const [destination,setDestination] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));


    const onSourceSelect = (feature) => {
        console.log(feature.place_name);
        setSource(feature.place_name);
    };
    
    const onDestinationSelect = (feature) => {
        setDestination(feature.place_name);
    };

    const onchange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const getCoordinates=async(location)=>{
        
        const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapToken}`)
        const data = await res.json();
        // console.log(data);
    
        const searched = data.features[0].center;
        // console.log("searched coordinates : ",searched)
        return searched
    }

    function calculateDistance(source, destination) {
        const [lon1, lat1] = source;
        const [lon2, lat2] = destination;
    
        const earthRadius = 6371; // Earth radius in kilometers
      
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
      
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      
        const distance = earthRadius * c; // Distance in kilometers
        // console.log(distance)
        return distance;
      }

    const onsubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Use Promise.all to wait for both asynchronous functions to complete
            const [sourceCoord, destinationCoord] = await Promise.all([
                getCoordinates(source),
                getCoordinates(destination)
            ]);
    
            const postedBy = user._id;
    
            const cost =Math.round(calculateDistance(sourceCoord,destinationCoord)*2.5);
    
            axios.post(`${host}/ride/create-ride`,
                { ...formData, sourceCoord, destinationCoord, postedBy,source,destination,cost }
            ).then((res)=>{
                if(res.data.success){
                    alert('Ride created Successfully');
                    console.log(res);
                    setFormData({startDate:'',startTime:'',cost:'',seatsAvailable:'',vehichle:''});
                    setDestination('')
                    setSource('')
                }
            }).catch((err)=>{
                alert(err.response.data.message)
            })
            
        } catch (error) {
            console.error('Error during submit:', error);
        }
    };

  return (
    <div className='h-[120vh] flex justify-center items-center bg-image '>

        <form action="" className='bg-[rgba(255,255,255,0.28)] rounded-xl p-8 backdrop-blur-md md:w-auto w-[90%] z-10' onSubmit={onsubmit}>
            <h2 className='text-4xl font-bold'>Create a Ride!</h2>
            <p className='text-lg mb-4'>Help other civillians reach their destination by sharing your ride.</p>

            <div className='flex flex-col gap-1 mt-6'>
                <label htmlFor="" className='font-semibold ml-1'>Source Location</label>
                <AddressAutofill accessToken={mapToken}
                onSelect={onSourceSelect}>
                <input
                    name="source" placeholder="Where will you start from?" type="text"
                    autoComplete="address-line1"
                    className='py-3 px-2 w-full rounded-xl outline-none bg-gray-300 placeholder:text-[#888888] placeholder:font-semibold placeholder:text-xl'
                    value={source}
                    onChange={(e)=>setSource(e.target.value)}
                    required
                />
                </AddressAutofill>
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Destination Location</label>
                <AddressAutofill accessToken={mapToken} onSelect={onDestinationSelect}>
                <input
                    name="destination" placeholder="Where to?" type="text"
                    autoComplete="address-line1"
                    className='py-3 px-2 w-full rounded-xl outline-none bg-gray-300 placeholder:text-[#888888] placeholder:font-semibold placeholder:text-xl'
                    value={destination}
                    onChange={(e)=>setDestination(e.target.value)}
                    required
                />
                </AddressAutofill>
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Departure Date</label>
                
                <input
                    name="startDate" placeholder="Enter valid date" type="date"
                    className='py-3 px-2 w-full rounded-xl outline-none bg-gray-300 placeholder:text-[#888888] placeholder:font-semibold placeholder:text-xl'
                    value={formData.startDate}
                    onChange={onchange}
                    required
                />
                
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Departure Time</label>
                
                <input
                    name="startTime" placeholder="Enter valid Time" type="time"
                    className='py-3 px-2 w-full rounded-xl outline-none bg-gray-300 placeholder:text-[#888888] placeholder:font-semibold placeholder:text-xl'
                    value={formData.startTime}
                    onChange={onchange}
                    required
                />
                
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Vehichle</label>
                
                <input
                    name="vehichle" placeholder="Enter the mode of transport" type="text"
                    className='py-3 px-2 w-full rounded-xl outline-none bg-gray-300 placeholder:text-[#888888] placeholder:font-semibold placeholder:text-xl'
                    value={formData.vehichle}
                    onChange={onchange}
                    required
                />
                
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Seats Available</label>
                
                <input
                    name="seatsAvailable" placeholder="Enter Number of seats available" type="number"
                    className='py-3 px-2 w-full rounded-xl outline-none bg-gray-300 placeholder:text-[#888888] placeholder:font-semibold placeholder:text-xl'
                    value={formData.seatsAvailable}
                    onChange={onchange}
                    required
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
