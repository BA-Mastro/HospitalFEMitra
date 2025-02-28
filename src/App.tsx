

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
          <Route path="/create-doctor" element={<CreateDoctor/>}/>
          <Route path="/create-department" element={<CreateDepartment/>}/>
          <Route path="/update-doctor/:id" element={<UpdateDoctor/>}/>
          <Route path="/update-department/:id" element={<UpdateDepartment/>}/>
      </Routes>
    </>
  )
}

export default App
