export interface Post {
  id: number;
  title: string;
  content: string | null;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostInput {
  title: string;
  content?: string;
  author?: string;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data?: T;
}
