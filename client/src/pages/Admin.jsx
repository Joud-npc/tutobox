import { useEffect, useState } from "react";
import { getAllTutorials, createTutorial, updateTutorial, deleteTutorial } from "../services/admin.service";

const EMPTY_FORM = {
  title: "",
  description: "",
  videoUrl: "",
  thumbnail: "",
  category: "",
  duration: "",
  published: false,
};

export default function Admin() {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = () => {
    setLoading(true);
    getAllTutorials()
      .then(setTutorials)
      .catch(() => setError("Impossible de charger les tutoriels."))
      .finally(() => setLoading(false));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleEdit = (tuto) => {
    setEditingId(tuto.id);
    setForm({
      title: tuto.title,
      description: tuto.description,
      videoUrl: tuto.videoUrl,
      thumbnail: tuto.thumbnail || "",
      category: tuto.category,
      duration: tuto.duration,
      published: tuto.published,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = { ...form, duration: parseInt(form.duration) };
      if (editingId) {
        await updateTutorial(editingId, payload);
      } else {
        await createTutorial(payload);
      }
      handleCancel();
      fetchTutorials();
    } catch {
      setError("Erreur lors de l'enregistrement.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer ce tutoriel ?")) return;
    try {
      await deleteTutorial(id);
      setTutorials((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">

      <h1 className="text-2xl font-bold">Administration</h1>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Formulaire création / édition */}
      <section className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? "Modifier le tutoriel" : "Ajouter un tutoriel"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="title" value={form.title} onChange={handleChange} placeholder="Titre" required
              className="bg-gray-700 rounded-lg px-3 py-2 text-sm w-full" />
            <input name="category" value={form.category} onChange={handleChange} placeholder="Catégorie" required
              className="bg-gray-700 rounded-lg px-3 py-2 text-sm w-full" />
            <input name="videoUrl" value={form.videoUrl} onChange={handleChange} placeholder="URL vidéo" required
              className="bg-gray-700 rounded-lg px-3 py-2 text-sm w-full" />
            <input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="URL thumbnail"
              className="bg-gray-700 rounded-lg px-3 py-2 text-sm w-full" />
            <input name="duration" value={form.duration} onChange={handleChange} placeholder="Durée (min)" type="number" required
              className="bg-gray-700 rounded-lg px-3 py-2 text-sm w-full" />
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input name="published" type="checkbox" checked={form.published} onChange={handleChange} className="accent-indigo-500" />
              Publié
            </label>
          </div>

          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={3} required
            className="bg-gray-700 rounded-lg px-3 py-2 text-sm w-full resize-none" />

          <div className="flex gap-3">
            <button type="submit" disabled={submitting}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition">
              {submitting ? "..." : editingId ? "Enregistrer" : "Créer"}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel}
                className="px-5 py-2 text-sm text-gray-400 hover:text-white transition">
                Annuler
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Liste */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Tutoriels ({tutorials.length})</h2>

        {loading && <p className="text-gray-400 text-sm">Chargement...</p>}

        <ul className="space-y-3">
          {tutorials.map((tuto) => (
            <li key={tuto.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg gap-4">
              <div className="min-w-0">
                <p className="font-medium truncate">{tuto.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{tuto.category} · {tuto.duration} min</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs px-2 py-0.5 rounded-full ${tuto.published ? "bg-green-800 text-green-300" : "bg-gray-700 text-gray-400"}`}>
                  {tuto.published ? "Publié" : "Brouillon"}
                </span>
                <button onClick={() => handleEdit(tuto)}
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition">
                  Modifier
                </button>
                <button onClick={() => handleDelete(tuto.id)}
                  className="text-sm text-red-400 hover:text-red-300 transition">
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}