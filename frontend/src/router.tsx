
import { createBrowserRouter } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage/ProductsPage.tsx'
import ProductPage from './pages/ProductPage/ProductPage.tsx'
import StartPage from './pages/StartPage/StartPage.tsx'
import AdminPage from './pages/AdminPage/AdminPage.tsx'
import InfoPage from './pages/InfoPage/InfoPage.tsx'
import Layout from './components/Layout/Layout.tsx'


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
            path: '/',
            element: (
              <StartPage></StartPage>
            ),
          },
          {
            path: '/info',
            element: (
              <>
              <InfoPage></InfoPage>
              </>
            ),
          },
        
          {
            path: '/store',
            element: (
                <ProductsPage />
                ),
          },
          {
            path: '/store/:id',
            element: (
                                <ProductPage />

            ),
          },
          {
            path: '/admin',
            element: (
                <AdminPage />
                ),
          },
      ],
    },
  ]);