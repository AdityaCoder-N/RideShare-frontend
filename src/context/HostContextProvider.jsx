import React, { useState } from 'react'
import HostContext from './HostContext'

const HostContextProvider = ({children}) => {

    const [host,setHost] = useState('https://rideshare-backend-q0sr.onrender.com');
    
  return (
    <HostContext.Provider value={{host,setHost}}>
        {children}
    </HostContext.Provider>
  )
}

export default HostContextProvider