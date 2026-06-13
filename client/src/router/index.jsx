import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import TutorialDetail from '../pages/TutorialDetail.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Admin from '../pages/Admin.jsx'
import Social from '../pages/Social.jsx'
import NotFound from '../pages/NotFound.jsx'

// Route accessible uniquement si connecté
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div>Chargement...</div>
  return user ? children : <Navigate to="/login" />
}

// Route accessible uniquement si admin
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div>Chargement...</div>
  if (!user) return <Navigate to="/login" />
  if (user.role !== 'ADMIN') return <Navigate to="/" />
  return children
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tutorials/:id" element={<TutorialDetail />} />
        <Route path="/social" element={<Social />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute><Dashboard /></PrivateRoute>}
        />
        <Route
          path="/admin"
          element={<AdminRoute><Admin /></AdminRoute>}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}