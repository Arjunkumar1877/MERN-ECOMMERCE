import  './NewCollections.css';
import new_collection from '../Assets/new_collections';
import Item from '../Item/Item';

const NewCollections = () => {
  return (
    <div className='new-collections'>
     <h1>NEW COLLECTIONS</h1>
     <hr />
     <div className="collections">
      {
        new_collection.map((item, i)=> (
         <Item key={i} image={item.image} old_price={item.old_price} new_price={item.new_price} />
        ))
      }
     </div>
    </div>
  )
}

export default NewCollections
