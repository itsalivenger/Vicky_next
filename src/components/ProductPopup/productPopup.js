import React, { useState } from 'react';
import styles from './productPopup.module.css';
import LazyMedia from '../lazyMedia/LazyMedia';

const ProductPopup = ({ product, onClose, handleEdit, handleDeleteProduct }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Local state for edited product fields
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Save changes and pass them to parent
  const handleSave = () => {
    handleEdit(editedProduct, product._id);
    setIsEditing(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        <div className={styles.content}>
          <div className={styles.imageSection}>
            <LazyMedia type="image" src={editedProduct.imageUrl} alt={editedProduct.productName} className={styles.productImage} width={500} height={300} unoptimized={true} />
          </div>
          <div className={styles.detailsSection}>
            {isEditing ? (
              <>
                <input 
                  className={styles.editInput} 
                  name="productName" 
                  value={editedProduct.productName} 
                  onChange={handleChange} 
                />
                <input 
                  className={styles.editInput} 
                  name="price" 
                  value={editedProduct.price} 
                  onChange={handleChange} 
                  type="number" 
                />
                <input 
                  className={styles.editInput} 
                  name="brand" 
                  value={editedProduct.brand} 
                  onChange={handleChange} 
                />
                <textarea 
                  className={styles.editInput} 
                  name="description" 
                  value={editedProduct.description} 
                  onChange={handleChange} 
                />
              </>
            ) : (
              <>
                <h2 className={styles.title}>{editedProduct.productName}</h2>
                <p className={styles.price}>${editedProduct.price}</p>
                <p className={styles.brand}><strong>Brand:</strong> {editedProduct.brand}</p>
                <span className={styles.category}>{editedProduct.category}</span>
                <p className={styles.description}>{editedProduct.description}</p>
              </>
            )}
            <div className={styles.buttonGroup}>
              {isEditing ? (
                <>
                  <button className={styles.saveButton} onClick={handleSave}>Save</button>
                  <button className={styles.cancelButton} onClick={toggleEditMode}>Cancel</button>
                </>
              ) : (
                <>
                  <button className={styles.editButton} onClick={toggleEditMode}>Edit Product</button>
                  <button className={styles.removeButton} onClick={() => handleDeleteProduct(product._id)}>Remove Product</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
