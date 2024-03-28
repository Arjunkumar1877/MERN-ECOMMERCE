import data_product from '../Assets/data';
import Item from '../Item/Item';
import './RelatedProducts.css'

const RelatedProducts = () => {

    // console.log(data_product)
  return (
    <div  className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
  {
    data_product.map((item, i)=> {
        return <Item id={item.id} key={i} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
    })
  }
      </div>
    </div>
  )
}

export default RelatedProducts
