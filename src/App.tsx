

import { ThemeProvider } from '@emotion/react'
import MyNavbar from './static/MyNavbar'
import theme from './static/theme'
import LandingPage from './static/LandingPage'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <MyNavbar/>
      </ThemeProvider>
      <Routes>
          <Route path="/" element={<LandingPage/>}/>
      </Routes>
    </>
  )
}

export default App
