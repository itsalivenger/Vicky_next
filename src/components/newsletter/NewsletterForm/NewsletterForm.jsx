import React from 'react';
import { Button } from '../../newsletterUi/Button/Button';
import { Icon } from '../../newsletterUi/Icon/Icon';
import styles from './NewsletterForm.module.css';

export function NewsletterForm({
  subject,
  content,
  sending,
  onSubjectChange,
  onContentChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="subject" className={styles.label}>
          Sujet
        </label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          className={styles.input}
          required
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="content" className={styles.label}>
          Contenu
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          rows={8}
          className={styles.input}
          required
        />
      </div>

      <Button className={styles.submitBtn} type="submit" disabled={sending}>
        <Icon name="send" className={styles.buttonIcon} />
        {sending ? 'Envoi en cours...' : 'Envoyer la newsletter'}
      </Button>
    </form>
  );
}