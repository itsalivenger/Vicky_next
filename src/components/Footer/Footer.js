"use client";
import { useState } from "react";
import styles from "./Footer.module.css";
import sendRequest from "../../components/other/sendRequest";
import { serverDomain } from "../../components/other/variables";
import Popup from "../../components/popup/popup";
import SocialMedia from "../socialMedia/socialMedia";
import LazyMedia from "../lazyMedia/LazyMedia";

import Link from 'next/link';
import { useTheme } from "../other/useTheme.js";

const Footer = () => {
    const { theme } = useTheme();
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState("");
    const [content, setContent] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Email:", email);
        const response = await sendRequest(`/api/newsletter`, 'POST', { email });
        if (response.status === 200) {
            console.log('object');
            setContent({
                type: 'success',
                title: 'Success',
                message: 'You have successfully subscribed to our newsletter!'
            });
            setIsOpen(true);
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

    const closePopup = () => {
        setContent(null);
        setIsOpen(false);
    };


    return (
        <footer className={`${styles["footer-container"]} ${theme === 'dark' ? 'dark' : 'light'}`}>
            <div className={styles["footer-content"]}>
                {content && <Popup isOpen={isOpen} onClose={closePopup} title={content.title} content={content.content} setContent={setContent} />}
                <div className={styles["footer-top"]}>
                    <div className={styles["footer-brand"]}>
                        <div className={styles["logo"]}>
                            <LazyMedia type="image" src="/images/logos/HeatzLogo.png" alt="Logo" />
                        </div>

                        <SocialMedia />

                        <p className={`${styles["footer-description"]}`}>
                            Heatz® est une marque déposée, désormais fièrement disponible au Maroc. Connue pour sa large variété et ses produits de haute qualité, Heatz® a marqué sa présence à l'échelle mondiale, notamment au Moyen-Orient et en Afrique du Nord. Nos clients marocains peuvent découvrir des produits innovants Heatz® conçus pour améliorer chaque saison, des écouteurs de premier choix aux derniers accessoires technologiques.
                        </p>
                        <form onSubmit={handleSubmit} className={styles["newsletter-form"]}>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={styles["newsletter-input"]} placeholder="Entrez votre adresse e-mail" />
                            <button type="submit" className={styles["newsletter-button"]}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
                                </svg>
                            </button>
                            <div className={styles["checkbox-container"]}>
                                <input type="checkbox" id="privacy" />
                                <label htmlFor="privacy">Je confirme l'acceptation de la Politique de Confidentialité et consens à ses termes, y compris l'utilisation de cookies.</label>
                            </div>
                        </form>
                    </div>

                    <div className={styles["footer-column"]}>
                        <h3>Accessoires Tel & Pc</h3>
                        <ul className={styles["footer-links"]}>
                            <li><a href="./">Écouteurs</a></li>
                            <li><a href="./">Câbles</a></li>
                            <li><a href="./">Adaptateurs</a></li>
                            <li><a href="./">Batteries</a></li>
                            <li><a href="./">Supports</a></li>
                            <li><a href="./">Haut-parleurs</a></li>
                        </ul>
                    </div>

                    <div className={styles["footer-column"]}>
                        <h3>Autre Accessoires</h3>
                        <ul className={styles["footer-links"]}>
                            <li><a href="./">Câbles</a></li>
                            <li><a href="./">Adaptateurs</a></li>
                            <li><a href="./">Batterie externe</a></li>
                            <li><a href="./">Chargeur de voiture</a></li>
                            <li><a href="./">Montres connectées</a></li>
                            <li><a href="./">Gaming</a></li>
                        </ul>
                    </div>

                    <div className={styles["footer-column"]}>
                        <h3>Aide & Support</h3>
                        <ul className={styles["footer-links"]}>
                            <li><Link href="/contact">Contactez-nous</Link></li>
                            <li><a href="./">FAQs</a></li>
                            <li><a href="./">Expédition & Retours</a></li>
                            <li><a href="./">Suivi de votre commande</a></li>
                            <li><Link href="/about">À propos de nous</Link></li>
                            <li><Link href="https://www.termsfeed.com/live/7952c1ba-4474-4880-96dc-d1203e7fc4a9">Conditions générales</Link></li>
                        </ul>
                    </div>
                </div>

                <div className={styles["footer-bottom"]}>
                    <p>Copyright © {currentYear} Heatz - Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
