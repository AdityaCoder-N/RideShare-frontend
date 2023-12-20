import React from 'react'
import close from '../assets/x-circle-fill.svg'

const AcceptRideModal = ({setAccept}) => {
  return (
    <div className='fixed w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.6)] flex top-0 left-0 justify-center items-center z-999'>
        <img src={close} alt="" className='absolute right-[5%] top-[5%] cursor-pointer z-50 h-[25px] w-[25px]' onClick={()=>setAccept(false)}/>

        <div className='bg-white rounded-xl p-4'>
            <h2>Accept this ride?</h2>

            <div>Rider - Aditya </div>
            <div className='flex justify-between items-center'>
                <div>
                    From - dehradun asda asd asdasd
                </div>
                <div>
                    To - Mussorie , asd as da sd ad
                </div>
            </div>

           

            <button className='bg-black text-white rounded-xl py-2 w-full mt-3 cursor-pointer'>Accept Ride</button>
        </div>
        
    </div>
  )
}

export default AcceptRideModal