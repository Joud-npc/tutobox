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

  const getEmbedUrl = (url, preview = false) => {
    if (!url) return '';
    let videoId = null;
    if (url.includes('/embed/')) {
      videoId = url.split('/embed/')[1].split('?')[0];
    } else {
      const match = url.match(/[?&]v=([^&]+)/);
      if (match) videoId = match[1];
      const short = url.match(/youtu\.be\/([^?]+)/);
      if (short) videoId = short[1];
    }
    if (!videoId) return url;
    // Aperçu : démarre à 0 et s'arrête à 60 secondes
    if (preview) return `https://www.youtube.com/embed/${videoId}?start=0&end=60&autoplay=0`;
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Bouton retour */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition mb-6"
      >
        ← Retour à l'accueil
      </button>

      {/* Vidéo */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black mb-6">
        <iframe
          src={getEmbedUrl(tutorial.videoUrl, !user)}
          title={tutorial.title}
          className="w-full h-full"
          allowFullScreen
        />
        {/* Overlay si non connecté */}
        {!user && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
            <p className="text-white font-semibold text-lg mb-1">Aperçu limité</p>
            <p className="text-gray-300 text-sm mb-4">Connecte-toi pour voir la vidéo complète</p>
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition"
            >
              Se connecter
            </button>
          </div>
        )}
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

      <p className="mt-6 text-gray-300 leading-relaxed">{tutorial.description}</p>
    </div>
  );
}