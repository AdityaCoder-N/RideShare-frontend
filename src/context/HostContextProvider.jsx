import React, { useState } from 'react'
import HostContext from './HostContext'

const HostContextProvider = ({children}) => {

    const [host,setHost] = useState('http://localhost:3001');
    
  return (
    <HostContext.Provider value={{host,setHost}}>
        {children}
    </HostContext.Provider>
  )
}

export default HostContextProvider