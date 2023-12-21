import React , {useEffect, useState} from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) =>{

    const [user,setUser] = useState(null)

    useEffect(()=>{

        const loggedUser = localStorage.getItem('user');
        if(loggedUser){
            setUser(loggedUser);
        }

    },[])

    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContextProvider