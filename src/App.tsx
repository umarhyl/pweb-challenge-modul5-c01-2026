import { useState } from "react";
import { Tahap1Notes } from "./components/Tahap1Notes";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState<"tahap1" | "tahap2">("tahap1");

  return (
    <div className="app-container">
      <header className="main-header">
        <div className="header-badge">Modul 5 Challenge • Web Programming 2026</div>
        <h1>Papan Catatan & Integrasi API</h1>
        <p className="header-desc">
          Implementasi React 19 + TypeScript (Vite) untuk state management & full-stack API integration.
        </p>

        {/* Tab Navigation */}
        <nav className="tab-navigation">
          <button
            className={`tab-button ${activeTab === "tahap1" ? "active" : ""}`}
            onClick={() => setActiveTab("tahap1")}
          >
            📋 Tahap 1: Catatan Lokal (State & LocalStorage)
          </button>
          <button
            className={`tab-button ${activeTab === "tahap2" ? "active" : ""}`}
            onClick={() => setActiveTab("tahap2")}
          >
            🌐 Tahap 2: REST API (Modul 4 Full-Stack)
          </button>
        </nav>
      </header>

      <main className="main-content">
        {activeTab === "tahap1" ? (
          <Tahap1Notes />
        ) : (
          <div className="tahap2-placeholder">
            <h2>Tahap 2: Hubungkan ke REST API Modul 4</h2>
            <p>
              Halaman ini disiapkan untuk integrasi endpoint <code>/api/posts</code> (Express + Neon).
            </p>
            <div className="placeholder-info">
              <h4>Fitur yang akan dijalankan pada Tahap 2:</h4>
              <ul>
                <li>Mengambil data (GET /api/posts) dengan status Loading & Error.</li>
                <li>Menambah data baru (POST /api/posts) tanpa reload halaman.</li>
                <li>Menghapus data (DELETE /api/posts/:id) dengan instant state update.</li>
                <li>Fitur filter pencarian via query <code>?search=...</code> ke backend.</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      <footer className="main-footer">
        <p>Praktikum Pemrograman Website 2026 • Modul 5</p>
      </footer>
    </div>
  );
}
