
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from '../styles/BackButton.module.css';

const BackButton = ({ className }) => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className={`${styles.backButton} ${className}`}>
      <ArrowLeft size={20} />
      <span>Volver</span>
    </button>
  );
};

export default BackButton;
