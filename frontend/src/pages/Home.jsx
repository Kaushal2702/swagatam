// import React from 'react'
// import PolicePage from '../components/PolicePage'
// import Nav from '../components/Nav'
// export default function Home (){
//   const {userData}=useSelector((state)=>state.user)
//   return (
//     <div className='w-[100vw] min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9f6]'>
         
//          {userData.role==="user" && <UserDashboard/>}
//          {userData.role==="Emergency" && <TouristPage/>}
//          {userData.role==="Police" && <PolicePage/>}
         
      
//     </div>
//   )
// }

// export default Home

import React from 'react';
import { useSelector } from 'react-redux';   // ✅ Import useSelector
import Nav from '../components/Nav';          // ✅ Import Nav component
import Emergency from '../components/Emergency'; // ✅ Ensure these exist
import TouristPage from '../components/TouristPage';
import PolicePage from '../components/PolicePage';

export default function Home() {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="w-[100vw] min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9f6]">
      <Nav /> {/* ✅ Render the Nav component here */}
      
     
      {userData && userData.role === "user" && (
        <div className='w-[90%] max-w-7xl'>
          < TouristPage/>
            <Map height='400px'/>
            </div>
            )}
      {userData && userData.role === "Emergency" && <Emergency />}
      {userData && userData.role === "Police" && <PolicePage />}
    </div>
  );
}
