import React, { useEffect } from 'react'
import axios from 'axios';
import { serverURL } from '../App';
function useGetCurrentUser ()  {
  
  useEffect(() => {
    const fetchUser=async()=>{
      try {
        const result=await axios.get(`${serverURL}/api/user/current`,{withCredentials:true})
          console.log(result)
      } catch (error) {
        console.log(error)
      }
         
    }
    fetchUser()
  }, [])
}

export default useGetCurrentUser
