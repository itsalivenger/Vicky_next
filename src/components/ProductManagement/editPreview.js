import { useState } from 'react';
import styles from './editPreview.module.css';
import Popup from '../popup/popup';
import { serverDomain } from '../other/variables';
import sendRequest from '../other/sendRequest';
import LazyMedia from '../lazyMedia/LazyMedia';
import { FaArrowLeft } from 'react-icons/fa';

const EditPreview = ({ product, toggleBack }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        productName: product.productName,
        description: product.description,
        price: product.price
    });
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState({ title: "", content: "" });

    const updateProduct = async () => {
        const response = await sendRequest(`/api/products/update`, 'PUT', { updatedData: formData, _id: product._id });

        if (!response.error) {
            setContent({ title: "Success", content: response.message });
            setIsOpen(true);
        } else {
            setContent({ title: "Error", content: response.error });
            setIsOpen(true);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };
    const features = product.features ? product.features : '';

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Aperçu du Produit</h1>
                <FaArrowLeft onClick={toggleBack} className={styles.icon} size={24} color="white" />
            </div>
            <div className={styles.productContainer}>
                <div className={styles.productImage}>
                    <LazyMedia type="image" src={product.imageUrls[0]} alt="Wireless Noise-Canceling Headphones" width={500} height={300} unoptimized={true} />
                </div>
                <div className={styles.productDetails}>
                    <div className={styles.productCategory}>{product.category}</div>
                    {isEditing ? (
                        <>
                            <label htmlFor="productName">Nom du produit:</label>
                            <input
                                type="text"
                                name="productName"
                                value={formData.productName}
                                onChange={handleInputChange}
                                className={styles.productTitleInput}
                            />
                        </>
                    ) : (
                        <h1 className={styles.productTitle}>{formData.productName}</h1>
                    )}

                    {isEditing ? (
                        <>
                            <label htmlFor="description">Description:</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className={styles.productDescriptionInput}
                            />
                        </>
                    ) : (
                        <p className={styles.productDescription}>{formData.description}</p>
                    )}

                    <ul className={styles.productFeatures}>
                        {features && features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>

                    {isEditing ? (
                        <><label htmlFor="price">Prix:</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className={styles.productPriceInput}
                            /></>
                    ) : (
                        <div className={styles.productPrice}>{formData.price} DH</div>
                    )}

                    <div className={styles.productActions}>
                        <button
                            onClick={() => {
                                if (isEditing) updateProduct();
                                toggleEditMode();
                            }}
                            className={`${styles.btn} ${styles.btnPrimary}`}
                        >
                            {isEditing ? 'Save' : 'Modifier'}
                        </button>
                        <button onClick={toggleBack} className={`${styles.btn} ${styles.btnSecondary}`}>
                            Annuler
                        </button>
                    </div>
                </div>
            </div>
            <Popup isOpen={isOpen} onClose={() => setIsOpen(false)} title={content.title} content={content.content} />
        </div>
    );
};

export default EditPreview;