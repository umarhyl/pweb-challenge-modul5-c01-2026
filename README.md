# Challenge Modul 5: React dan Integrasi REST API

Proyek ini merupakan pengerjaan Challenge Modul 5 Praktikum Pemrograman Website 2026 menggunakan Vite, React, dan TypeScript. Aplikasi terdiri dari dua tahap: papan catatan lokal dan integrasi full-stack dengan REST API Modul 4.

## Pemenuhan Soal

### Tahap 1: Aplikasi Papan Catatan Lokal

| Ketentuan | Implementasi |
| --- | --- |
| Interface `Note` berisi `id`, `title`, `content`, dan `category` | `src/types/note.ts` |
| Controlled form untuk menambah catatan | `src/components/NoteForm.tsx` |
| Komponen kartu menerima props dan tombol hapus | `src/components/NoteCard.tsx` |
| Pencarian berdasarkan judul menggunakan `.filter()` | `src/components/Tahap1Notes.tsx` |
| Data tetap tersimpan setelah refresh | `src/hooks/useLocalStorage.ts` menggunakan `localStorage` dan `useEffect` |

### Tahap 2: Integrasi REST API Modul 4

| Ketentuan | Implementasi |
| --- | --- |
| Mengambil daftar post dari `GET /api/posts` | `src/services/postService.ts` dan `src/components/Tahap2Posts.tsx` |
| Tampilan loading dan pesan error | `src/components/Tahap2Posts.tsx` |
| Controlled form untuk `POST /api/posts` | `src/components/PostForm.tsx` |
| Tombol hapus untuk `DELETE /api/posts/:id` | `src/components/PostCard.tsx` |
| State UI langsung berubah tanpa refresh | Handler create dan delete di `src/components/Tahap2Posts.tsx` |
| Bonus pencarian `?search=...` melalui `useEffect` | `src/components/Tahap2Posts.tsx` dan `src/services/postService.ts` |

## Error Handling

Aplikasi menangani beberapa kondisi berikut:

- backend tidak aktif atau tidak dapat dihubungi;
- respons HTTP gagal seperti 400, 404, atau 500;
- respons server bukan JSON atau tidak memiliki data yang diperlukan;
- judul post kosong pada controlled form;
- kegagalan menambah dan menghapus post;
- pencarian tanpa hasil sebagai empty state, bukan error;
- pengambilan data yang gagal dengan tombol **Coba Lagi**.

## Teknologi

- Vite 8
- React 19
- TypeScript
- Fetch API
- CSS
- Express, Prisma, dan PostgreSQL Neon pada backend Modul 4

## Struktur Utama

```text
src/
├── components/
│   ├── NoteForm.tsx
│   ├── NoteCard.tsx
│   ├── Tahap1Notes.tsx
│   ├── PostForm.tsx
│   ├── PostCard.tsx
│   └── Tahap2Posts.tsx
├── hooks/
│   └── useLocalStorage.ts
├── services/
│   └── postService.ts
├── types/
│   ├── note.ts
│   └── post.ts
├── App.tsx
└── App.css
```

## Menjalankan Aplikasi

Backend dan frontend harus dijalankan pada dua terminal berbeda.

### 1. Jalankan backend Modul 4

```powershell
cd "D:\SMT 3\PEMWEB PRAK\MODUL 4\PARK MODUL 4_5\pweb-express-c01-2026"
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

Backend berjalan di `http://localhost:3000`.

### 2. Jalankan frontend Modul 5

```powershell
cd "D:\SMT 3\PEMWEB PRAK\MODUL 4\PARK MODUL 4_5\pweb-challenge-modul5-c01-2026"
npm install
npm run dev
```

Buka `http://localhost:5173` di browser. Gunakan tab **Tahap 1** untuk catatan lokal dan tab **Tahap 2** untuk integrasi API.

## Endpoint yang Digunakan

| Method | Endpoint | Fungsi |
| --- | --- | --- |
| `GET` | `/api/posts` | Mengambil seluruh post |
| `GET` | `/api/posts?search=kata` | Mencari post berdasarkan judul |
| `POST` | `/api/posts` | Membuat post baru |
| `DELETE` | `/api/posts/:id` | Menghapus post berdasarkan ID |

Contoh body untuk membuat post:

```json
{
  "title": "Judul post",
  "content": "Isi post",
  "author": "Nama penulis"
}
```

## Pemeriksaan Kode

```powershell
npm run lint
npm run build
```

## Skenario Pengujian Manual

1. Tambahkan catatan pada Tahap 1, refresh halaman, lalu pastikan catatan tetap ada.
2. Cari catatan berdasarkan judul dan hapus salah satu catatan.
3. Buka Tahap 2 dan pastikan daftar post dari database tampil.
4. Tambahkan post baru dan pastikan post langsung muncul tanpa refresh.
5. Hapus post dan pastikan kartu langsung hilang tanpa refresh.
6. Isi pencarian dengan teks yang tidak ditemukan dan pastikan empty state tampil.
7. Matikan backend, klik **Coba Lagi**, dan pastikan pesan koneksi tampil.
8. Nyalakan kembali backend lalu klik **Coba Lagi** untuk memuat data.

Backend yang digunakan: [pweb-express-c01-2026](https://github.com/umarhyl/pweb-express-c01-2026).
