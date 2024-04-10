import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
  const [img, setImg] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  })

  const imgaeHandler = (e)=>{
  setImg(e.target.files[0]);
  }

  const changeHandler = (e)=>{
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value
    })

    // console.log(productDetails)
  }

  const Add_Product = async()=>{
    let product = productDetails;
          let formData = new FormData();
    
          formData.append('product', img);
     const res =   await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
            },
            body: formData,
          })

         let responseData = await res.json()
         console.log(responseData)

          if(responseData.success === 1){
            product.image = responseData.image_url;
             await fetch('http://localhost:4000/add-product', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json', 
              },
              body: JSON.stringify(product),
             }).then((res) => res.json()).then((data)=> data.success ? alert("Product Added") : alert("Failed"))
          }

  }

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input type="text" value={productDetails.name} onChange={changeHandler} name='name' placeholder='Type'/>
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="text" value={productDetails.old_price} onChange={changeHandler}  name='old_price' placeholder='Type'  />
        </div>

        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="text" value={productDetails.new_price} onChange={changeHandler}  name='new_price' placeholder='Type'  />
        </div>
      </div>

    <div className="product-itemfield">
      <p>Product Category</p>
      <select name="category" value={productDetails.category} onChange={changeHandler} className='addproduct-selector'>
        <option value="women">Women</option>
        <option value="men">Men</option>
        <option value="kid">Kids</option>
      </select>
    </div>

<div className="addproduct-itemfield">
  <label htmlFor="file-input">
    <img src={img ? URL.createObjectURL(img) :upload_area} className='addproduct-thumnail-img' alt="" />
  </label>
  <input onChange={imgaeHandler} type="file" name='image' id='file-input' hidden />
</div>

<button onClick={()=> Add_Product()} className="addproduct-btn">ADD</button>
    </div>
  )
}

export default AddProduct
