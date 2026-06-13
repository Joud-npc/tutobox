import { Link } from 'react-router-dom'

export default function TutorialCard({ tutorial }) {
  const formatDuration = (seconds) => {
    if (!seconds) return null
    const m = Math.floor(seconds / 60)
    const h = Math.floor(m / 60)
    return h > 0 ? `${h}h${m % 60}min` : `${m}min`
  }

  return (
    <Link
      to={`/tutorials/${tutorial.id}`}
      className="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-indigo-500 transition block"
    >
      {tutorial.thumbnail ? (
        <img
          src={tutorial.thumbnail}
          alt={tutorial.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
          <span className="text-gray-500 text-4xl">▶</span>
        </div>
      )}
      <div className="p-4">
        <span className="text-xs text-indigo-400 font-semibold uppercase">
          {tutorial.category}
        </span>
        <h3 className="text-white font-semibold mt-1 text-lg leading-snug">
          {tutorial.title}
        </h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">
          {tutorial.description}
        </p>
        {tutorial.duration && (
          <span className="text-gray-500 text-xs mt-2 block">
            ⏱ {formatDuration(tutorial.duration)}
          </span>
        )}
      </div>
    </Link>
  )
}