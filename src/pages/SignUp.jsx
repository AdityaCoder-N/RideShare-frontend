import React,{useState,useContext} from 'react'
import img from '../assets/register-bg.jpg'
import UserContext from '../context/UserContext'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
const SignUp = () => {

    const host='http://localhost:3001'
    const {setUser} = useContext(UserContext)
    const [credentials,setCredentials] = useState({name:'',email:'',password:'',confirmPassword:''});

    const onchange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }

    const onsubmit=async(e)=>{
        e.preventDefault();

        if(credentials.password!==credentials.confirmPassword){
            alert('Passwords do not Match!');
            setCredentials({...credentials,password:'',confirmPassword:''})
            return;
        }

        console.log(credentials)

        const response = await fetch(`${host}/auth/register`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({...credentials})
        })
        const data = await response.json();
        console.log(data)
        setUser(data.user)
        Cookies.set('authToken',data.authToken);
        localStorage.setItem('user',data.user);
        setCredentials({name:'',email:'',password:'',confirmPassword:''})
    }

  return (
    <div className='h-[100vh] w-[100%] relative bg-[#2A4D77]'>
        <img src={img} alt="" className='absolute h-[100vh] w-[100%] object-cover top-0 left-0'/>

        <div className='absolute text-white left-[10%] top-[10%] w-[40%]'>
            <h1 className='text-[80px] font-bold ' >RideShare</h1>
            <p className='text-2xl font-semibold'>Hop on board! Sign up now for seamless rides and friendly journeys.</p>
        </div>
        <form className='p-8 w-[30%] bg-white rounded-xl z-50 absolute right-[10%] top-[50%] translate-y-[-50%]' onSubmit={onsubmit}>

            <h2 className='font-bold text-3xl'>Register Today</h2>
            <p className='mb-8 mt-2 text-gray-500 font-semibold'>Ready for the ride of a lifetime? Register now and let the journey begin! </p>

            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Name</label>
                <input type="text" name='name' value={credentials.name} placeholder='As per Govt. ID' className='w-full p-2 outline-none rounded-xl border-gray-500 border-2' onChange={onchange} required/>
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Email</label>
                <input type="email" name='email' value={credentials.email} placeholder='username@gmail.com' className='w-full p-2 outline-none rounded-xl border-gray-500 border-2' onChange={onchange} required/>
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Password</label>
                <input type="password" name='password' value={credentials.password} placeholder='**********' className='w-full p-2 outline-none rounded-xl border-gray-500 border-2' onChange={onchange} required/>
            </div>
            <div className='flex flex-col gap-1 mt-2'>
                <label htmlFor="" className='font-semibold ml-1'>Confirm Password</label>
                <input type="password" name='confirmPassword' value={credentials.confirmPassword} placeholder='**********' className='w-full p-2 outline-none rounded-xl border-gray-500 border-2' onChange={onchange} required/>
            </div>

            <button className='bg-[#214264] hover:bg-[#19314a] cursor-pointer text-white py-2 text-lg w-full rounded-xl mt-6' type='submit'>Register</button>
            <p className='mt-2'> Already Registered? <Link to='/login' className='font-semibold'>Login here</Link> </p>
        </form>
    </div>
  )
}

export default SignUp