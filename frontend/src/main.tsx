import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Header from './components/Header/Header.tsx'
import Footer from './components/Footer/Footer.tsx'
import ProductsPage from './pages/ProductsPage/ProductsPage.tsx'
import ProductPage from './pages/ProductPage/ProductPage.tsx'
import StartPage from './pages/StartPage/StartPage.tsx'
import "./index.css"

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
      <Header></Header>
      <StartPage></StartPage>
      <Footer></Footer>
      </>
    ),
  },
  {
    path: '/store',
    element: (
      <>
      <Header></Header>
        <ProductsPage />
        <Footer></Footer>
        </>
        ),
  },
  {
    path: '/store/:id',
    element: (
      <>
      <Header></Header>
        <ProductPage />
        <Footer></Footer>
        </>
    ),
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

