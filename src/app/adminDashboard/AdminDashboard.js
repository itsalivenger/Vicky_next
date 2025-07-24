"use client";
import React, { useEffect, useState } from 'react';
import styles from './AdminDashboard.module.css'; // Assuming modular CSS is used
import AddProductForm from '../../../components/addProductForm/addProductForm';
import ColoredDivider from '../../../components/coloredHr/coloredDivider';
import ProductPopup from '../../../components/ProductPopup/productPopup';
import sendRequest from '../../../components/other/sendRequest';
import { serverDomain } from '../../../components/other/variables';
import Popup from '../../../components/popup/popup';
import OrdersAdmin from '../OrdersAdmin/OrdersAdmin';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard'); // Initial active tab
    const [showPopup, setShowPopup] = useState(false);
    const [name, setName] = useState('');
    const [foundProducts, setFoundProducts] = useState([]);
    const [content, setContent] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [previewProduct, setPreviewProduct] = useState(null);

    // Function to handle tab switching
    const switchTab = (tabId) => {
        setActiveTab(tabId);
    };


    useEffect(() => {
        const fetchProducts = async () => {
            const response = await sendRequest(`${serverDomain}/products/adminTable`, 'GET');
            if (response.error) {
                console.log(response.error);
                setContent({ title: "Error", content: response.error });
                setIsOpen(true);
            } else {
                setFoundProducts(response ? response : []);
            }
        }
        fetchProducts();
    }, []);


    const handleSearch = async () => {
        // to submit value
        const encodedName = encodeURIComponent(name);
        const response = await sendRequest(`${serverDomain}/products/getProducts/${encodedName}`, 'GET');
        console.log(response, 'handleSearch function');

        if (!response.error) {
            setFoundProducts(response);
        } else {
            setFoundProducts([]);
            console.log(response.error);
            setContent({ title: "Error", content: response.error });
            setIsOpen(true);
        }
    }

    const handleUpdateProduct = async (editedProduct, _id) => {
        // to submit value
        const response = await sendRequest(`${serverDomain}/products/updateProduct`, 'PUT', editedProduct);
        console.log(response, 'handleUpdateProduct function');
        if (!response.error) {
            setContent({ title: "Success", content: response.message });
        } else {
            setContent({ title: "Error", message: response.error });
        }
        setIsOpen(true);
        setFoundProducts([]);
        setShowPopup(false)
    }

    const handleDeleteProduct = async (_id) => {

        // to submit value
        const encodedId = encodeURIComponent(_id);
        const response = await sendRequest(`/api/products/${encodedId}`, 'DELETE');
        console.log(response);
        if (!response.error) {
            setContent({ title: "Success", content: response.message });
        } else {
            setContent({ title: "Error", content: response.error });
        }
        setIsOpen(true);
        setFoundProducts(foundProducts.filter(product => product._id !== _id));
        setShowPopup(false)
    }

    return (
        <div className={styles["admin-dashboard"]}>
            {/* Navigation Tabs */}
            <nav className={styles["nav-tabs"]}>
                <div className={styles["tab-container"]}>
                    <button
                        className={`${styles["tab-button"]} ${activeTab === 'dashboard' ? styles["active"] : ''}`}
                        onClick={() => switchTab('dashboard')}
                    >
                        Dashboard
                    </button>
                    <button
                        className={`${styles["tab-button"]} ${activeTab === 'products' ? styles["active"] : ''}`}
                        onClick={() => switchTab('products')}
                    >
                        Product Management
                    </button>
                    <button
                        className={`${styles["tab-button"]} ${activeTab === 'essentials' ? styles["active"] : ''}`}
                        onClick={() => switchTab('essentials')}
                    >
                        Essentials
                    </button>
                </div>
            </nav>

            <ColoredDivider />
            {/* Content Area */}
            <div className={styles["content"]}>
                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <div className={`${styles["tab-content"]} ${styles["active"]}`}>
                        <div className={styles["dashboard-grid"]}>
                            <div className={styles["card"]}>
                                <h3>Total Sales</h3>
                                <div className={styles["number"]}>24,500 DH</div>
                            </div>
                            <div className={styles["card"]}>
                                <h3>Active Users</h3>
                                <div className={styles["number"]}>1,234</div>
                            </div>
                            <div className={styles["card"]}>
                                <h3>Products</h3>
                                <div className={styles["number"]}>89</div>
                            </div>
                        </div>
                        <OrdersAdmin />
                    </div>
                )}


                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div className={`${styles["tab-content"]} ${styles["active"]}`}>
                        <div className={styles["card"]}>
                            <AddProductForm />
                            <Popup isOpen={isOpen} onClose={() => setIsOpen(false)} title={content.title} content={content.content} />
                            <div className={styles["product-header"]}>
                                <h2>Liste des produits:</h2>
                            </div>
                            <div className={styles["searchContainer"]}>
                                <label htmlFor="search">Trouver un produit:</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Search products..." />
                                <button onClick={handleSearch}>Search</button>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nom</th>
                                        <th>Prix</th>
                                        <th>Category</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!foundProducts.length ? <span className={styles["no-products"]}>Pas De Produits trouve</span> : foundProducts.map((product) => (
                                        <ProductInTable setPreviewProduct={setPreviewProduct} setShowPopup={setShowPopup} key={product._id} product={product} />
                                    ))}
                                </tbody>
                            </table>
                            {showPopup && <ProductPopup handleDeleteProduct={handleDeleteProduct} handleEdit={handleUpdateProduct} product={previewProduct} onClose={() => setShowPopup(false)} />}
                        </div>
                    </div>
                )}

                {/* Essentials Tab */}
                {activeTab === 'essentials' && (
                    <div className={`${styles["tab-content"]} ${styles["active"]}`}>
                        <div className={styles["essentials-grid"]}>
                            <div className={styles["card"]}>
                                <h3>Quick Actions</h3>
                                <div className={styles["quick-actions"]}>
                                    <button>🔧 Site Settings</button>
                                    <button>📝 Content Management</button>
                                    <button>👥 User Management</button>
                                    <button>📊 Analytics</button>
                                </div>
                            </div>
                            <div className={styles["card"]}>
                                <h3>System Status</h3>
                                <div className={styles["status-items"]}>
                                    <div className={styles["status-item"]}>
                                        <span>Server Status</span>
                                        <span className={styles["status-online"]}>Online</span>
                                    </div>
                                    <div className={styles["status-item"]}>
                                        <span>Last Backup</span>
                                        <span>2 hours ago</span>
                                    </div>
                                    <div className={styles["status-item"]}>
                                        <span>System Version</span>
                                        <span>v2.1.0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


function ProductInTable({ setPreviewProduct, setShowPopup, product: { _id, productName, price, description, category, imageUrl } }) {

    // Utility function to trim long strings
    const trimString = (str, maxLength) => {
        if(str) return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
    };

    return (
        <tr>
            <td>{trimString(_id, 8)}</td>
            <td>{trimString(productName, 20)}</td>
            <td>{price}</td>
            <td>{category}</td>
            <td>
                <button
                    onClick={() => {
                        setPreviewProduct({ _id, productName, price, description, category, imageUrl });
                        setShowPopup(true);
                    }}
                    className={`${styles["action-btn"]} ${styles["preview-btn"]}`}
                >
                    Preview
                </button>
            </td>
        </tr>
    );
}


export default Dashboard;
