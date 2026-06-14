import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHistory } from "../services/tutorial.service";
import { deleteAccount } from "../services/user.service";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getHistory()
      .then(setHistory)
      .catch(() => setError("Impossible de charger l'historique."))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await deleteAccount();
      logoutUser();
      navigate("/");
    } catch {
      setError("Erreur lors de la suppression du compte.");
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">

      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition mb-2"
      >
        ← Retour à l'accueil
      </button>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Mon espace</h1>
        <p className="text-gray-400 text-sm mt-1">Connecté en tant que {user?.email}</p>
      </div>

      {/* Historique */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Tutoriels suivis</h2>

        {loading && <p className="text-gray-400 text-sm">Chargement...</p>}
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {!loading && history.length === 0 && (
          <p className="text-gray-500 text-sm">Aucun tutoriel suivi pour l'instant.</p>
        )}

        <ul className="space-y-3">
          {history.map((item) => (
            <li
              key={item.tutorialId}
              onClick={() => navigate(`/tutorials/${item.tutorialId}`)}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition"
            >
              <div>
                <p className="font-medium">{item.tutorial.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.tutorial.category}</p>
              </div>
              <div className="text-right">
                {item.completed && (
                  <span className="text-green-400 text-xs font-semibold">✓ Complété</span>
                )}
                <p className="text-xs text-gray-500 mt-0.5">
                  {new Date(item.watchedAt).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Désinscription */}
      <section className="border-t border-gray-700 pt-8">
        <h2 className="text-lg font-semibold text-red-400 mb-2">Zone dangereuse</h2>
        <p className="text-gray-400 text-sm mb-4">
          La suppression de ton compte est définitive. Tes données seront anonymisées (RGPD).
        </p>

        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className="px-4 py-2 border border-red-500 text-red-400 rounded-lg text-sm hover:bg-red-500 hover:text-white transition"
          >
            Supprimer mon compte
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-300">Tu es sûr ?</p>
            <button
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-semibold transition"
            >
              {deleting ? "Suppression..." : "Oui, supprimer"}
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition"
            >
              Annuler
            </button>
          </div>
        )}
      </section>

    </div>
  );
}