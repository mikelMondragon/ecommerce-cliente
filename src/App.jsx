import { useState } from 'react'
import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import { ProductCardContainer } from './products/ProductCardContainer'
import { CreateProduct } from './products/CreateProduct'
import { EditProduct } from './products/EditProduct'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './auth/Pages/Register'
import MainLayout from './shared/MainLayout'
import { Login } from './auth/Pages/Login'
import AdminPanel from './admin/AdminPanel'
import ProductsAdminPanel from './admin/ProductsAdminPanel'
import UsersAdminPanel from './admin/UsersAdminPanel'
import { HomePage } from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import { CheckoutPage } from './pages/CheckoutPage'

function App() {
  //aqui deberia de tener un estado?
  function Success() {
    return <h2>¡Pago exitoso! Gracias por tu compra.</h2>;
  }

  function Cancel() {
    return <h2>Pago cancelado. Puedes volver a intentarlo.</h2>;
  }

  return (
    <>

      <Routes>
        <Route element={<MainLayout />} >
          <Route path='/admin-dashboard' element={<AdminPanel />} />
          <Route path='/admin/products' element={<ProductsAdminPanel />} />
          <Route path='/admin/createProduct' element={<CreateProduct />} />
          <Route path='/admin/users' element={<UsersAdminPanel />} />
          <Route path='product/:id' element={<EditProduct />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/:id' element={<ProductPage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Route>
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
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
