import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/admin/ProductForm.module.css';
import { X, Upload } from 'lucide-react';
import { showToast } from '../../utils/toast';

const SlideForm = ({ onSave, slide, onClose }) => {
  const [formData, setFormData] = useState({
    imageUrl: '',
    title: '',
    subtitle: '',
    cta: { text: '', link: '' },
  });
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    if (slide) {
      setFormData(slide);
      setImagePreview(slide.imageUrl);
    } else {
      setFormData({
        imageUrl: '',
        title: '',
        subtitle: '',
        cta: { text: '', link: '' },
      });
      setImagePreview(null);
    }
  }, [slide]);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setIsUploadingImage(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'slides'); // Use a different preset for slides

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await response.json();
        if (data.secure_url) {
          setFormData((prev) => ({ ...prev, imageUrl: data.secure_url }));
        } else {
          showToast('Error al subir la imagen a Cloudinary.', "error");
        }
      } catch (error) {
        showToast('Error al subir la imagen.', "error");
      } finally {
        setIsUploadingImage(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ctaText' || name === 'ctaLink') {
      setFormData(prev => ({ ...prev, cta: { ...prev.cta, [name === 'ctaText' ? 'text' : 'link']: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUploadingImage) {
      showToast('Por favor, espera a que la imagen termine de subir.', "warn");
      return;
    }
    onSave(formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <button onClick={onClose} className={styles.closeButton}><X size={24} /></button>
        <h2 className={styles.title}>{slide ? 'Editar Slide' : 'Agregar Slide'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label className={styles.label}>Imagen</label>
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
              <button type="button" onClick={() => fileInputRef.current?.click()} className={styles.uploadButton}>
                <Upload size={20} style={{ marginRight: 8 }} />
                Subir Imagen
              </button>
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>URL de la Imagen</label>
              <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="URL de la Imagen" required className={styles.inputField} />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Título</label>
              <input name="title" value={formData.title} onChange={handleChange} placeholder="Título" required className={styles.inputField} />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Subtítulo</label>
              <input name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="Subtítulo" className={styles.inputField} />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Texto del Botón</label>
              <input name="ctaText" value={formData.cta.text} onChange={handleChange} placeholder="Texto del Botón" className={styles.inputField} />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Enlace del Botón</label>
              <input name="ctaLink" value={formData.cta.link} onChange={handleChange} placeholder="Enlace del Botón" className={styles.inputField} />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
            <button type="submit" className={styles.submitButton} disabled={isUploadingImage}>
              {isUploadingImage ? 'Subiendo Imagen...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SlideForm;
