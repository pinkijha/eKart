import React, { useState, useEffect } from 'react'
import Header from './Header'
import Brands from './Brands'
import { ref, remove, get } from 'firebase/database';
import { database } from '../utils/firebase';
import ProductForm from './ProductForm';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    const productsRef = ref(database, 'products');
    get(productsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const productsData = snapshot.val();
        setProducts(Object.keys(productsData).map(id => ({ id, ...productsData[id] })));
      }
    });
  }, [products]);

  const handleDelete = (id) => {
    const productRef = ref(database, 'products/' + id);
    remove(productRef);
  };

  const handleEdit = (productId) => {
    setEditingProductId(productId);
  };

  const handleFormSubmit = () => {
    setEditingProductId(null); // Reset after form submit
  };
  return (
    <div>
      <div><Header/></div>

      <div>
      <div className='m-20'>
      <ProductForm productId={editingProductId} onFormSubmit={handleFormSubmit} />
      <h2>Product List</h2>
      <div>
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Brand: {product.brand}</p>
            <img src={product.image} alt={product.name} width="100" />
            <button onClick={() => handleEdit(product.id)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
      </div>

      <div><Brands/></div>
    </div>
  )
}

export default Products
