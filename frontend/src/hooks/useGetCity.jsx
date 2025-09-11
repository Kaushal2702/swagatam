// import React,{useEffect} from 'react'
// // import {serverUrl} from '../App'
// import {  useDispatch } from 'react-redux'
// import { setUserData } from '../redux/userSlice'
// import axios from 'axios'


// function useGetCity(){
//    const Dispatch=useDispatch()
//    const apiKey=import.meta.env.VITE_GEOAPIKEY
//    useEffect(()=>{
//        navigator.geolocation.getCurrentPosition(async(position)=>{
//          console.log(position) 
//          const latitude=position.coords.latitude
//          const longitude=position.coords.longitude
//          const result=await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`)
//          console.log(result.data.results[0].city)
//        }) 
//    },[])
// }

// export default useGetCity
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUserData } from '../redux/userSlice';


function useGetCity() {
  const dispatch = useDispatch();
  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          console.log("Got position:", position);

          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`;
          const result = await axios.get(url);

          console.log("API response:", result.data);

          const city = result.data.results?.[0]?.city || "City not found";
          console.log("City:", city);
          dispatch(setCity(city));
        } catch (error) {
          console.error("Error fetching city data:", error);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  }, [dispatch, apiKey]);
}

export default useGetCity;
