import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Components/Home/Home'
import LogIn from './Components/LogIn/LogIn'
import NavBar from './Components/NavBar/NavBar'
import { AuthProvider } from './helpers/AuthContext'
import ShowcaseForm from './Components/Showcase/ShowcaseForm'
import ShowcaseList from './Components/Showcase/ShowcaseList'
import Profile from './Components/Profile/Profile'

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path='/showcaseForm' element={<ShowcaseForm />} />
            <Route path='/user/:userId/showcases' element={<ShowcaseList />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
