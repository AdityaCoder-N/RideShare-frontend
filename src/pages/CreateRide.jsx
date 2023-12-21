import React,{useState,useContext} from 'react'
import axios from 'axios';
import { AddressAutofill } from '@mapbox/search-js-react';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
const CreateRide = () => {
    
    const navigate = useNavigate();
    const token='pk.eyJ1IjoiYWRpdHlhLTE3IiwiYSI6ImNscWM5aG42ZTAxMTUya3NhaWtxZTlmeGUifQ.xxZYdLlsK_dOvLig0Ynanw'

    const [formData,setFormData] = useState({startDate:'',startTime:'',cost:'',seatsAvailable:''})
    const [source,setSource] = useState('');
    const [destination,setDestination] = useState('');

    const {user} = useContext(UserContext)

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

    const getCoordinates=async(location)=>{
        
        const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${token}`)
        const data = await res.json();
        // console.log(data);
    
        const searched = data.features[0].center;
        // console.log("searched coordinates : ",searched)
        return searched
    }

    const host='http://localhost:3001'

    const onsubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Use Promise.all to wait for both asynchronous functions to complete
            const [sourceCoord, destinationCoord] = await Promise.all([
                getCoordinates(source),
                getCoordinates(destination)
            ]);
    
            const postedBy = user._id;
    
            console.log(sourceCoord, destinationCoord);
    
            axios.post(`${host}/ride/create-ride`,
                { ...formData, sourceCoord, destinationCoord, postedBy,source,destination }
            ).then((res)=>{
                if(res.data.success){
                    alert('Ride created Successfully');
                    console.log(res);
                    navigate('/create-ride');
                }
            }).catch((err)=>{
                alert(err.response.data.message)
            })
            
        } catch (error) {
            console.error('Error during submit:', error);
        }
    };

  return (
    <div className='h-[92vh] flex justify-center items-center bg-image '>

        <form action="" className='bg-[rgba(255,255,255,0.28)] rounded-xl p-8 backdrop-blur-md ' onSubmit={onsubmit}>
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
                    name="startDate" placeholder="Enter valid date" type="date"
                    className='py-3 px-2 w-full rounded-xl outline-none bg-gray-300 placeholder:text-[#888888] placeholder:font-semibold placeholder:text-xl'
                    value={formData.startDate}
                    onChange={onchange}
                />
                
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Departure Time</label>
                
                <input
                    name="startTime" placeholder="Enter valid Time" type="time"
                    className='py-3 px-2 w-full rounded-xl outline-none bg-gray-300 placeholder:text-[#888888] placeholder:font-semibold placeholder:text-xl'
                    value={formData.startTime}
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