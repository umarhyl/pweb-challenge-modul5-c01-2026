import type { ApiResponse, CreatePostInput, Post } from "../types/post";

const API_BASE_URL = "http://localhost:3000/api";

async function readResponse<T>(response: Response): Promise<T> {
  let json: ApiResponse<T>;

  try {
    json = (await response.json()) as ApiResponse<T>;
  } catch {
    throw new Error(`Server mengembalikan respons yang tidak valid (HTTP ${response.status}).`);
  }

  if (!response.ok || !json.status) {
    throw new Error(json.message || "Request ke server gagal");
  }

  if (json.data === undefined) {
    throw new Error("Respons server tidak memiliki data yang dibutuhkan.");
  }

  return json.data;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, options);
    return await readResponse<T>(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Tidak dapat terhubung ke server. Pastikan backend berjalan di http://localhost:3000.",
      );
    }

    throw error;
  }
}

export async function getPosts(search = ""): Promise<Post[]> {
  const query = new URLSearchParams();
  if (search.trim()) {
    query.set("search", search.trim());
  }

  const queryString = query.toString();
  return request<Post[]>(`/posts${queryString ? `?${queryString}` : ""}`);
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  return request<Post>("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
}

export async function deletePost(id: number): Promise<Post> {
  return request<Post>(`/posts/${id}`, {
    method: "DELETE",
  });
}
