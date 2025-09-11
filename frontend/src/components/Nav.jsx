// import React, { useState } from 'react'
// import { FaSearch } from "react-icons/fa";
// import { CiLocationOn } from "react-icons/ci";
// import { MdAddCall } from "react-icons/md";
// import {useSelector} from 'react-redux'
// function Nav () {
//     const {userData}=useSelector(state=>state.user)
//     const [showInfo,setShowInfo]=useState(false)
//     const [showSearch,setShowSearch]=useState(false)
//   return (
//     <div className='w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible'>
//        <div className='w-[90%] h-[70px] bg-white shadow-x1 rounded-lg items-center gap-[20px] flex fixed top-[80px] left-[5%]'>
//         <div className='flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400'>
//           <CiLocationOn size={25} className=' text-[#ff4d2d]' />
//           <div className='w-[80%] truncate text-gray-600'>New Delhi</div>
//         </div>
//         <div className='w-[80%] flex items-center gap-[10px]'>
//           <FaSearch size={25} className='text-[#ff4d2d]' />
//           <input type="text" placeholder='Search where you want go' className='px-[10px] text-gray-700 outline-0 w-full' />
//         </div>
//       </div>
//           <h1 className='text-3xl font-bold mb-2 text-[#ff4d2d]'>Swagatam</h1>
      
//       <div className='flex items-center gap-4'>
//        <div className='relative cursor-pointer'>
//          <MdAddCall size={25} className='text-[#ff4d2d]' md:hidden  onclick={()=>setShow}/>
//          <span className='absolute right-[-9px] top-[-12px] text-[#ff4d2d]'>0</span>
//        </div>
//        <button className='hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium'>Status</button>
//        <div className='w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointet' onClick={()=>setShowInfo(prev=>!prev)}>
//           {userData?.fullName.slice(0,1)}
//        </div>
//         {showInfo && <div className='fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]'>
//           <div className='text-[17px] font-semibold'>Mohan Singh</div>
//           <div className='md:hidden text-[#ff4d2d] font-semibold cursor-pointer'>My Profile</div>
//           <div className='text-[#ff4d2d] font-semibold cursor-pointer'>Log Out</div>
//         </div> }
       
//        </div>
//     </div>
//   )
// }

// export default Nav
import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { MdAddCall } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import axios from 'axios'
import { serverURL } from '../App';

function Nav() {
  const { userData,city } = useSelector(state => state.user);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch,setShowSearch]=useState(false);
  const dispatch=useDispatch()
  const handleLogOut = async () => {
  try {
    const result = await axios.get(`${serverURL}api/auth/signout`, {
      withCredentials: true
    });
    dispatch(setUserData(null));
    console.log("Logged out successfully");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  return (
    <div className="w-full h-[80px] flex items-center justify-between gap-[20px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6]">
      
      <h1 className="text-3xl font-bold text-[#ff4d2d]">Swagatam</h1>

      {/* ✅ Search bar aligned in same line */}
      <div className="flex items-center w-[60%] bg-white shadow-xl rounded-lg px-4 h-[50px]">
        <div className="flex items-center w-[30%] overflow-hidden gap-[10px] border-r-[2px] border-gray-400 pr-4">
          <CiLocationOn size={25} className="text-[#ff4d2d]" />
          <div className="truncate text-gray-600">{city || 'Location Not available'}</div>
        </div>
        <div className="flex items-center w-[70%] gap-[10px] pl-4">
          <FaSearch size={25} className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="Search where you want go"
            className="text-gray-700 outline-0 w-full"
          />
        </div>
      </div>

      {/* ✅ Icons and user */}
      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer">
          <MdAddCall size={25} className="text-[#ff4d2d]" />
          <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d]">0</span>
        </div>
        <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium">
          Status
        </button>
        <div className='relative'>
        <div
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer"
          onClick={() => setShowInfo(prev => !prev)}
        >
          {userData?.fullName.slice(0, 1)}
        </div>

        {/* ✅ Dropdown info */}
        {showInfo && (
          <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
            <div className="text-[17px] font-semibold">Mohan Singh</div>
            <div className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer">My Profile</div>
            <div className="text-[#ff4d2d] font-semibold cursor-pointer" onClick={handleLogOut}>Log Out</div>
          </div>
        )}
        </div>
      </div>

    </div>
  );
}

export default Nav;
