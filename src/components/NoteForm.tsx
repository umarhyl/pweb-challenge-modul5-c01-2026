import { useState } from "react";
import type { Note } from "../types/note";

interface NoteFormProps {
  onAddNote: (note: Note) => void;
}

export function NoteForm({ onAddNote }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Kuliah");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Judul dan isi catatan tidak boleh kosong!");
      return;
    }

    const newNote: Note = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      category,
    };

    onAddNote(newNote);

    // Reset controlled form state
    setTitle("");
    setContent("");
    setCategory("Kuliah");
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h3>Tambah Catatan Baru</h3>
      
      <div className="form-group">
        <label htmlFor="title">Judul Catatan</label>
        <input
          id="title"
          type="text"
          placeholder="Masukkan judul..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Kategori</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Kuliah">Kuliah</option>
          <option value="Praktikum">Praktikum</option>
          <option value="Tugas">Tugas</option>
          <option value="Pribadi">Pribadi</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="content">Isi Catatan</label>
        <textarea
          id="content"
          placeholder="Tuliskan isi catatan di sini..."
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn-primary">
        + Simpan Catatan
      </button>
    </form>
  );
}
