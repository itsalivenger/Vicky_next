import styles from './checkout.module.css';

function Checkout({ formData, handleChange, applyPromo }) {
    return (
        <div className={styles["container-of-all"]}>
            <form>
                <div className={styles["checkout"]}>
                    <div className={styles["billing-container"]}>
                        <span className={styles["billing-title"]}>Détails de Facturation</span>
                        <div className={styles["sub-inputs-container"]}>
                            <input name='firstName' onChange={handleChange} value={formData.firstName} className={`${styles["billing-input"]} ${styles["sub"]}`} type="text" maxLength="50" placeholder="Prénom" />
                            <input name='lastName' onChange={handleChange} value={formData.lastName} className={`${styles["billing-input"]} ${styles["sub"]}`} type="text" maxLength="50" placeholder="Nom de famille" />
                        </div>
                        <input name='address' onChange={handleChange} value={formData.address} className={styles["billing-input"]} type="text" maxLength="100" placeholder="Adresse" />
                        <input name='apartment' onChange={handleChange} value={formData.apartment} className={styles["billing-input"]} type="text" maxLength="100" placeholder="Appartement, suite, unité, etc." />
                        <div className={styles["sub-inputs-container"]}>
                            <input name='city' onChange={handleChange} value={formData.city} className={`${styles["billing-input"]} ${styles["sub"]}`} type="text" maxLength="50" placeholder="Ville" />
                            <input name='postalCode' onChange={handleChange} value={formData.postalCode} className={`${styles["billing-input"]} ${styles["sub"]}`} type="number" maxLength="50" placeholder="Code Postal" />
                        </div>
                        <div className={styles["sub-inputs-container"]}>
                            <input name='email' onChange={handleChange} value={formData.email} className={`${styles["billing-input"]} ${styles["sub"]}`} type="email" maxLength="50" placeholder="Adresse Email" />
                            <input name='phone' onChange={handleChange} value={formData.phone} className={`${styles["billing-input"]} ${styles["sub"]}`} type="number" maxLength="50" placeholder="Téléphone" />
                        </div>
                        <textarea name='notes' onChange={handleChange} value={formData.notes} className={styles["other-notes"]} placeholder="Si vous avez d'autres notes!"></textarea>
                    </div>

                    <div className={styles["coupon-container"]}>
                        <span className={styles["coupon-title"]}>Code Promo</span>
                        <span className={styles["coupon-sub-title"]}>Entrez votre code promo si vous en avez un</span>
                        <div className={styles["coupon-inputs-container"]}>
                            <input name='promoCode' onChange={handleChange} value={formData.promoCode} className={`${styles["billing-input"]} ${styles["coupon-input"]}`} type="text" placeholder="Code Promo" />
                            <button onClick={applyPromo} type='submit' className={styles["coupon-apply"]}>Appliquer</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Checkout;