import { useState, useEffect } from 'react'
import { getTutorials } from '../services/tutorial.service.js'
import Navbar from '../components/Navbar.jsx'
import TutorialCard from '../components/TutorialCard.jsx'

export default function Home() {
  const [tutorials, setTutorials] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')
  const [error, setError] = useState(null)

  const categories = ['React', 'Node.js', 'JavaScript', 'CSS', 'Python']

  useEffect(() => {
    setLoading(true)
    getTutorials(category)
      .then((data) => setTutorials(data.tutorials))
      .catch(() => setError('Impossible de charger les tutoriels'))
      .finally(() => setLoading(false))
  }, [category])

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      {/* Hero */}
      <div className="text-center py-20 px-4">
        <h1 className="text-5xl font-bold text-white mb-4">
          Apprends le <span className="text-indigo-400">développement web</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-xl mx-auto">
          Des tutoriels vidéo gratuits pour progresser à ton rythme.
        </p>
      </div>

      {/* Filtres catégories */}
      <div className="flex gap-3 justify-center flex-wrap px-4 mb-10">
        <button
          onClick={() => setCategory('')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            category === ''
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Tous
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              category === cat
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grille tutoriels */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        {loading && (
          <p className="text-center text-gray-400">Chargement...</p>
        )}
        {error && (
          <p className="text-center text-red-400">{error}</p>
        )}
        {!loading && tutorials.length === 0 && (
          <p className="text-center text-gray-500">
            Aucun tutoriel disponible pour le moment.
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tuto) => (
            <TutorialCard key={tuto.id} tutorial={tuto} />
          ))}
        </div>
      </div>
    </div>
  )
}