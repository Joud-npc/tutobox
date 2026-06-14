import { useState } from "react";
import { CHARTE } from "../data/charte";
import { CALENDRIER } from "../data/calendrier";
import { PUBLICATIONS } from "../data/publications";
import { useNavigate } from "react-router-dom"; 

const TYPE_COLORS = {
  "Tutoriel long": "bg-indigo-800 text-indigo-200",
  "Short":         "bg-pink-800 text-pink-200",
  "Récap":         "bg-yellow-800 text-yellow-200",
  "Visuelle":      "bg-teal-800 text-teal-200",
};

export default function Social() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("charte");
  const [openPub, setOpenPub] = useState(null);

  const tabs = [
    { id: "charte",       label: "Charte éditoriale" },
    { id: "calendrier",   label: "Calendrier" },
    { id: "publications", label: "4 Publications" },
  ];

  

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition mb-6"
      >
        ← Retour à l'accueil
      </button>
      <h1 className="text-2xl font-bold mb-1">Stratégie réseaux sociaux</h1>
      <p className="text-gray-400 text-sm mb-6">
        Réseau choisi : <span className="text-red-400 font-semibold">YouTube</span>
      </p>

      <div className="flex gap-2 mb-8 border-b border-gray-700 pb-2">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition
              ${activeTab === tab.id ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "charte" && <CharteTab />}
      {activeTab === "calendrier" && <CalendrierTab />}
      {activeTab === "publications" && <PublicationsTab openPub={openPub} setOpenPub={setOpenPub} />}
    </div>
  );
}

function CharteTab() {
  return (
    <div className="space-y-6">
      <Block titre="Identité">
        <Row label="Nom"       value={CHARTE.nom} />
        <Row label="Réseau"    value={CHARTE.reseau} />
        <Row label="Cible"     value={CHARTE.cible} />
        <Row label="Ton"       value={CHARTE.ton} />
        <Row label="Fréquence" value={CHARTE.frequence} />
      </Block>
      <Block titre="Formats">
        <ul className="space-y-1">
          {CHARTE.formats.map((f) => <li key={f} className="text-sm text-gray-300">— {f}</li>)}
        </ul>
      </Block>
      <Block titre="Thèmes">
        <div className="flex flex-wrap gap-2">
          {CHARTE.themes.map((t) => (
            <span key={t} className="bg-indigo-800 text-indigo-200 text-xs px-3 py-1 rounded-full">{t}</span>
          ))}
        </div>
      </Block>
      <Block titre="Justification du choix de YouTube">
        <p className="text-sm text-gray-300 leading-relaxed">{CHARTE.justification}</p>
      </Block>
    </div>
  );
}

function CalendrierTab() {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-400 mb-4">30 publications · 15 semaines · 2 par semaine</p>
      {CALENDRIER.map((pub) => (
        <div key={pub.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xs text-gray-500 w-6 shrink-0">#{pub.id}</span>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{pub.titre}</p>
              <p className="text-xs text-gray-500">Semaine {pub.semaine} · {pub.jour}</p>
            </div>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${TYPE_COLORS[pub.type] || "bg-gray-700 text-gray-300"}`}>
            {pub.type}
          </span>
        </div>
      ))}
    </div>
  );
}

function PublicationsTab({ openPub, setOpenPub }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-400 mb-4">4 publications détaillées avec maquette, script, visuel et justification.</p>
      {PUBLICATIONS.map((pub) => (
        <div key={pub.id} className="bg-gray-800 rounded-xl overflow-hidden">
          <button onClick={() => setOpenPub(openPub === pub.id ? null : pub.id)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-700 transition">
            <div>
              <span className={`text-xs px-2 py-0.5 rounded-full mr-2 ${TYPE_COLORS[pub.format]}`}>{pub.format}</span>
              <span className="font-medium text-sm">{pub.titre}</span>
            </div>
            <span className="text-gray-400 text-sm">{openPub === pub.id ? "▲" : "▼"}</span>
          </button>
          {openPub === pub.id && (
            <div className="px-4 pb-5 space-y-4 border-t border-gray-700 pt-4">
              <Detail label="Description"           value={pub.description} />
              <Detail label="Durée"                 value={pub.duree} />
              <Detail label="Script / contenu texte" value={pub.contenuTextuel} pre />
              <Detail label="Contenu visuel"        value={pub.contenuVisuel} />
              <Detail label="Maquette"              value={pub.maquette} />
              <Detail label="Justification"         value={pub.justification} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Block({ titre, children }) {
  return (
    <div className="bg-gray-800 rounded-xl p-5">
      <h3 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3">{titre}</h3>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex gap-2 text-sm py-1.5 border-b border-gray-700 last:border-0">
      <span className="text-gray-400 w-24 shrink-0">{label}</span>
      <span className="text-gray-200">{value}</span>
    </div>
  );
}

function Detail({ label, value, pre }) {
  return (
    <div>
      <p className="text-xs text-indigo-400 uppercase tracking-wider mb-1">{label}</p>
      {pre
        ? <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">{value}</pre>
        : <p className="text-sm text-gray-300 leading-relaxed">{value}</p>
      }
    </div>
  );
}