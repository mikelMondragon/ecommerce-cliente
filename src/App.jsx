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

function App() {
  //aqui deberia de tener un estado?


  return (
    <>

      <Routes>
        <Route element={<MainLayout />} >
          <Route path='/admin-dashboard' element={<AdminPanel />} />
          <Route path='/admin/products' element={<ProductsAdminPanel />} />
          <Route path='/admin/createProduct' element={<CreateProduct />} />
          <Route path='product/:id' element={<EditProduct />} />
          <Route path='/admin/users' element={<UsersAdminPanel />} />
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
