// import React from 'react'
// import { Navigate, Route,Routes } from 'react-router-dom'
// import SignUp from './pages/SignUp'
// import SignIn from './pages/SignIn'
// import ForgotPassword from './pages/forgotPassword'
// import useGetCurrentUser from './hooks/useGetCurrentUser'
// import { useSelector } from 'react-redux'
// export const serverURL="http://localhost:8000"
// function App () {
  
//   const {userData}=useSelector((state)=>state.user)
//   useGetCurrentUser()
//   if(loading){
//     return <div>Loading....</div>
//   }
//   return (
//       <Routes>
//         <Route path='/signUp' element={!userData?<SignUp/>:<Navigate to={"/"}/>}/>
//         <Route path='/signIn' element={!userData?<SignIn/>:<Navigate to={"/"}/>}/>
//         <Route path='/forgot-password' element={<ForgotPassword/>}/>
//         <Route path='/' element={userData?<Home/>:<Navigate to={"/signin"}/>}/>
        
//       </Routes>
    
//   )
// }

// export default App
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home'; // Make sure you import Home
import useGetCurrentUser from './hooks/useGetCurrentUser';
import { useSelector } from 'react-redux';
import useGetCity from './hooks/useGetCity';

export const serverURL = "http://localhost:8000";

function App() {
  const { userData, loading } = useSelector((state) => state.user);
  useGetCurrentUser(); // This hook fetches user data and updates Redux
  useGetCity()
  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <Routes>
      <Route path='/signUp' element={!userData ? <SignUp /> : <Navigate to="/" />} />
      <Route path='/signIn' element={!userData ? <SignIn /> : <Navigate to="/" />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      {/* <Route path='/' element={userData ? <Home /> : <Navigate to="/signIn" />} /> */}
       <Route path='/' element={ <Home/>} />
    </Routes>
  );
}

export default App;
