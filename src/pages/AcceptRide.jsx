import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import check from '../assets/check-circle-fill.svg'
import UserContext from '../context/UserContext'

const AcceptRide = () => {

    const navigate = useNavigate();
    const host='http://localhost:3001'
    const {id} = useParams();
    const token = Cookies.get('authToken')

    const [ride,setRide] = useState({});

    const {user} = useContext(UserContext)

    const getRide=async()=>{
        const response = await fetch(`${host}/ride/get-ride/${id}`,{
            method:'GET',
            headers:{
                'auth-token':token
            }
        })

        const data = await response.json();
        console.log(data);

        if(data.success){
            setRide(data.ride);
        }
        else{
            alert(data.message);
        }
    }

    useEffect(()=>{
        console.log(id)
        getRide();

    },[])

    const acceptRide = async()=>{

        console.log(JSON.stringify({
            rideId:id,
                userId:user._id
        }))
        axios.post(`${host}/ride/accept-ride`,
        {
            rideId: id,
            userId: user._id
          },
        {
        headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
        }
        }
        ).then((res)=>{
            console.log(res.data)
            alert('Ride accepted');
            alert('Changes will be reflected in Ride Status')
            navigate('/');
        }).catch((err)=>{
            alert(err.response.data.message)
        })

    }
    const cancel = async()=>{
        navigate('/');
    }
    
    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
      }
    return (
    <div className='bg-slate-800 h-[92vh] w-full p-8 px-32 flex justify-center items-center'>
        

        <div className='bg-slate-400 rounded-md p-8 font-semibold text-3xl w-[60%]'>

            <div className='flex items-center justify-between '>
                <div>
                    <div>Posted By - {ride.postedBy?.name}</div>
                    <div className='flex items-center gap-2 text-base mt-2'>
                        <p>Verified User with lisence</p>
                        <img src={check} alt="" className='h-[20px]'/>
                    </div>

                </div>
                <img src={ride.postedBy?.imageUrl} alt="" className='h-[100px] w-[100px] object-fit'/>
            </div>

            <div className='flex justify-between items-center mt-8 gap-4'>

                <div>
                    From - {ride.source}
                </div>
                <div>
                    To - {ride.destination}
                </div>

            </div>
            <div className='flex justify-between items-center mt-4 gap-4'>

                <div>
                    Departure Date - {formatDate(ride.startDate)}
                </div>
                <div>
                    Departure Time - {ride.startTime}
                </div>

            </div>
            <div className='mt-4'>
                Cost - {ride.cost} coins
            </div>
            <div className='mt-4'>
                Seats Available : {ride.seatsAvailable}
            </div>

            <div className='flex gap-2 mt-12 text-xl'>
                <button className='w-[50%] py-2 rouned-md bg-slate-600 hover:bg-slate-900 text-white' onClick={acceptRide}>Accept Ride</button>
                <button className='w-[50%] py-2 rouned-md bg-slate-600 hover:bg-slate-900 text-white' onClick={cancel} >Cancel</button>
            </div>

        </div>

    </div>
  )
}

export default AcceptRide