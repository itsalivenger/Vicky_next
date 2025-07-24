import React, { useEffect, useState } from 'react';
import { Card } from '../newsletterUi/Card/Card';
import { Icon } from '../newsletterUi/Icon/Icon';
import { SubscriberCount } from '../subscribers/SubscriberCount/SubscriberCount';
import { SubscriberList } from '../subscribers/SubscriberList/SubscriberList';
import { NewsletterForm } from '../newsletter/NewsletterForm/NewsletterForm';
import styles from './NewsletterDashboard.module.css';
import sendRequest from '../other/sendRequest';
import { serverDomain } from '../other/variables';
import Popup from '../popup/popup';

const mockSubscribers = [
  { id: 1, email: 'john@example.com', name: 'John Doe' },
  { id: 2, email: 'jane@example.com', name: 'Jane Smith' },
  { id: 3, email: 'bob@example.com', name: 'Bob Johnson' },
];

export default function NewsletterDashboard() {
  const [subject, setSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [sending, setSending] = useState(false);
  const [subscribers, setSubscribers] = useState(mockSubscribers);
  const [content, setContent] = useState('');
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await sendRequest(`${serverDomain}/newsletter`, 'GET');
        
        if (response.error) {
          console.log(response.error);
        } else {
          console.log(response);
          setSubscribers(response.subscribers);
        }
      } catch (error) {
        console.error('Error fetching subscribers:', error);
      }
    };
    fetchSubscribers();
  }, [])

  const handleSend = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await sendRequest(`/api/newsletter/admin`, 'POST', { subject, emailContent });
      
      if (response.error) {
        console.log(response.error);
        setContent({ title: "Error", content: response.error });
      } else {
        console.log(response);
        setContent({ title: "Success", content: "Email sent successfully" });
      }
      setIsOpen(true);
    } catch (error) {
      console.error('Error sending newsletter:', error);
    }
    setSubject('');
    setEmailContent('');
    setSending(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <Icon name="mail" className={styles.mailIcon} />
            Promouvoir vos produits
          </h1>
          <p className={styles.subtitle}>
            Gérez et envoyez des newsletters à vos abonnés
          </p>
        </header>

        <div className={styles.grid}>
          <SubscriberCount count={subscribers.length} />
        </div>

        <Card>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Composer Newsletter
            </h2>
            <NewsletterForm
              subject={subject}
              content={emailContent}
              sending={sending}
              onSubjectChange={setSubject}
              onContentChange={setEmailContent}
              onSubmit={handleSend}
            />
          </div>

          <div className={`${styles.section} ${styles.divider}`}>
            <h3 className={styles.sectionTitle}>
              Liste des abonnés
            </h3>
            <SubscriberList subscribers={subscribers} />
          </div>
        </Card>
        <Popup onClose={() => setIsOpen(false)} content={content.content} title={content.title} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
}