import { useState, useEffect, useCallback } from 'react';
import styles from '../styles/AddressesPage.module.css';
import { showToast } from '../utils/toast';
import axiosInstance from '../api/axios';
import AddressCard from '../components/AddressCard';
import AddressForm from '../components/AddressForm';
import ConfirmationModal from '../components/ConfirmationModal';
import { useUser } from '../context/UserContext';

const AddressesPage = () => {
  const { user, setUser } = useUser();
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleEditAddress = () => {
    setShowAddressForm(true);
  };

  const handleSaveAddress = useCallback(async (addressData) => {
  try {
    const response = await axiosInstance.patch('/auth/profile', { address: addressData });
    setUser(response.data.data);
    showToast('Dirección actualizada exitosamente.', 'success');
    setShowAddressForm(false);
  } catch (error) {
    console.error('Error caught:', error);
    console.error('Error response:', error.response);
    console.error('Error response data:', error.response?.data);
    const message = error.response?.data?.message || 'Error al guardar la dirección.';
    showToast(message, 'error');
  }
}, [setUser]);

  if (!user) return <div>Cargando...</div>;

  return (
    <div className={styles.addressesPage}>
      <h2>Mis Direcciones</h2>

      {showAddressForm && (
        <AddressForm
          address={user.address}
          onSave={handleSaveAddress}
          onClose={() => setShowAddressForm(false)}
        />
      )}

      <div className={styles.addressList}>
        {user.address ? (
          <AddressCard
            address={user.address}
            onEdit={handleEditAddress}
            onDelete={() => showToast('No se puede eliminar la dirección principal.', 'info')}
          />
        ) : (
          <p>No tienes una dirección principal. <button onClick={handleEditAddress} className={styles.addAddressButton}>Agregar Dirección</button></p>
        )}
      </div>
    </div>
  );
};

export default AddressesPage;
