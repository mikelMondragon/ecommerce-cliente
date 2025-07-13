import { useState } from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, Navigate } from 'react-router-dom'
import { EditProduct } from './products/EditProduct'
import { ToastContainer } from 'react-toastify';

import MainLayout from './shared/MainLayout'
import { HomePage } from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { CheckoutSuccess } from './pages/CheckoutSuccess'
import { CheckoutError } from './pages/CheckoutError'

import { adminRoutes, authRoutes } from './routes'



function App() {

  const renderRoutes = (routes) =>
    routes.map(({ path, element, children }) => (
      <Route key={path} path={path} element={element}>
        {children && renderRoutes(children)}
      </Route>
    ));



  return (
    <>

      <Routes>
        <Route element={<MainLayout />} >
          {renderRoutes(adminRoutes)}
          <Route path='product/:id' element={<ProductPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/success' element={<CheckoutSuccess />} />
          <Route path='/cancel' element={<CheckoutError />} />
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Route>
        {renderRoutes(authRoutes)}
        {/* authRoutes
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} /> */}
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}  // Duración en ms
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </>
  )
}

export default App
