import React from 'react';
import './Admin.css';
import Slidebar from '../../Components/Slidebar/Slidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';


const Admin = () => {
  return (
    <div className='admin'>
      <Slidebar />
      <Routes>
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/listproduct' element={<ListProduct/>} />
      </Routes>
    </div>
  )
}

export default Admin
