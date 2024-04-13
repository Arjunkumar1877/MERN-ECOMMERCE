import React, { useState } from 'react';
import './ListProduct.css'
import { useEffect } from 'react';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
 const fetchInfo = async()=>{
 const res = await fetch('http://localhost:4000/allproducts');

 const data = await  res.json();
console.log(data)
 if(res.ok){
  setAllProducts(data)
 }
 }

 useEffect(()=>{
  fetchInfo()
 },[])

 const remove_product = async(id)=>{
  await fetch('http://localhost:4000/removeproduct', {
    method: "POST",
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: id})
  })

  fetchInfo()
 }

  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listproduct-allproducts">
        <hr />
        { allProducts.map((product, index)=>{
          return <>
          <div className="listproduct-format-main listproduct-format" key={index}>
             <img src={product.image} alt="" className="listproduct-product-image"  />
             <p>{product.name}</p>
             <p>$ {product.old_price}</p>
             <p>$ {product.new_price}</p>
             <p>{product.category}</p>
             <img src={cross_icon} onClick={()=> {remove_product(product._id)}} className='listproduct-remove-icon' alt="" />
          </div>
          <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct
