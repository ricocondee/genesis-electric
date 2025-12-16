import { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axios';
import SlideForm from './SlideForm';
import styles from '../../../styles/admin/v2/ProductsTable.module.css';
import { showToast } from '../../../utils/toast';

const HeroSliderSettings = () => {
  const [slides, setSlides] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);

  const fetchSlides = async () => {
    try {
      const response = await axiosInstance.get('/slides');
      setSlides(response.data);
    } catch (error) {
      showToast('Error fetching slides:' + error.message, "error");
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleAdd = () => {
    setEditingSlide(null);
    setShowForm(true);
  };

  const handleEdit = (slide) => {
    setEditingSlide(slide);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/slides/${id}`);
      fetchSlides();
      showToast('Slide eliminado exitosamente!', "success");
    } catch (error) {
      showToast('Error al eliminar el slide.', "error");
    }
  };

  const handleSave = async (slideData) => {
    try {
      if (slideData._id) {
        await axiosInstance.put(`/slides/${slideData._id}`, slideData);
      } else {
        await axiosInstance.post('/slides', slideData);
      }
      fetchSlides();
      setShowForm(false);
      showToast('Slide guardado exitosamente!', "success");
    } catch (error) {
      showToast('Error al guardar el slide.', "error");
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Configuración del Hero Slider</h1>
        <button className={styles.actionButton} onClick={handleAdd}>Agregar Nuevo Slide</button>
      </div>

      {showForm && (
        <SlideForm 
          onSave={handleSave} 
          slide={editingSlide} 
          onClose={() => setShowForm(false)} 
        />
      )}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Desktop</th>
              <th>Mobile</th>
              <th>Título</th>
              <th>Link</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {slides.map(slide => (
              <tr key={slide._id}>
                <td>
                    {slide.imageUrl ? (
                        <img src={slide.imageUrl} alt="Desk" className={styles.productImage} style={{width: '60px', height: '40px', objectFit:'cover'}} />
                    ) : <span style={{color:'#ccc'}}>N/A</span>}
                </td>
                <td>
                    {slide.mobileImageUrl ? (
                        <img src={slide.mobileImageUrl} alt="Mob" className={styles.productImage} style={{width: '30px', height: '40px', objectFit:'cover'}} />
                    ) : <span style={{color:'#ccc'}}>N/A</span>}
                </td>
                <td>{slide.title || '-'}</td>
                <td>{slide.cta ? slide.cta.link : '-'}</td>
                <td>
                  <div className={styles.actionsCell}>
                    <button className={styles.actionButton} onClick={() => handleEdit(slide)}>Editar</button>
                    <button className={styles.actionButton} onClick={() => handleDelete(slide._id)}>Eliminar</button>
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

export default HeroSliderSettings;