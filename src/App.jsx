import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './assets/Components/Home/Home'
import LogIn from './assets/Components/LogIn/LogIn'
import SignUp from './assets/Components/SignUp/SignUp'
import NavBar from './assets/Components/NavBar/NavBar'
import { AuthProvider } from './assets/helpers/AuthContext'
import ShowcaseForm from './assets/Components/Showcase/ShowcaseForm'

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path='/showcaseForm' element={<ShowcaseForm />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
