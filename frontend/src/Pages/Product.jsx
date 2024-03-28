import { useContext } from "react"
import { ShopContext } from "../Context/ShopContext"
import { useParams } from 'react-router-dom';
import BreadCrum from "../Components/BreadCrums/BreadCrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
  const {all_product} = useContext(ShopContext)
  // console.log(all_product)
  const { productId } = useParams();
  const product = all_product.find((e)=> e.id === Number(productId))
  return (
    <div>
      <BreadCrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  )
}

export default Product
