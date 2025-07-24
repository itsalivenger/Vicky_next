import React, { useState } from "react";
import styles from "./contactSocieteForm.module.css";
import sendRequest from "../other/sendRequest";
import { serverDomain } from "../other/variables";
import Popup from "../popup/popup";

function SellerForm({ flipCard }) {
  const [societe, setSociete] = useState("");
  const [ice, setIce] = useState("");
  const [ville, setVille] = useState("");
  const [numeroFix, setNumeroFix] = useState("");
  const [numeroTelephone, setNumeroTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [besoin, setBesoin] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      societe,
      ice,
      ville,
      numeroFix,
      numeroTelephone,
      email,
      besoin,
    });

    const response = await sendRequest(`/api/contactSociete`, "POST", {
      societe,
      ice,
      ville,
      numeroFix,
      numeroTelephone,
      email,
      besoin,
    });

    if (response.error) {
      console.log(response.error);
    } else {
      console.log(response);
    }

    resetInputs();
  };

  const resetInputs = () => {
    setSociete("");
    setIce("");
    setVille("");
    setNumeroFix("");
    setNumeroTelephone("");
    setEmail("");
    setBesoin("");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Formulaire pour les Vendeurs</h1>
      <p className={styles.subtitle}>
        Remplissez ce formulaire pour nous fournir des informations sur votre entreprise.
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          value={societe}
          onChange={(e) => setSociete(e.target.value)}
          className={styles.input}
          type="text"
          placeholder="Nom de la société"
          required
        />
        <input
          value={ice}
          onChange={(e) => setIce(e.target.value)}
          className={styles.input}
          type="text"
          placeholder="ICE"
          required
        />
        <input
          value={ville}
          onChange={(e) => setVille(e.target.value)}
          className={styles.input}
          type="text"
          placeholder="Ville"
          required
        />
        <input
          value={numeroFix}
          onChange={(e) => setNumeroFix(e.target.value)}
          className={styles.input}
          type="text"
          placeholder="Numéro Fix"
          required
        />
        <input
          value={numeroTelephone}
          onChange={(e) => setNumeroTelephone(e.target.value)}
          className={styles.input}
          type="text"
          placeholder="Numéro Téléphone"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          type="email"
          placeholder="Email"
          required
        />
        <textarea
          value={besoin}
          onChange={(e) => setBesoin(e.target.value)}
          className={`${styles.input} ${styles.textarea}`}
          placeholder="Vos besoins"
          required
        />
        <p className={styles.explanation}>
          Ce formulaire est destiné aux vendeurs souhaitant collaborer avec nous. Merci de fournir des informations précises.
        </p>
        <div className={styles.buttons}>
          <button type="submit" className={styles.submitBtn}>
            ENVOYER
          </button>
          <button type="button" onClick={resetInputs} className={styles.resetBtn}>
            RÉINITIALISER
          </button>
          <button type="button" onClick={flipCard} className={styles.flipButton}>
            Individuel
          </button>
        </div>
        <Popup
          content={content.content}
          title={content.title}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </form>
    </div>
  );
}

export default SellerForm;