"use client";
import { useEffect, useState } from 'react';
import styles from './OrdersAdmin.module.css';
import sendRequest from '../../../components/other/sendRequest';
import { serverDomain } from '../../../components/other/variables';
import { getTotal } from '../../../components/other/usefulFunctions';
import Popup from '../../../components/popup/popup';
import { OrderDetails } from '../../../components/OrderDetails/OrderDetails';

function OrdersAdmin() {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('email');
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState({});
    const [onConfirm, setOnConfirm] = useState(() => () => { });
    const [toggled, setToggled] = useState(false);
    const [orderPrev, setOrderPrev] = useState({});


    useEffect(() => {
        const getOrders = async () => {
            const response = await sendRequest(`${serverDomain}/orders`, 'GET');
            if (response.error) {
                console.log(response.error);
                setContent({ title: "Error", content: response.error });
                setIsOpen(true);
            } else {
                setOrders(response.orders || []);
            }
        };
        getOrders();
    }, []);

    async function submitSearch() {
        try {
            const response = await sendRequest(`${serverDomain}/orders/search`, 'POST', {
                searchTerm: searchTerm.trim(),
                searchBy
            });

            if (response.error) {
                setContent({ title: "Erreur", content: response.error });
                setIsOpen(true);
            } else {
                console.log(response);
                setOrders(response.orders ? response.orders : []);
            }
        } catch (error) {
            console.error("Erreur lors de la recherche:", error);
            setContent({ title: "Erreur", content: "Erreur inattendue, veuillez réessayer." });
            setIsOpen(true);
        }
    }

    const handleRemove = (id) => {
        setContent({ title: "Confirmation", content: "Voulez-vous vraiment supprimer cette commande?" });
        setOnConfirm(() => () => removeOrder(id));
        setIsOpen(true);
    };

    const removeOrder = async (id) => {
        const response = await sendRequest(`${serverDomain}/orders/${id}`, 'DELETE');
        if (response.error) {
            console.log(response.error);
            setContent({ title: "Error", content: response.error });
            setIsOpen(true);
        } else {
            const updatedOrders = orders.filter((order) => order._id !== id);
            setOrders(updatedOrders);
        }
    };

    const handleStatusChange = async (newStatus, orderId) => {
        const response = await sendRequest(`/api/orders/status/${orderId}`, 'PUT', { newStatus });
        if (response.error) {
            console.log(response.error);
            setContent({ title: "Error", content: response.error });
            setIsOpen(true);
        } else {
            const updatedOrders = orders.map((order) => {
                if (order._id === orderId) {
                    return { ...order, status: newStatus };
                }
                return order;
            });
            setOrders(updatedOrders);
        }
    };

    const handleOrderPrev = (order) => {
        setToggled(true);
        setOrderPrev(order);
    }

    const toggleBack = () => {
        setToggled(false);
    }

    if (toggled) {
        return (
            <OrderDetails toggleBack={toggleBack} order={orderPrev} />
        )
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Traquer les Commandes</h1>
                <div className={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Chercher par Nom du client ou ID de commande..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={submitSearch}
                        className={styles.searchButton}
                    >
                        Rechercher
                    </button>
                    <select
                        className={styles.searchSelect}
                        onChange={(e) => setSearchBy(e.target.value)}
                        value={searchBy}
                    >
                        <option value="email">Email du client</option>
                        <option value="_id">ID de commande</option>
                    </select>
                </div>
            </header>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email du Client</th>
                        <th>Date</th>
                        <th>Montant</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <Order handleOrderPrev={handleOrderPrev} handleStatusChange={handleStatusChange} handleRemove={handleRemove} key={order._id} order={order} />
                    ))}
                </tbody>
            </table>
            <Popup onConfirm={onConfirm} title={content.title} content={content.content} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
}

function Order({ order, handleRemove, handleStatusChange, handleOrderPrev }) {
    const shortenId = (id) => {
        if (!id) return '';
        return id.slice(0, 8);
    };

    const shortenDate = (date) => {
        if (!date) return '';
        return date.slice(0, 10);
    };

    const shortenEmail = (email) => {
        if (!email) return '';
        const [localPart, domainPart] = email.split('@');
        return `${localPart.slice(0, 5)}...@${domainPart}`;
    };

    return (
        <tr>
            <td>{shortenId(order._id)}</td>
            <td>{shortenEmail(order.userInfo.formData && order.userInfo.formData.email)}</td>
            <td>{shortenDate(order.createdAt)}</td>
            <td>{getTotal(order.cart)} Dh</td>
            <td>
                <select
                    className={`${styles.statusDropdown}`}
                    value={order.status}
                    onChange={(e) => handleStatusChange(e.target.value, order._id)}
                >
                    <option value="Pending">En attente</option>
                    <option value="Processing">En traitement</option>
                    <option value="Shipped">Expédié</option>
                    <option value="Delivered">Livré</option>
                    <option value="Cancelled">Annulé</option>
                </select>
            </td>
            <td>
                <div className={styles.actions}>
                    <button onClick={() => handleOrderPrev(order)} className={styles.btnPrimary}>Voir La Commande</button>
                    <button onClick={() => handleRemove(order._id)} className={styles.btnDanger}>Annuler La Commande</button>
                </div>
            </td>
        </tr>
    );
}


export default OrdersAdmin;
