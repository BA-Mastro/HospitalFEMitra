

import { ThemeProvider } from '@emotion/react'
import MyNavbar from './static/MyNavbar'
import theme from './static/theme'
import LandingPage from './static/LandingPage'
import { Routes, Route } from 'react-router-dom'
import DoctorIndex from './components/doctors/DoctorIndex'
import DepartmentIndex from './components/departments/DepartmentIndex'
import CreateDoctor from './components/doctors/CreateDoctor'
import CreateDepartment from './components/departments/CreateDepartment'
import UpdateDoctor from './components/doctors/UpdateDoctor'
import UpdateDepartment from './components/departments/UpdateDepartment'
import Register from './auth/Register'
import Login from './auth/login'
import ProtectedRoute from './auth/ProtectedRoute'


function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <MyNavbar/>
      </ThemeProvider>
      <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/doctor-index" element={<DoctorIndex/>}/>
          <Route path="/department-index" element={<DepartmentIndex/>}/>
          <Route path="/create-doctor" element={<ProtectedRoute><CreateDoctor/></ProtectedRoute>}/>
          <Route path="/create-department" element={<ProtectedRoute><CreateDepartment/></ProtectedRoute>}/>
          <Route path="/update-doctor/:id" element={<ProtectedRoute><UpdateDoctor/></ProtectedRoute>}/>
          <Route path="/update-department/:id" element={<ProtectedRoute><UpdateDepartment/></ProtectedRoute>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
