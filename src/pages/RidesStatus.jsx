import React from 'react'

const RidesStatus = () => {
  return (
    <div className='bg-slate-800 h-[92vh] w-full py-1 px-8'>
        
        <h1 className='text-white text-2xl font-bold'>Rides I have Shared</h1>

        <div className='bg-slate-400 rounded-md p-4'>

            <div className='grid grid-cols-4 gap-4 text-xl mb-4 font-bold'>
                <div>
                    Locations
                </div>
                <div>
                    Accepted By
                </div>
                <div>
                    Departure Time
                </div>
                <div className='flex justify-end'>
                    Status
                </div>
            </div>

            <div className='flex flex-col gap-2  p-2 h-[30vh] max-h-[30vh] overflow-y-scroll scroll-hide'>

                <div className='grid grid-cols-4 gap-4 text-xl bg-slate-600 p-4 rounded-lg text-white'>

                    <div>
                        <div>From - Chandigarh</div>
                        <div>To - Dehradun</div>
                    </div>
                    <div>
                        Accepted/Not Accepted
                    </div>
                    <div>
                        4:00 pm
                    </div>
                    <div className='flex justify-end'>
                        Active/Pending/Completed
                    </div>

                </div>
                
            </div>

        </div>

        <h1 className='text-white text-2xl font-bold mt-2'>Rides I am Taking</h1>

        <div className='bg-slate-400 rounded-md p-4'>

            <div className='grid grid-cols-5 gap-4 text-xl mb-4 font-bold'>
                <div>
                    Locations
                </div>
                <div>
                    Accepted By
                </div>
                <div>
                    Departure Time
                </div>
                <div>
                    Cost
                </div>
                <div className='flex justify-end'>
                    Status
                </div>
            </div>

            <div className='flex flex-col gap-2  p-2 h-[30vh] max-h-[28vh] overflow-y-scroll scroll-hide'>

                <div className='grid grid-cols-5 gap-4 text-xl bg-slate-600 p-4 rounded-lg text-white'>

                    <div>
                        <div>From - Chandigarh</div>
                        <div>To - Dehradun</div>
                    </div>
                    <div>
                        Accepted/Not Accepted
                    </div>
                    <div>
                        3:00pm
                    </div>
                    <div>
                        349
                    </div>
                    <div className='flex justify-end'>
                        Active/Pending/Completed
                    </div>

                </div>
                
            </div>

        </div>

    </div>
  )
}

export default RidesStatus