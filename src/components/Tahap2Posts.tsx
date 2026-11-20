import { useEffect, useState } from "react";
import { createPost, deletePost, getPosts } from "../services/postService";
import type { CreatePostInput, Post } from "../types/post";
import { PostCard } from "./PostCard";
import { PostForm } from "./PostForm";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Terjadi kesalahan yang tidak diketahui";
}

export function Tahap2Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    let isCurrentRequest = true;

    const loadPosts = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        const data = await getPosts(search);
        if (isCurrentRequest) {
          setPosts(data);
        }
      } catch (requestError) {
        if (isCurrentRequest) {
          setLoadError(getErrorMessage(requestError));
          setPosts([]);
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    };

    void loadPosts();

    return () => {
      isCurrentRequest = false;
    };
  }, [search, retryCount]);

  const handleCreatePost = async (input: CreatePostInput) => {
    setIsSubmitting(true);
    setActionError("");

    try {
      const newPost = await createPost(input);
      setPosts((currentPosts) => [newPost, ...currentPosts]);
      return true;
    } catch (requestError) {
      setActionError(getErrorMessage(requestError));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    setDeletingId(id);
    setActionError("");

    try {
      await deletePost(id);
      setPosts((currentPosts) => currentPosts.filter((post) => post.id !== id));
    } catch (requestError) {
      setActionError(getErrorMessage(requestError));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="tahap-container">
      <div className="tahap-header">
        <h2>Tahap 2: Post dari REST API</h2>
        <p className="subtitle">
          Integrasi React dengan Express, Prisma, dan PostgreSQL melalui endpoint /api/posts.
        </p>
      </div>

      <div className="layout-grid">
        <div className="form-column">
          <PostForm onSubmit={handleCreatePost} isSubmitting={isSubmitting} />
        </div>

        <div className="list-column">
          <div className="search-box">
            <label htmlFor="post-search">Cari Post Berdasarkan Judul:</label>
            <input
              id="post-search"
              type="search"
              placeholder="Ketik judul yang ingin dicari..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="search-input"
            />
          </div>

          <div className="posts-meta">
            <span>
              Menampilkan <strong>{posts.length}</strong> post
            </span>
            {search && (
              <button className="btn-clear" onClick={() => setSearch("")}>
                Reset Pencarian
              </button>
            )}
          </div>

          {actionError && (
            <div className="api-error" role="alert">
              <strong>Operasi gagal.</strong>
              <span>{actionError}</span>
            </div>
          )}

          {isLoading ? (
            <div className="loading-state">Memuat post dari server...</div>
          ) : loadError ? (
            <div className="api-error api-error-panel" role="alert">
              <strong>Post gagal dimuat.</strong>
              <span>{loadError}</span>
              <button
                type="button"
                className="btn-retry"
                onClick={() => setRetryCount((count) => count + 1)}
              >
                Coba Lagi
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="empty-state">
              <p>
                {search
                  ? `Tidak ada post dengan judul "${search}".`
                  : "Belum ada post. Silakan tambahkan post baru di samping!"}
              </p>
            </div>
          ) : (
            <div className="posts-list">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDelete={handleDeletePost}
                  isDeleting={deletingId === post.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
