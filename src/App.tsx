import { useState } from "react";
import { Tahap1Notes } from "./components/Tahap1Notes";
import { Tahap2Posts } from "./components/Tahap2Posts";
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
          <Tahap2Posts />
        )}
      </main>

      <footer className="main-footer">
        <p>Praktikum Pemrograman Website 2026 • Modul 5</p>
      </footer>
    </div>
  );
}
