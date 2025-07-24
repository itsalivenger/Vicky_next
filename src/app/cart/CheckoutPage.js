"use client";
import React, { useState, useEffect } from 'react';
import styles from './CheckoutPage.module.css';
import Cart from './cart.js';
import Checkout from './checkout.js';
import Finalize from './finalize.js';
import { getUser, isFormFilled, updateCartInServer } from '../../../components/other/usefulFunctions.js';
import { serverDomain, domain } from '../../../components/other/variables.js';
import sendRequest from '../../../components/other/sendRequest.js';
import Popup from '../../../components/popup/popup.js';

function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);  // Track the current step (1: Cart, 2: Checkout, 3: Finalize)
  const [cart, setCart] = useState([]);
  const [content, setContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    email: '',
    phone: '',
    notes: ''
  });

  // Check for localStorage only on the client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = getUser();
      if (user && user.cart) {
        setCart(user.cart);
      }
    }
  }, []);

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle navigation to the next step
  const handleNext = () => {
    if (typeof window !== 'undefined') {
    if (currentStep === 1) {
      // Validate form data before proceeding to the next step
      const user = getUser();
      user.cart = cart;
      localStorage.setItem('user', JSON.stringify(user));
    }
    if (currentStep === 2) {
      // Validate form data before proceeding to the next step
      const user = getUser();
      user.formData = formData;
      localStorage.setItem('user', JSON.stringify(user));
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }

    if (currentStep === 1 && !cart.length) {
      setIsOpen(true);
      setContent({
        title: 'Alerte.',
        content: 'Votre panier est vide.'
      })
      setCurrentStep(currentStep)
    }


    if (currentStep === 2 && !isFormFilled(formData)) {
      setIsOpen(true);
      setContent({
        title: 'Erreur.',
        content: 'Veuillez remplir tous les champs.'
      })
      setCurrentStep(currentStep)
      }
    }
  };


  const applyPromo = (e) => {
    e.preventDefault();  // Prevents default form submission
    console.log('Promo Submitted:', formData);
  };

  // Function to handle navigation to the previous step
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Handle form submission here
    console.log('Form Submitted:', formData);
    const response = await sendRequest(`/api/checkout`, 'POST', { formData, user: getUser(), cart });

    if (!response.error) {
      updateCartInServer([]);
      window.location.href = `${domain}/success`;
      console.log('donne');
    } else {
      console.log(response.error);
      setContent({
        type: 'error',
        title: 'Error',
        content: response.error
      });
      setIsOpen(true);
    }
  };

  // Function to render the appropriate component based on the current step
  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <Cart cart={cart} setCart={setCart} />;
      case 2:
        return <Checkout formData={formData} handleChange={handleChange} applyPromo={applyPromo} />;
      case 3:
        return <Finalize cart={cart} handleSubmit={handleSubmit} />;
      default:
        return <Cart cart={cart} setCart={setCart} />;
    }
  };

  return (
    <div className={styles["cart-container"]}>
      <div className={styles["container-of-all"]}>
        <div className={styles["secure"]}>
          <div className={styles["secure-order"]}>
            <span className={styles["secure-order-title"]}>Paiement Sécurisé</span>
            <div className={styles["vertical-line"]}></div>
            <span className={styles["secure-order-sub-title"]}>Aperçu de la Commande</span>
          </div>
          <div className={styles["order-timeline"]}>
            {/* Step indicators with dynamic classes for active step */}
            <div className={styles.timelines_Container}>
              <span className={`${currentStep >= 1 ? styles["active"] : ''} ${styles["order-timeline-number"]}`}>1</span>
              <span className={styles["order-timeline-info"]}>Informations Livraison</span>
              <span className={styles["small-lines"]}>- - - - </span>
            </div>
            <div className={styles.timelines_Container}>
              <span className={`${currentStep >= 2 ? styles["active"] : ''} ${styles["order-timeline-number"]}`}>2</span>
              <span className={styles["order-timeline-info"]}>Informations Personnelles</span>
              <span className={styles["small-lines"]}>- - - - </span>
            </div>
            <div className={styles.timelines_Container}>
              <span className={`${currentStep >= 3 ? styles["active"] : ''} ${styles["order-timeline-number"]}`}>3</span>
              <span className={styles["order-timeline-info"]}>Finaliser la commande</span>
            </div>
          </div>
        </div>

        <div className={styles["horizontal-line"]}></div>

        {/* Dynamically render the current step component */}
        {renderStepComponent()}

        <div className={styles["nextButton-container"]}>
          {/* Conditionally render the Previous button */}
          {currentStep > 1 && (
            <button className={styles["previous-button"]} onClick={handlePrevious}>
              Précédent
            </button>
          )}
          {/* Conditionally render the Next button */}
          {currentStep < 3 && (
            <button className={styles["next-button"]} onClick={handleNext}>
              Suivant
            </button>
          )}
          {content && <Popup isOpen={isOpen} onClose={() => setIsOpen(false)} title={content.title} content={content.content} />}
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
