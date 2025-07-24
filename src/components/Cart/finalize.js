"use client";

import Link from "next/link";
import { getTotal, getUser } from "../other/usefulFunctions";
import styles from "./finalize.module.css";
import { useEffect, useState } from "react";

function Finalize({ handleSubmit, cart }) {
    const [total, setTotal] = useState(getTotal(cart || []));
    const [user] = useState(getUser());
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setTotal(getTotal(cart || []));
    }, [cart]);

    return (
        <div className={styles["finalize"]}>
            <span className={styles["finalize-title"]}>Finaliser la Commande</span>
            <span className={styles["finalize-sub-title"]}>Récapitulatif de Commande</span>

            <div className={styles["order-summary"]}>
                <h1>Order Summary</h1>
                {cart?.map((item) => (
                    <div className={styles["order-summary-item"]} key={item._id || item.productName}>
                        <span className={styles["order-summary-item-label"]}>
                            {item.productName} ({item.quantity})
                        </span>
                        <span>{item.price} DH</span>
                    </div>
                ))}
                <div className={styles["order-summary-total"]}>Total: {total} DH</div>
            </div>

            <div className={styles["delivery-info"]}>
                <h1>Delivery Information</h1>
                {user?.formData ? (
                    <>
                        <div className={styles["info-item"]}>
                            <span className={styles["labelAdress"]}>Address:</span> {user.formData.address}
                        </div>
                        <div className={styles["info-item"]}>
                            <span className={styles["labelAdress"]}>Phone:</span> {user.formData.phone}
                        </div>
                    </>
                ) : (
                    <div className={styles["info-item"]}>Aucune adresse trouvée.</div>
                )}
                <div className={styles["info-item"]}>
                    <span className={styles["labelAdress"]}>Email:</span> {user?.email || "Non fourni"}
                </div>
                <div className={styles["info-item"]}>
                    <span className={styles["labelAdress"]}>Payment Method:</span> Cash On Delivery
                </div>
            </div>

            <div className={styles["confirmation-container"]}>
                <span className={styles["confirmation-title"]}>Confirmation</span>
                <label className={styles["check-container"]}>
                    <input
                        type="checkbox"
                        className={styles["check-input"]}
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <span className={styles["accept-conditions"]}>
                        J'accepte les <Link href="/conditions" className={styles["condition-and-terms"]}>conditions générales</Link>.
                    </span>
                </label>
            </div>


            <button
                onClick={handleSubmit}
                className={styles["confirmation-button"]}
                disabled={!isChecked}
            >
                Confirmer la Commande
            </button>
        </div>
    );
}

export default Finalize;
