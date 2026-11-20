import type { Note } from "../types/note";

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onDelete }: NoteCardProps) {
  return (
    <div className="note-card">
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <span className="note-category">{note.category}</span>
      </div>
      <p className="note-content">{note.content}</p>
      <div className="note-footer">
        <button
          className="btn-delete"
          onClick={() => onDelete(note.id)}
          title="Hapus catatan"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
