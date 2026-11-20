import type { Post } from "../types/post";

interface PostCardProps {
  post: Post;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

export function PostCard({ post, onDelete, isDeleting }: PostCardProps) {
  const createdAt = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(post.createdAt));

  return (
    <article className="note-card post-card">
      <div className="note-header">
        <h3 className="note-title">{post.title}</h3>
        <span className="post-author">{post.author}</span>
      </div>
      {post.content && <p className="note-content">{post.content}</p>}
      <div className="post-footer">
        <time dateTime={post.createdAt}>{createdAt}</time>
        <button
          type="button"
          className="btn-delete"
          onClick={() => onDelete(post.id)}
          disabled={isDeleting}
        >
          {isDeleting ? "Menghapus..." : "Hapus"}
        </button>
      </div>
    </article>
  );
}
