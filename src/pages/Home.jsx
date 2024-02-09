import React, { useEffect, useState ,useContext} from 'react'
import Navbar from '../components/Navbar'
import SearchRide from '../components/SearchRide'
import MapSection from '../components/MapSection'
import AvailableRides from '../components/AvailableRides'

import HostContext from '../context/HostContext';

const Home = ({show,setShow}) => {


  const user = JSON.parse(localStorage.getItem('user'));
  const {host} = useContext(HostContext);
  const authToken = localStorage.getItem('authToken');
  const [startCoord,setStartCoord] = useState([0,0]);
  const [endCoord,setEndCoord] = useState([0,0]);

  const [rides,setRides] = useState([])
  const [balance,setBalance]=useState(0);


  const fetchUser = async()=>{
    const response = await fetch(`${host}/auth/getuser/${user._id}`,{
        method:'GET',
        headers:{
          "auth-token":authToken
        }
    })

    const data = await response.json();
    console.log("user in home : ",data);
    setBalance(data.user.balance);
  }

  useEffect(()=>{
    fetchUser();
   navigator.geolocation.getCurrentPosition((position)=>{
      let latitude=position.coords.latitude;
      let longitude=position.coords.longitude;

      let coords=[longitude,latitude];

      // console.log(coords)
      setStartCoord(coords);
      setEndCoord(coords);
    })
  },[])
  

  return (
    <div>
        <div className='flex md:flex-row flex-col items-center'>
            <div className='w-[90%] md:w-[30%] p-4'>
                {!show && <SearchRide setRides={setRides} show={show} balance={balance}/> }

                <AvailableRides setStartCoord={setStartCoord} setEndCoord={setEndCoord} rides={rides}/>
            </div>
            <div className='w-[90%] md:w-[70%] p-4 z-1'>
                {!show && <MapSection startCoord={startCoord} endCoord={endCoord}  show={show} />}
            </div>
        </div>
    </div>
  )
}

export default Home