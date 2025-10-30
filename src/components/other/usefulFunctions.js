import sendRequest from "./sendRequest";
import jsPDF from 'jspdf';
import { serverDomain } from "./variables";

const isBrowser = () => typeof window !== 'undefined';

async function getCart() {
    const user = getUser();

    if (user._id) {
        // Fetch cart from backend if user is logged in
        const cart = await sendRequest(`${serverDomain}/cart/${user._id}`, 'GET');
        return cart;
    } 
    
    // Return local cart if user is not logged in
    if (isBrowser()) {
        return { cart: JSON.parse(localStorage.getItem('cart')) || [] };
    }
    return { cart: [] };
}


function getTotal(cart) {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }
    return total;
}

function getUser() {
    if (isBrowser()) {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : {};
    }
    return {};
}

const isFormFilled = function (formData) {
    return Object.entries(formData)
        .filter(([key]) => key !== 'promoCode') // mat9lebcch promoCode hitach optionnel
        .every(([, val]) => val !== '');
};

const calculatePromo = async function (formData, cart) {
    const { promoCode } = formData;
    const response = await sendRequest(`${serverDomain}/coupons/apply_Promo`, 'POST', { promoCode, cartTotal: getTotal(cart) });
    return response;
}

const updateCartInServer = async function (cart) {
    const user = getUser();
    const response = await sendRequest(`${serverDomain}/cart`, 'PUT', { cart, user });
    user.cart = cart;
    if (isBrowser()) {
        localStorage.setItem('user', JSON.stringify(user));
    }
    return response;
}

const getFavoriteItems = async function () {
    const user = getUser();
    if (!user) return {}
    const response = await sendRequest(`${serverDomain}/favorite/${user._id}`, 'GET');
    return response
}

const searchItems = async function (query) {
    const response = await sendRequest(`${serverDomain}/products/getProducts/${query}`, 'GET');
    return response
}

const getDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

// Function to handle and validate form data
function formValidation(formData) {
    const { email, password, phoneNumber } = formData;

    // Validation results
    const errors = [];

    // Validate email
    if (!email) {
        errors.push("L'email est requis.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Format d'email invalide.");
    }

    // Validate password
    if (!password) {
        errors.push("Le mot de passe est requis.");
    } else if (password.length < 8) {
        errors.push("Le mot de passe doit comporter au moins 8 caractères.");
    }

    // Validate phone number
    if (!phoneNumber) {
        errors.push("Le numéro de téléphone est requis.");
    } else if (!/^\+?\d{10,15}$/.test(phoneNumber)) {
        errors.push("Format de numéro de téléphone invalide.");
    }

    // Return results
    return {
        success: errors.length === 0,
        errors: errors,
    };
}

const downloadOrderAsPDF = (order, promo) => {
    const doc = new jsPDF();
    
    // Title and Order ID
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`Commande #${order._id}`, 10, 15);

    // Date
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 10, 25);

    // Customer Information
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text('Informations du client:', 10, 35);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Nom Complet: ${order.userInfo.formData.firstName} ${order.userInfo.formData.lastName}`, 10, 45);
    doc.text(`Email: ${order.userInfo.formData.email}`, 10, 53);
    doc.text(`Téléphone: ${order.userInfo.formData.phone}`, 10, 61);
    doc.text(`Message du client: ${order.userInfo.formData.notes || 'N/A'}`, 10, 69);

    // Address
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text('Adresse de livraison:', 10, 80);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(order.userInfo.formData.address, 10, 90);
    doc.text(`${order.userInfo.formData.city}, ${order.userInfo.formData.apartment} ${order.userInfo.formData.postalCode}`, 10, 98);

    // Items List Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text('Articles:', 10, 110);

    let yOffset = 120;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Draw Table Header
    doc.setFont("helvetica", "bold");
    doc.text("Produit", 10, yOffset);
    doc.text("Qté", 100, yOffset);
    doc.text("Prix (DH)", 140, yOffset);

    doc.setLineWidth(0.5);
    doc.line(10, yOffset + 2, 200, yOffset + 2); // Header underline

    yOffset += 10;

    // List Items
    order.cart.forEach((item, index) => {
        doc.setFont("helvetica", "normal");
        doc.text(item.productName, 10, yOffset);
        doc.text(`${item.quantity}`, 100, yOffset);
        doc.text(`${item.price.toFixed(2)} DH`, 140, yOffset);
        yOffset += 8;
    });

    // Order Summary
    yOffset += 15; // Extra spacing before the summary
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text('Résumé de la commande:', 10, yOffset);

    // Adjusted box size with more padding
    const boxX = 10;
    const boxY = yOffset + 5;
    const boxWidth = 120;
    const boxHeight = 45;

    doc.setLineWidth(0.5);
    doc.rect(boxX, boxY, boxWidth, boxHeight); // Box around the summary

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const textStartY = boxY + 10; // Start text inside the box with more padding

    doc.text(`Sous-total: ${getTotal(order.cart).toFixed(2)} DH`, 15, textStartY);
    doc.text(`Frais de livraison: 0 DH`, 15, textStartY + 8);
    doc.text(`Reduction Coupon: ${promo.discount} DH`, 15, textStartY + 16);

    doc.setFont("helvetica", "bold");
    doc.text(`Total: ${promo.newTotal.toFixed(2)} DH`, 15, textStartY + 24);

    // Save the PDF
    doc.save(`Commande_${order._id}.pdf`);
};



const addToCart = async (user_id, togglePopup, product) => {
    if (!isBrowser()) return;

    if (!user_id) {
        // Save to localStorage if the user is not connected
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productExists = cart.some(item => item._id === product._id);

        if (!productExists) {
            cart.push({ ...product, quantity: 1 });
            localStorage.setItem('cart', JSON.stringify(cart));
            togglePopup({ title: 'Success', content: 'Produit ajouté au panier (hors ligne).' });
        } else {
            togglePopup({ title: 'Info', content: 'Le produit est déjà dans le panier.' });
        }
        return;
    }

    // Send request to backend
    const response = await sendRequest(`${serverDomain}/cart`, 'POST', { product_Id: product._id, user_id });

    if (!response.error) {
        togglePopup({ title: 'Success', content: response.message });

        // Update local user cart
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            user.cart.push({ ...product, quantity: 1 });
            localStorage.setItem('user', JSON.stringify(user));
        }
    } else {
        togglePopup({ title: 'Error', content: response.error });
    }
};


const addToFavorite = async (product_Id, user_id, togglePopup) => {
    if (!isBrowser()) return;
    // if (!isConnected()) return;
    const response = await sendRequest(`/api/favorite`, 'POST', { product_Id, user_id });
    if (!response.error) {
        togglePopup({ title: 'Success', content: response.message });
        const user = JSON.parse(localStorage.getItem('user'));
        user.favorite.push(product_Id);
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        togglePopup({ title: 'Error', content: response.error });
    }
};

export {
    addToCart, addToFavorite, getCart, getTotal, getUser, isFormFilled, updateCartInServer,
    getFavoriteItems, searchItems, formValidation, getDate, downloadOrderAsPDF, calculatePromo
};