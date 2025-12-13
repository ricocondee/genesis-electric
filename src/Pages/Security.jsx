import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import styles from '../styles/Security.module.css';
import { showToast } from '../utils/toast';
import axiosInstance from '../api/axios';

const Security = () => {
  const { user } = useUser();
  const [sessions, setSessions] = useState([]);

  const fetchSessions = async () => {
    try {
      const response = await axiosInstance.get('/auth/sessions');
      setSessions(response.data.data);
    } catch (error) {
      showToast('Error al cargar las sesiones', 'error');
    }
  };

  useEffect(() => {
    if (user) {
      fetchSessions();
    }
  }, [user]);

  const handleRevokeSession = async (sessionId) => {
    try {
      await axiosInstance.delete(`/auth/sessions/${sessionId}`);
      showToast('Sesión revocada exitosamente', 'success');
      fetchSessions();
    } catch (error) {
      showToast('Error al revocar la sesión', 'error');
    }
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Seguridad de la Cuenta</h2>
      <div className={styles.sessionsContainer}>
        <h3>Sesiones Activas</h3>
        {sessions.map((session) => (
          <div key={session._id} className={styles.session}>
            <div className={styles.sessionInfo}>
              <p><strong>Dispositivo:</strong> {session.deviceInfo.userAgent}</p>
              <p><strong>Dirección IP:</strong> {session.ipAddress}</p>
              <p><strong>Último acceso:</strong> {new Date(session.createdAt).toLocaleString()}</p>
            </div>
            <button onClick={() => handleRevokeSession(session._id)} className={styles.revokeButton}>Revocar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Security;
