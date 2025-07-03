import { useState } from 'react'
import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import { ProductCardContainer } from './components/ProductCardContainer'
import { CreateProduct } from './components/CreateProduct'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  //aqui deberia de tener un estado?


  return (
    <>
      <Routes>
        <Route path='/' element={<CreateProduct />} />
        <Route path='products' element={<ProductCardContainer />} />

        <Route path='/*' element={<Navigate to={'products'} />} />
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
