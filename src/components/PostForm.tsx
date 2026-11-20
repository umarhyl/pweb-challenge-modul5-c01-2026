import { useState } from "react";
import type { CreatePostInput } from "../types/post";

interface PostFormProps {
  onSubmit: (input: CreatePostInput) => Promise<boolean>;
  isSubmitting: boolean;
}

export function PostForm({ onSubmit, isSubmitting }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Kelompok C01");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setValidationError("Judul post wajib diisi.");
      return;
    }

    setValidationError("");

    const isCreated = await onSubmit({
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
    });

    if (isCreated) {
      setTitle("");
      setContent("");
      setAuthor("Kelompok C01");
      setValidationError("");
    }
  };

  return (
    <form className="note-form post-form" onSubmit={handleSubmit}>
      <h3>Tambah Post Baru</h3>

      <div className="form-group">
        <label htmlFor="post-title">Judul Post</label>
        <input
          id="post-title"
          type="text"
          placeholder="Masukkan judul post..."
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            if (validationError) setValidationError("");
          }}
          disabled={isSubmitting}
          required
        />
        {validationError && (
          <p className="form-error" role="alert">
            {validationError}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="post-content">Isi Post</label>
        <textarea
          id="post-content"
          placeholder="Tuliskan isi post (opsional)..."
          rows={4}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="post-author">Penulis</label>
        <input
          id="post-author"
          type="text"
          placeholder="Nama penulis..."
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <button type="submit" className="btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "Menyimpan..." : "+ Simpan Post"}
      </button>
    </form>
  );
}
