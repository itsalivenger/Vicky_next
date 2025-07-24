'use client';

import React, { useState } from 'react';
import styles from './addProductForm.module.css';
import sendRequest from '../../components/other/sendRequest';
import Popup from '../../components/popup/popup';
import { serverDomain } from '../../components/other/variables';
import LazyMedia from '../lazyMedia/LazyMedia';
import { IoMdClose, IoMdCheckmark } from 'react-icons/io';


const AddProductForm = () => {
    const [formData, setFormData] = useState({
        productName: '',
        price: '',
        category: '',
        description: '',
        SKU: '',
        productImages: null,
        previewImage: null
    });
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState('');
    const [onConfirm, setOnConfirm] = useState(() => { });
    const [features, setFeatures] = useState([""]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to an array
        if (files.length > 0) {
            setFormData((prevData) => ({
                ...prevData,
                productImages: files,
                previewImages: files.map((file) => URL.createObjectURL(file)), // Create preview URLs for all files
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Create a FormData object
        const data = new FormData();
        data.append('productName', formData.productName);
        data.append('price', formData.price);
        data.append('SKU', formData.SKU);
        data.append('category', formData.category);
        data.append('description', formData.description);
        data.append('featuresStr', features.join('$dedrno')); {/*this because when appended it transforms into a string and we want it as an array in the backend*/}

        // Append files one by one
        if (formData.productImages && formData.productImages.length > 0) {
            formData.productImages.forEach((file) => {
                data.append('productImages', file);
            });
        }

        for (let pair of data.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        
        // Handle form submission logic here (e.g., send data to the backend)
        console.log(data);
        const response = await sendRequest(`/api/products/add`, 'POST', data, {}, true);
        if (!response.error) {
            // Handle success, e.g., show success message
            setContent({ title: <><span className={`${styles.icon} ${styles.success} material-symbols-outlined`}>check</span> Ajout effectué</>, content: response.message });
            setIsOpen(true);
            setOnConfirm(() => () => { setFormData({ productName: '', price: '', category: '', description: '', SKU: '', productImage: null, previewImage: null, features: [""] }) });
        } else {
            // Handle error, e.g., show error message
            setContent({ title: <><span className={`${styles.icon} ${styles.failure} material-symbols-outlined`}>close</span> Ajout echoué</>, content: response.error });
            setIsOpen(true);
        }
    };

    const handleAddFeature = () => {
        setFeatures([...features, ""]);
    };

    // Handle removing a feature
    const handleRemoveFeature = (index) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    // Handle feature input change
    const handleFeatureChange = (value, index) => {
        const updatedFeatures = [...features];
        updatedFeatures[index] = value;
        setFeatures(updatedFeatures);
    };



    return (
        <div className={styles.container}>
            <Popup onConfirm={onConfirm} title={content.title} content={content.content} isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <h2 className={styles.title}>Ajouter un produit</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                {/* Product Name */}
                <div className={styles.formGroup}>
                    <label htmlFor="productName" className={styles.label}>
                        Nom du produit:
                    </label>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        value={formData.productName}
                        onChange={handleInputChange}
                        required
                        className={styles.input}
                        placeholder='Entrer le nom du produit...'
                    />
                </div>

                {/* Price */}
                <div className={styles.formGroup}>
                    <label htmlFor="price" className={styles.label}>
                        Prix:
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        className={styles.input}
                        placeholder='Entrer le prix du produit...'
                    />
                </div>

                {/* Features */}
                <div className={styles.formGroup}>
                    <label htmlFor="Features" className={styles.label}>
                        Attribus:
                    </label>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.featureRow}>
                            <input
                                type="text"
                                value={feature}
                                onChange={(e) => handleFeatureChange(e.target.value, index)}
                                placeholder={`Attribut ${index + 1}`}
                                className={styles.input}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveFeature(index)}
                                className={styles.removeButton}
                            >
                                <IoMdClose />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddFeature}
                        className={styles.addButton}
                    >
                        Ajouter des attribus
                    </button>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="SKU" className={styles.label}>
                        SKU:
                    </label>
                    <input
                        type="text"
                        id="SKU"
                        name="SKU"
                        value={formData.SKU}
                        onChange={handleInputChange}
                        required
                        className={styles.input}
                        placeholder='eg: Hb-1234'
                    />
                </div>

                {/* Category */}
                <div className={styles.formGroup}>
                    <label htmlFor="category" className={styles.label}>
                        catégorie:
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className={styles.select}
                    >
                        <option value="">Choisir une catégorie</option>
                        <option value="Écouteurs">Écouteurs</option>
                        <option value="Câbles">Câbles</option>
                        <option value="Chargeurs">chargeurs</option>
                        <option value="Adapter">Adapter</option>
                        <option value="Power banks">Power Banks</option>
                        <option value="Batteries">Batteries</option>
                        <option value="Chargeur de voiture">Chargeur de voiture</option>
                        <option value="Supports">Supports</option>
                        <option value="Modulateur">Modulateur</option>
                        <option value="Haut-parleurs">Haut-parleurs</option>
                        <option value="Montres">Montres</option>
                        <option value="Powerbank">Powerbank</option>
                        <option value="Tablette">Tablette</option>
                        <option value="Phone Case">Phone Case</option>
                    </select>
                </div>

                {/* Description */}
                <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.label}>
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        className={styles.textarea}
                        placeholder='Entrer la description du produit...'
                    ></textarea>
                </div>

                {/* Product Image */}
                <div className={styles.fileUpload}>
                    <label htmlFor="productImages" className={styles.fileLabel}>
                        Drag & drop your images here, or <span>browse</span>
                    </label>
                    <input
                        type="file"
                        id="productImages"
                        accept="image/*"
                        multiple // Allow multiple file selection
                        onChange={handleImageChange}
                        className={styles.fileInput}
                    />
                    {/* Display all image previews */}
                    {formData.previewImages &&
                        formData.previewImages.map((preview, index) => (
                            <LazyMedia type="image" key={index} src={preview} alt={`Preview ${index + 1}`} className={styles.imagePreview} width={100} height={100} unoptimized={true} />
                        ))}
                </div>
                <br />

                {/* Submit Button */}
                <button type="submit" className={styles.submitButton}>
                    Ajouter le produit:
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;