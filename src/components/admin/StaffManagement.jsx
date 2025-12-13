import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';
import StaffForm from './StaffForm';
import styles from '../../styles/admin/ProductsTable.module.css';
import { showToast } from '../../utils/toast';

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const fetchStaff = async () => {
    try {
      const response = await axiosInstance.get('/staff');
      setStaff(response.data);
    } catch (error) {
      showToast('Error fetching staff:' + error.message, "error");
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleAdd = () => {
    setEditingStaff(null);
    setShowForm(true);
  };

  const handleEdit = (staffMember) => {
    setEditingStaff(staffMember);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/staff/${id}`);
      fetchStaff();
      showToast('Miembro del personal eliminado exitosamente!', "success");
    } catch (error) {
      showToast('Error al eliminar el miembro del personal.', "error");
    }
  };

  const handleSave = async (staffData) => {
    try {
      if (editingStaff) {
        await axiosInstance.put(`/staff/${editingStaff._id}`, staffData);
      } else {
        await axiosInstance.post('/staff', staffData);
      }
      fetchStaff();
      setShowForm(false);
      showToast('Miembro del personal guardado exitosamente!', "success");
    } catch (error) {
      showToast('Error al guardar el miembro del personal.', "error");
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Gestión de Personal</h2>
        <button className={styles.actionButton} onClick={handleAdd}>Agregar Personal</button>
      </div>

      {showForm && (
        <StaffForm 
          onSave={handleSave} 
          staffMember={editingStaff} 
          onClose={() => setShowForm(false)} 
        />
      )}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo Electrónico</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {staff.map(member => (
              <tr key={member._id}>
                <td>{member.name || 'N/A'}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td>
                  <div className={styles.actionsCell}>
                    <button className={styles.actionButton} onClick={() => handleEdit(member)}>Editar</button>
                    <button className={styles.actionButton} onClick={() => handleDelete(member._id)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffManagement;