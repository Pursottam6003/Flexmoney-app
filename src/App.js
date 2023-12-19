import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LayoutComponent from './Components/layout/LayoutComponent'
import UserProvider from "./Components/contexts/user";

import Login from './Components/Auth/Login'
import SignUp from './Components/Auth/SignUp'

import Home from './Pages/Home/Home'
import EnrolmentForm from './Pages/Form/EnrolmentForm';
import ProtectedComponent from './Components/ProtectedComponents/ProtectecComponents';
import Profile from './Pages/Profile/Profile'
import Payment from './Pages/Payment/Payment'

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <LayoutComponent>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/enroll" element={<ProtectedComponent children={<EnrolmentForm />} />} />
              <Route path="/payment" element={<ProtectedComponent children={<Payment />} />} />
            </Routes>
          </LayoutComponent>
        </UserProvider>
      </BrowserRouter>

    </>
  )
}

export default App
