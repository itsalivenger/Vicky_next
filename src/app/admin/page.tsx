"use client";

import styles from './AdminPage.module.css';
import AdminSideNav from '../../components/adminSideNav/adminSideNav';
import { useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/loadingSpinner';


function AdminPage() {
    const [currentContent, setCurrentContent] = useState(<LoadingSpinner />);

    const handleContent = (content) => {
        setCurrentContent(content);
    }


    return (
        <div className={styles["admin-page"]}>
            <AdminSideNav handleContent={handleContent} />
            <div className={styles["admin-page-content"]}>
                {currentContent}
            </div>
        </div>
    );
}

export default AdminPage;