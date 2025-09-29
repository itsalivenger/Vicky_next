"use client";

import { useState } from "react";
import styles from "./ResetPass.module.css";
import Popup from "../../components/popup/popup";
import sendRequest from "../../components/other/sendRequest";

function ResetPass() {
    const [email, setEmail] = useState('');
    const [content, setContent] = useState({ title: '', content: '' });
    const [isPopupOpen, setIsPopupOpen] = useState(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await sendRequest(`/api/resetPass`, 'POST', { email });
        console.log(response);
        if (response.status === 200) {
            setContent({
                title: "Success",
                content: "Un e-mail de confirmation a bien eté envoyé."
            });
            openPopup();
        }else{
            setContent({
                title: "Error",
                content: response.error
            });
            openPopup();
        }
    }


    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleConfirm = () => {
        // Handle confirmation action

    };
    return (
        <div className={styles["container"]}>
            {content && <Popup
                isOpen={isPopupOpen}
                onClose={closePopup}
                onConfirm={handleConfirm}
                title={content.title}
                content={content.content}
            />}
            <form onSubmit={handleSubmit}>
                <div className={styles["pseudo-body"]}>
                    <div className={styles["form-container"]}>
                        <h1>Réinitialiser votre mot de passe</h1>
                        <p>Nous vous enverrons un e-mail pour réinitialiser votre mot de passe.</p>
                        <hr />

                        <div className={styles["input-container"]}>
                            <label>Adresse e-mail enregistrée*</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Adresse e-mail enregistrée" required />
                        </div>

                        <button type="submit" className={styles["reset-btn"]}>Réinitialiser le mot de passe</button>
                        <div className={styles["resend-div"]}>Vous n'avez pas reçu l'e-mail ? <span className={styles["resend"]}>Renvoyer a l'e-mail <span className={styles["time-remain"]}></span></span></div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ResetPass;