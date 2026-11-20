import { useState } from "react";
import type { Note } from "../types/note";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { NoteForm } from "./NoteForm";
import { NoteCard } from "./NoteCard";

export function Tahap1Notes() {
  // Simpan data catatan ke localStorage (otomatis dimuat saat mount & disimpan saat berubah)
  const [notes, setNotes] = useLocalStorage<Note[]>("notes_storage_modul5", [
    {
      id: "1",
      title: "Review Materi Modul 5",
      content: "Pelajari state, props, useEffect, dan controlled components di React.",
      category: "Praktikum",
    },
    {
      id: "2",
      title: "Tugas Pengantar AI",
      content: "Mengerjakan laporan eksperimen model klasifikasi.",
      category: "Tugas",
    },
  ]);

  // State untuk controlled input pencarian judul
  const [searchTerm, setSearchTerm] = useState("");

  // Handler menambah catatan baru (immutable update)
  const handleAddNote = (newNote: Note) => {
    setNotes([newNote, ...notes]);
  };

  // Handler menghapus catatan berdasarkan id
  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Filter catatan berdasarkan judul (.filter())
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  return (
    <div className="tahap-container">
      <div className="tahap-header">
        <h2>Tahap 1: Papan Catatan Lokal</h2>
        <p className="subtitle">
          Manajemen state, controlled component, props, filter, dan persistensi localStorage.
        </p>
      </div>

      <div className="layout-grid">
        {/* Kolom Kiri: Form Tambah Catatan */}
        <div className="form-column">
          <NoteForm onAddNote={handleAddNote} />
        </div>

        {/* Kolom Kanan: Pencarian dan Daftar Catatan */}
        <div className="list-column">
          <div className="search-box">
            <label htmlFor="search">Cari Catatan Berdasarkan Judul:</label>
            <input
              id="search"
              type="text"
              placeholder="Ketik judul yang ingin dicari..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="notes-meta">
            <span>
              Menampilkan <strong>{filteredNotes.length}</strong> dari{" "}
              <strong>{notes.length}</strong> catatan
            </span>
            {searchTerm && (
              <button className="btn-clear" onClick={() => setSearchTerm("")}>
                Reset Filter
              </button>
            )}
          </div>

          <div className="notes-list">
            {filteredNotes.length === 0 ? (
              <div className="empty-state">
                <p>
                  {searchTerm
                    ? `Tidak ada catatan dengan judul "${searchTerm}".`
                    : "Belum ada catatan tersimpan. Silakan tambah catatan baru di samping!"}
                </p>
              </div>
            ) : (
              filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onDelete={handleDeleteNote}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
