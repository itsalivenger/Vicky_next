import React, { useState, useEffect } from 'react';
import styles from './HandleCoupons.module.css';
import sendRequest from '../other/sendRequest';
import { serverDomain } from '../other/variables';

const HandleCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: '',
    minimumAmount: '',
    expirationDate: '',
    usageLimit: '',
    isActive: true
  });

  useEffect(() => {
    // Fetch coupons from the backend on component mount
    const fetchCoupons = async () => {
      const res = await sendRequest(`${serverDomain}/coupons`)
      if (res.error) {
        console.log(res.error);
      } else {
        const data = res;
        setCoupons(data.length ? data : []);
      }
    };

    fetchCoupons();
  }, []);

  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 8;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setFormData({ ...formData, code: result });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode && selectedCoupon) {
      // Update coupon on the backend
      const res = await sendRequest(`${serverDomain}/coupons/${selectedCoupon._id}`, 'PUT', { ...formData, isActive: selectedCoupon.isActive })
      console.log(res);

      setCoupons(coupons.map(coupon =>
        coupon._id === selectedCoupon._id ? { ...formData, isActive: selectedCoupon.isActive } : coupon
      ));
    } else {
      // Create new coupon on the backend
      const newCoupon = await sendRequest(`${serverDomain}/coupons`, 'POST', formData)
      setCoupons([...coupons, newCoupon]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      code: '',
      discountType: 'Pourcentage',
      discountValue: '',
      minimumAmount: '',
      expirationDate: '',
      usageLimit: '',
      isActive: true
    });
    setIsEditMode(false);
    setSelectedCoupon(null);
  };

  const handleEdit = (coupon) => {
    setFormData(coupon);
    setIsEditMode(true);
    window.scrollTo(0, 0);
    setSelectedCoupon(coupon);
  };

  const handleDelete = (coupon) => {
    setSelectedCoupon(coupon);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    const res = await sendRequest(`${serverDomain}/coupons/${selectedCoupon._id}`, 'DELETE')
    setCoupons(coupons.filter(c => c._id !== selectedCoupon._id));
    setShowDeleteModal(false);
    setSelectedCoupon(null);
  };

  const toggleStatus = async (coupon) => {
    const updatedCoupon = { ...coupon, isActive: !coupon.isActive };
    const res = await sendRequest(`/api/coupons/${coupon._id}`, 'PUT', updatedCoupon)
    console.log(res);
    setCoupons(coupons.map(c => c._id === coupon._id ? updatedCoupon : c));
  };

  const filteredCoupons = coupons.filter(coupon => {
    if (coupon.code) {
      const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'active' && coupon.isActive) ||
        (statusFilter === 'expired' && !coupon.isActive);
      const matchesType = typeFilter === 'all' || coupon.discountType === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    }
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Coupon Management</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <div className={styles.codeInput}>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              placeholder="Coupon Code"
              required
            />
            <button
              type="button"
              onClick={generateRandomCode}
              className={styles.generateBtn}
            >
              Générer un Code
            </button>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <select
              name="discountType"
              value={formData.discountType}
              onChange={handleInputChange}
              required
            >
              <option value="percentage">Pourcentage</option>
              <option value="fixed">Montant Fixe</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <input
              type="number"
              name="discountValue"
              value={formData.discountValue}
              onChange={handleInputChange}
              placeholder="Valeur Discount"
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <input
              type="number"
              name="minimumAmount"
              value={formData.minimumAmount}
              onChange={handleInputChange}
              placeholder="Montant Minimum du Commande"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="date"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <input
            type="number"
            name="usageLimit"
            value={formData.usageLimit}
            onChange={handleInputChange}
            placeholder="Usage Limit"
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          {isEditMode ? 'Mettre à jour Coupon' : 'Savegarder Coupon'}
        </button>
      </form>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Chercher des coupons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="expired">Expiré</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">All Types</option>
          <option value="percentage">Pourcentage</option>
          <option value="fixed">Montant Fixe</option>
        </select>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Réduction</th>
              <th>Montant Min.</th>
              <th>Date d'expiration</th>
              <th>Usage Limit</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoupons.map(coupon => (
              <tr key={coupon._id}>
                <td>{coupon.code}</td>
                <td>
                  {coupon.discountType === 'percentage'
                    ? `${coupon.discountValue}%`
                    : `${coupon.discountValue} DH`}
                </td>
                <td>{coupon.minimumAmount} DH</td>
                <td>{new Date(coupon.expirationDate).toLocaleDateString()}</td>
                <td>{coupon.usageLimit}</td>
                <td>
                  <span className={`${styles.status} ${coupon.isActive ? styles.active : styles.expired}`}>
                    {coupon.isActive ? 'Active' : 'Expiré'}
                  </span>
                </td>
                <td className={styles.actions}>
                  <button
                    onClick={() => handleEdit(coupon)}
                    className={styles.editBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleStatus(coupon)}
                    className={styles.toggleBtn}
                  >
                    {coupon.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(coupon)}
                    className={styles.deleteBtn}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Confirmer la suppression?</h3>
            <p>Etes vous Sur Vous Voulez Supprimer le Code Coupon: {selectedCoupon?.code}?</p>
            <div className={styles.modalActions}>
              <button
                onClick={confirmDelete}
                className={styles.deleteBtn}
              >
                Supprimer
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className={styles.cancelBtn}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HandleCoupons;