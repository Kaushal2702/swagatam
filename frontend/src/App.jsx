import React from 'react'
import { Route,Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/forgotPassword'
export const serverURL="http://localhost:8000"
function App () {
  return (
      <Routes>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/signIn' element={<SignIn/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        
      </Routes>
    
  )
}

export default App
