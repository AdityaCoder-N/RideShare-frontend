import React, { useEffect, useState } from 'react'
import img from '../assets/register-bg.jpg'

const SingleRequest=({name,userPhoto,dlPhoto,state,dlNumber,dob})=>{
    const host='http://localhost:3001'
    
    const convertPath=(path)=>{

        const normalizedPath = path.replace(/\\/g, '/');

        const finalPath = `${host}/${normalizedPath}`;

        return finalPath;

    }

    const finalUserPhoto = convertPath(userPhoto);
    const finaldlPhoto = convertPath(dlPhoto);

    const acceptRequest = async()=>{
        const response = await fetch(`${host}/admin/unverified-requests`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });

        const data =  await response.json()

    }

    return (
        <div className='bg-gray-400 rounded-md p-4 flex flex-col gap-2 h-[450px]'>

            <h3 className='text-lg font-bold'>Name - {name}</h3>
            <div className='flex gap-4 h-[60%] w-full'>

                <div className='w-[50%] h-full'>
                    <img src={finalUserPhoto} alt="" className='h-full w-full object-cover'/>
                    <div className='font-bold text-center mt-1'>User Photo</div>
                </div>
                <div className='w-[50%] h-full'>
                    <img src={finaldlPhoto} alt="" className='h-full w-full object-cover'/>
                    <div className='font-bold text-center mt-1'>Lisence Photo</div>
                </div>

            </div>

            <div className='mt-8 font-semibold'>User State - {state}</div>
            <div className='font-semibold'>User DL Number - {dlNumber}</div>
            <div className='font-semibold'>User DOB - {dob}</div>
            
            <button className='mt-4 py-2 px-4 w-full bg-slate-800 text-white rounded-md'>Accept Request</button>
        </div>

    )

}


const ViewRequests = () => {
    const host='http://localhost:3001'

    const [requests,setRequests] = useState([]);


    const fetchRequests=async()=>{
        const response = await fetch(`${host}/admin/unverified-requests`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });

        const data =  await response.json()
        console.log(data);
        setRequests(data);
    }

    useEffect(()=>{

        fetchRequests();
        
    
    },[])
  return (
    <div className='h-[92vh] w-[100%] p-4 bg-slate-800'>

        <h2 className='text-xl font-semibold text-white'>Viewing User's Verification Requests</h2>

        <div className='grid grid-cols-3 gap-4 gap-x-4 p-4 px-12 max-h-[80vh] overflow-y-scroll mt-4'>
        {
            requests.map((request)=>{

                return (
                    <SingleRequest name={request.name} userPhoto={request.profilePhotoUrl} dlPhoto={request.dlPhotoUrl} dlNumber={request.lisenceNumber} dob={request.dob} state={request.state} key={request._id}/>
                )

            })
        }
            
        </div>


    </div>
  )
}

export default ViewRequests