"use client";
import styles from './AdminPage.module.css';
import AdminSideNav from '../../components/adminSideNav/adminSideNav';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/auth/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner/loadingSpinner';

function AdminPage() {
    const { isAuthenticated, isAdmin, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) {
            return; // Wait for authentication status to be determined
        }

        if (!isAuthenticated) {
            router.push('/login');
        } else if (!isAdmin) {
            router.push('/'); // Redirect to home or a non-admin page
        }
    }, [isAuthenticated, isAdmin, isLoading, router]);

    const [currentContent, setCurrentContent] = useState(<LoadingSpinner />);

    if (isLoading || !isAuthenticated || !isAdmin) {
        return null; // Or a loading spinner/message while redirecting
    }

    const handleContent = (content: any) => {
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