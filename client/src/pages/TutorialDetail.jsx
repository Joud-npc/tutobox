import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTutorialById, markProgress } from "../services/tutorial.service";
import { useAuth } from "../context/AuthContext";

export default function TutorialDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marked, setMarked] = useState(false);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    getTutorialById(id)
      .then((data) => setTutorial(data))
      .catch(() => setError("Tutoriel introuvable."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleMarkProgress = async () => {
    if (!user) return navigate("/login");
    setMarking(true);
    try {
      await markProgress(id);
      setMarked(true);
    } catch {
      setError("Erreur lors de la mise à jour.");
    } finally {
      setMarking(false);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-400">Chargement...</p>;
  if (error)   return <p className="text-center mt-10 text-red-400">{error}</p>;

  const getEmbedUrl = (url) => {
  if (!url) return ''
  // Déjà une URL embed
  if (url.includes('/embed/')) return url
  // URL classique youtube.com/watch?v=XXX
  const match = url.match(/[?&]v=([^&]+)/)
  if (match) return `https://www.youtube.com/embed/${match[1]}`
  // URL courte youtu.be/XXX
  const short = url.match(/youtu\.be\/([^?]+)/)
  if (short) return `https://www.youtube.com/embed/${short[1]}`
  return url
}

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Vidéo */}
      <div className="aspect-video w-full rounded-xl overflow-hidden bg-black mb-6">
        <iframe
          src={getEmbedUrl(tutorial.videoUrl)}
          title={tutorial.title}
          className="w-full h-full"
          allowFullScreen
        />
      </div>

      {/* Infos */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
            {tutorial.category}
          </span>
          <h1 className="text-2xl font-bold mt-1">{tutorial.title}</h1>
          <p className="text-gray-400 text-sm mt-1">{tutorial.duration} min</p>
        </div>

        {/* Bouton marquer comme vu */}
        <button
          onClick={handleMarkProgress}
          disabled={marked || marking}
          className={`px-5 py-2 rounded-lg font-semibold transition text-sm
            ${marked
              ? "bg-green-600 cursor-default text-white"
              : "bg-indigo-600 hover:bg-indigo-500 text-white"
            }`}
        >
          {marked ? "✓ Marqué comme vu" : marking ? "..." : "Marquer comme vu"}
        </button>
      </div>

      {/* Description */}
      <p className="mt-6 text-gray-300 leading-relaxed">{tutorial.description}</p>
    </div>
  );
}