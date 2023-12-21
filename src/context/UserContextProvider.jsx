import React , {useEffect, useState} from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) =>{

    const [user,setUser] = useState(null)

    useEffect(()=>{

        const loggedUser = localStorage.getItem('user');
        if(loggedUser){
            const parsed = JSON.parse(loggedUser);
            setUser(parsed);
        }

    },[])

    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContextProvider