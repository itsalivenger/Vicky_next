import { useState, useEffect, useCallback } from 'react';
import styles from './productManagement.module.css';
import { serverDomain } from '../other/variables';
import EditPreview from './editPreview';
import sendRequest from '../other/sendRequest';
import Popup from '../popup/popup';
import LazyMedia from '../lazyMedia/LazyMedia';


const maxLength = 10;
const ProductManagement = () => {
    const [foundProducts, setFoundProducts] = useState([]);
    const [searchVal, setSearchVal] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState({});
    const [searchBy, setSearchBy] = useState('productName');
    const [toggledView, setToggledView] = useState(false);
    const [viewProduct, setViewProduct] = useState({});
    const [onConfirm, setOnConfirm] = useState(() => () => { });

    const handleSubmit = useCallback(async () => {
        console.log(searchBy, searchVal);

        const response = await sendRequest(
            `${serverDomain}/products/getProducts/${searchVal ? searchVal : "all"}`,
            "POST",
            { searchBy }
        );

        if (response.error) {
            console.log(response.error);
            setContent({ title: "Error", content: response.error });
            setIsOpen(true);
            setFoundProducts([]);
        } else {
            setFoundProducts(response);
        }
    }, [searchBy, searchVal]);


    useEffect(() => {
        handleSubmit();
    }, [handleSubmit, toggledView]);

    const handleRemoveItem = (product) => {
        setContent({ title: "Suppression", content: `Voulez-vous vraiment supprimer le produit ${product.productName}?` })
        setOnConfirm(() => () => deleteItem(product._id));
        setIsOpen(true);
    }

    const deleteItem = async (id) => {
        const response = await sendRequest(`${serverDomain}/products/deleteProduct/${id}`, 'DELETE');
        if (response.error) {
            setContent({ title: "Error", content: response.error });
            setIsOpen(true);
        } else {
            setContent({ title: "Success", content: response.message });
            setIsOpen(true);
            handleSubmit();
        }
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const editProduct = (product) => {
        setToggledView(true);
        setViewProduct(product);
    }

    const toggleProductActiveState = async (_id) => {
        const response = await sendRequest(`/api/products/toggleActive/${_id}`, 'PUT');
        if (response.error) {
            setContent({ title: "Error", content: response.error });
            setIsOpen(true);
        } else {
            setContent({ title: "Success", content: response.message });
            setIsOpen(true);
            handleSubmit();
        }
    }

    if (toggledView) {
        return (
            <EditPreview product={viewProduct} toggleBack={() => setToggledView(false)} />
        )
    }

    return (
        <div className={styles.container}>
            <h2>Management des Produits</h2>

            <div className={styles.controls}>
                <input
                    type="text"
                    placeholder="Rechercher par Nom du produit, SKU ou Catégories..."
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    className={styles.searchBar}
                />

                <select
                    name="SearchBy"
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                    className={styles.filter}
                >
                    <option value="productName">Nom de Produit</option>
                    <option value="SKU">SKU</option>
                    <option value="category">Categorie</option>
                </select>

                <button onClick={handleSubmit} className={styles.searchButton}>
                    Rechercher
                </button>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {foundProducts.map((product) => (
                        <tr key={product._id}>
                            <td>
                                <LazyMedia type="image" src={product.imageUrls[0]} alt={product.name} className={styles.productImage} width={50} height={50} unoptimized={true} />
                            </td>
                            <td>{product.productName.slice(0, maxLength) + '...'}</td>
                            <td>{product.SKU.slice(0, maxLength) + '...'}</td>
                            <td>{product.price} DH</td>
                            <td>{product.active > 0 ? product.active : 'Out of Stock'}</td>
                            <td className={styles.buttonsInTableContainer}>
                                <button onClick={() => { editProduct(product) }} className={styles.editButton}>Edit</button>
                                <button onClick={() => handleRemoveItem(product)} className={styles.deleteButton}>Supprimer</button>
                            </td>
                            <td>
                                <label className={styles["toggle-switch"]}>
                                    <input
                                        type="checkbox"
                                        checked={product.active}
                                        onChange={() => {
                                            toggleProductActiveState(product._id);
                                        }}
                                    />
                                    <span className={styles["toggle-slider"]}></span>
                                </label>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Popup onConfirm={onConfirm} isOpen={isOpen} onClose={handleClose} title={content.title} content={content.content} />
        </div>
    );
};


export default ProductManagement;