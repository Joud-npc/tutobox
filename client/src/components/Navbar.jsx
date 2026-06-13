import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    navigate('/')
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-indigo-400">
        TutoBox
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/" className="hover:text-indigo-400 transition">
          Accueil
        </Link>
        <Link to="/social" className="hover:text-indigo-400 transition">
          Communauté
        </Link>

        {!user ? (
          <>
            <Link
              to="/login"
              className="hover:text-indigo-400 transition"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg transition"
            >
              S'inscrire
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="hover:text-indigo-400 transition"
            >
              Mon espace
            </Link>
            {user.role === 'ADMIN' && (
              <Link
                to="/admin"
                className="hover:text-indigo-400 transition"
              >
                Admin
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
            >
              Déconnexion
            </button>
          </>
        )}
      </div>
    </nav>
  )
}