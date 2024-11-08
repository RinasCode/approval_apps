# Budget Approval Application

Aplikasi Budget Approval adalah sistem manajemen anggaran berbasis web yang dibangun menggunakan **Express.js** untuk backend, **PostgreSQL** sebagai basis data, dan **Vue.js** untuk frontend. Aplikasi ini memungkinkan karyawan (Employee) dengan berbagai level untuk mengajukan, mengelola, dan menyetujui pengajuan anggaran. Hanya pengguna dengan peran Admin yang dapat mengelola data pengguna (add, edit, dan delete user).

## Fitur Utama

### 1. Manajemen Pengguna (Admin Only)
- **Add User**: Hanya Admin yang dapat menambahkan pengguna baru.
- **Edit User**: Hanya Admin yang dapat mengedit informasi pengguna.
- **Delete User**: Hanya Admin yang dapat menghapus pengguna.

### 2. Pengajuan dan Persetujuan Anggaran
- **Employee Level 1**:
  - Dapat melihat daftar pengajuan anggaran yang dimilikinya.
  - Dapat membuat pengajuan anggaran baru.
  - Dapat mengedit pengajuan anggaran yang **statusnya ditolak (reject)**. Pengajuan yang telah disetujui tidak dapat diedit.

- **Employee Level 2 - 5**:
  - Dapat melakukan persetujuan (**approve**) atau penolakan (**reject**) atas pengajuan anggaran.
  - Dapat memberikan komentar saat melakukan penolakan.

### 3. Sistem Persetujuan Bertahap (Estafet)
- Pengajuan anggaran dilakukan secara bertahap melalui level persetujuan:
  - Jika **Employee Level 1** mengajukan anggaran, pengajuan akan diteruskan ke **Level 2**.
  - **Level 2** dapat memilih untuk menyetujui atau menolak pengajuan. Jika disetujui, pengajuan berlanjut ke **Level 3**; jika ditolak, kembali ke **Level 1**.
  - Siklus ini berlanjut hingga level terakhir (**Level 5**) yang dapat memberikan persetujuan final atau penolakan.
  
## Teknologi yang Digunakan

- **Backend**: Express.js
- **Database**: PostgreSQL
- **Frontend**: Vue.js

## Struktur Level Employee dan Akses

| Level Employee | Hak Akses                           |
|----------------|------------------------------------|
| Admin          | Mengelola pengguna (add, edit, delete) |
| Employee Level 1 | Mengajukan dan mengedit pengajuan pribadi yang ditolak |
| Employee Level 2 - 5 | Menyetujui atau menolak pengajuan, memberikan komentar saat menolak |

## Alur Kerja Pengajuan Anggaran

1. **Pengajuan Baru**: Employee Level 1 membuat pengajuan anggaran baru.
2. **Persetujuan Bertahap**:
   - Pengajuan diteruskan ke Employee Level 2 untuk persetujuan.
   - Jika disetujui, pengajuan dilanjutkan ke level berikutnya. Jika ditolak, pengajuan kembali ke Employee Level 1 untuk revisi.
   - Siklus ini berlanjut hingga mencapai Employee Level 5 untuk persetujuan akhir.
3. **Komentar pada Penolakan**: Jika pengajuan ditolak di salah satu level, Employee di level tersebut dapat memberikan komentar sebagai alasan penolakan.

# approval_apps
