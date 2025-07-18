import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Navbar from './components/Navbar'
import RefreshHandler from './components/RefreshHandler'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  )
}

export default App
