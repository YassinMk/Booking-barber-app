
import { Route, Routes } from 'react-router-dom'
import './App.css'
import BookingPage from './pages/BookingPage'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashbord'
import ProtectedRoute from './guards/ProtectedRoute'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<BookingPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
