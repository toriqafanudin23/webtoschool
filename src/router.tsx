import { createBrowserRouter } from 'react-router'
import { MainLayout } from '@/components/layout/MainLayout'
import { ROUTES } from '@/config/navigation'
import { RESOURCES } from '@/features/admin/resources'
import ComingSoonPage from '@/pages/ComingSoonPage'
import HomePage from '@/pages/HomePage'

/**
 * Halaman baru: tambahkan satu rute di sini. Untuk halaman besar gunakan
 * `lazy: async () => ({ Component: (await import('...')).default })`.
 * Halaman Beranda dimuat langsung karena menjadi pintu masuk utama (LCP).
 */
export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      { index: true, Component: HomePage },
      {
        path: ROUTES.profile,
        lazy: async () => ({ Component: (await import('@/pages/ProfilePage')).default }),
      },
      {
        path: ROUTES.academic,
        lazy: async () => ({ Component: (await import('@/pages/AcademicPage')).default }),
      },
      {
        path: ROUTES.information,
        lazy: async () => ({ Component: (await import('@/pages/InformationPage')).default }),
      },
      {
        path: ROUTES.admission,
        lazy: async () => ({ Component: (await import('@/pages/AdmissionPage')).default }),
      },
      {
        path: ROUTES.admissionStatus,
        lazy: async () => ({ Component: (await import('@/pages/AdmissionPage')).default }),
      },
      {
        path: ROUTES.contact,
        lazy: async () => ({ Component: (await import('@/pages/ContactPage')).default }),
      },
      { path: '*', Component: ComingSoonPage },
    ],
  },
  // Panel admin memakai kerangka sendiri (tanpa navbar dan footer publik) dan wajib login.
  {
    path: ROUTES.adminDashboard,
    lazy: async () => {
      const [{ AdminLayout }, { requireAdmin }] = await Promise.all([
        import('@/features/admin/components/AdminLayout'),
        import('@/features/admin/session'),
      ])
      return { Component: AdminLayout, loader: requireAdmin }
    },
    children: [
      {
        index: true,
        lazy: async () => ({ Component: (await import('@/pages/AdminDashboardPage')).default }),
      },
      // Modul konten admin (Berita, Pengumuman, Agenda, Galeri, Guru, PPDB): satu halaman, satu definisi.
      ...RESOURCES.map((def) => ({
        path: `${def.path}/*`,
        lazy: async () => {
          const { default: AdminResourcePage } = await import('@/pages/AdminResourcePage')
          return { Component: () => <AdminResourcePage def={def} /> }
        },
      })),
      {
        path: '*',
        lazy: async () => ({ Component: (await import('@/pages/AdminComingSoonPage')).default }),
      },
    ],
  },
  {
    path: ROUTES.adminLogin,
    lazy: async () => ({ Component: (await import('@/pages/AdminLoginPage')).default }),
  },
])
