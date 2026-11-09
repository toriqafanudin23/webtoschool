# Web SDN 1 Kembaran

React 19 + TypeScript + Vite 8 + Tailwind CSS v4. Mobile-first.

## Menjalankan

```bash
npm install
npm run dev      # pengembangan
npm run build    # cek tipe + build produksi
npm run lint
```

## Deploy (Vercel)

`vercel.json` mengarahkan semua alamat ke `index.html` (SPA fallback) agar refresh di `/ppdb`, `/kontak`, `/admin`, dst. tidak 404. Berkas yang benar-benar ada (JS, CSS, gambar) tetap dilayani apa adanya. Aset di `/assets` di-cache setahun karena namanya berhash.

## Struktur

```
src/
  config/        site.ts (identitas, PPDB, kontak), navigation.ts (rute & menu)
  lib/           cn, format tanggal, helper Unsplash
  hooks/         useStickyHeader, useLockBodyScroll, useEscapeKey, useMediaQuery, useActiveSection
  components/
    ui/          Button, Container, Section, SectionNav, FilterChips, KeyValueList, Photo, PhotoSlot, Logo, IconTile (reusable)
    layout/      AnnouncementBar, Navbar, MobileMenu, Footer, MainLayout, PageHero
  features/admission/ halaman PPDB: content.ts (alur, jalur, berkas, langkah formulir), validation.ts, api.ts (kontrak backend)
  features/contact/ halaman Kontak; features/admin/ login admin (api.ts = kontrak backend)
  features/home/ komponen section Beranda + content.ts (data) + types.ts
  features/profile/, academic/, information/  section tiap halaman + content.ts (data placeholder)
  pages/         HomePage, AdmissionPage, ProfilePage, AcademicPage, InformationPage, ComingSoonPage
  router.tsx     daftar rute
  index.css      token desain (@theme): warna, font, tinggi navbar
```

## Menambah halaman baru

1. Buat `src/pages/NamaPage.tsx` (default export). Untuk halaman dalam, mulai dengan `PageHero` (sudah memakai `pt-(--header-h)`; bila membuat hero sendiri yang berlatar biru, pakai padding itu karena navbar menimpa bagian atas).
2. Daftarkan di `src/router.tsx`.
3. Pakai `Section`, `Button`, `Container` agar konsisten.

## Yang masih sementara

- Foto hero dari Unsplash: ubah `HERO_PHOTO` di `src/features/home/content.ts`.
- Alamat, telepon, email: ubah `CONTACT` di `src/config/site.ts`.
- Halaman Profil, Akademik, dan Informasi sudah jadi. Data yang belum resmi masih placeholder berkurung siku di `content.ts` masing-masing fitur (`features/profile`, `academic`, `information`). Foto: isi `photo: { src, alt }` pada item terkait. Alamat berkas PDF: `CALENDAR_PDF_URL`, `EXTRACURRICULAR_LIST_URL`, dan `DOWNLOADS` (masih `#`).
- Berita dan agenda di halaman Informasi memakai data yang sama dengan Beranda (`features/home/content.ts`); demikian juga program unggulan Akademik.
- Halaman PPDB (`/ppdb`, dan `/ppdb/status` yang langsung ke bagian Cek status) sudah jadi. Ketentuan jalur Afirmasi/Perpindahan, daftar berkas wajib, dan jam layanan masih placeholder di `features/admission/content.ts`.
- Formulir PPDB menyimpan draf teks di localStorage. Pengiriman dan cek status butuh backend: isi `ADMISSION_API_URL` di `config/site.ts` (kontrak di `features/admission/api.ts`). Selama kosong, kedua fitur menampilkan pesan "belum aktif".
- Dashboard admin (`/admin`, halaman Ringkasan) sudah jadi beserta kerangka panel (sidebar desktop; bilah atas, tab bawah, dan menu layar penuh di ponsel). Rute ini dijaga `requireAdmin` (`features/admin/session.ts`): belum login diarahkan ke `/admin/masuk`. **Mode demo** (`features/admin/demo.ts`): selama `ADMIN_API_URL` kosong, login sementara aktif di semua lingkungan, termasuk hasil deploy (matikan dengan env `VITE_ADMIN_DEMO=false` saat build). Akun dan kata sandinya tampil di halaman login: `admin@sdn1kembaran.test` / `demo-admin` dan data contoh berlabel; mati otomatis begitu `ADMIN_API_URL` diisi. Karena kredensialnya publik, jangan simpan data sungguhan di mode ini; hapus `demo.ts` bila backend asli sudah dipasang. Kontrak API: `features/admin/api.ts` (`/auth/me`, `/auth/logout`, `/dashboard`, `/admission`). Menu lain di panel (Berita, Pengumuman, Agenda, dst.) menampilkan `AdminComingSoonPage` di dalam kerangka yang sama. Kolom pencarian di bilah atas masih nonaktif.
- Halaman Kontak (`/kontak`) dan Masuk admin (`/admin/masuk`, kerangka tanpa navbar/footer) sudah jadi. Desain Kontak tidak ada di `desain_website.html`, jadi disusun dengan pola yang sama; data di `features/contact/content.ts` dan `CONTACT` (config/site.ts) masih placeholder.
- Pesan Kontak dan login admin butuh backend: isi `CONTACT_API_URL` dan `ADMIN_API_URL` di `config/site.ts` (kontrak di `api.ts` masing-masing; sesi admin diharapkan lewat cookie HttpOnly). Selama kosong, keduanya menampilkan pesan "belum aktif". 
- Rute Galeri masih `ComingSoonPage`.
- Peta di halaman Kontak memakai Google Maps tertanam (tanpa API key), dicari lewat `MAP.query` di `config/site.ts`. Untuk titik tepat, isi `MAP.placeUrl` (tautan Bagikan) dan `MAP.embedUrl` (src dari Sematkan peta).
- Sambutan kepala sekolah di Beranda (di bawah hero): teks, jabatan, dan foto ada di `features/home/content.ts` (`HEADMASTER_WELCOME`, `HEADMASTER_PHOTO`); nama di `HEADMASTER_NAME` (`features/profile/content.ts`). Teksnya masih draf umum.
- Foto sarana dan prasarana (halaman Profil): taruh berkas JPG di `public/fasilitas/` sesuai daftar di `public/fasilitas/README.txt`. Selama berkas belum ada, kartu menampilkan ikon.
- Modul admin (`/admin/berita`, `pengumuman`, `agenda`, `galeri`, `guru`, `ppdb`): satu definisi per modul di `features/admin/resources.ts` (kolom, isian, data contoh), satu pengelola generik `components/ResourceManager.tsx` (cari, saring status, tambah/ubah/hapus, ekspor CSV pendaftar). Mode demo menyimpan data di localStorage browser (`demoStore.ts`) dan TIDAK memengaruhi website publik. Kontrak API asli di `api.ts` (`GET/POST {ADMIN_API_URL}/{key}`, `PUT/DELETE .../{key}/{id}`). Menu Akademik dan Pengaturan situs masih `AdminComingSoonPage`.
