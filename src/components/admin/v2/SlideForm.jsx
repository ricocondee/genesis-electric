import { useState, useEffect, useRef } from 'react';
import styles from '../../../styles/admin/v2/ProductForm.module.css';
import { X, Upload, Smartphone, Monitor } from 'lucide-react';
import { showToast } from '../../../utils/toast';

const SlideForm = ({ onSave, slide, onClose }) => {
  const [formData, setFormData] = useState({
    imageUrl: '',       // Maps to Desktop Image
    mobileImageUrl: '', // Maps to Mobile Image
    title: '',
    subtitle: '',
    cta: { text: '', link: '' },
  });
  
  const desktopInputRef = useRef(null);
  const mobileInputRef = useRef(null);
  
  const [desktopPreview, setDesktopPreview] = useState(null);
  const [mobilePreview, setMobilePreview] = useState(null);
  
  const [uploadingDesktop, setUploadingDesktop] = useState(false);
  const [uploadingMobile, setUploadingMobile] = useState(false);

  useEffect(() => {
    if (slide) {
      setFormData(slide);
      setDesktopPreview(slide.imageUrl);
      setMobilePreview(slide.mobileImageUrl);
    } else {
      setFormData({
        imageUrl: '',
        mobileImageUrl: '',
        title: '',
        subtitle: '',
        cta: { text: '', link: '' },
      });
      setDesktopPreview(null);
      setMobilePreview(null);
    }
  }, [slide]);

  const handleUpload = async (file, setPreview, setUrl, setIsUploading) => {
    if (file) {
      setPreview(URL.createObjectURL(file));
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'slides');

      try {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        if (!cloudName) throw new Error("Missing Cloudinary Cloud Name");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: 'POST', body: formData }
        );
        const data = await response.json();
        
        if (data.secure_url) {
          setUrl(data.secure_url);
        } else {
          showToast('Error Cloudinary: ' + (data.error?.message || 'Unknown'), "error");
        }
      } catch (error) {
        console.error("Upload error:", error);
        showToast('Error al subir imagen: ' + error.message, "error");
      } finally {
        setIsUploading(false);
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
    if (uploadingDesktop || uploadingMobile) {
      showToast('Espera a que las imágenes terminen de subir.', "warn");
      return;
    }
    
    // Backend requires imageUrl (Desktop).
    if (!formData.imageUrl) {
        showToast('La imagen de escritorio es obligatoria.', "error");
        return;
    }

    onSave(formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <button onClick={onClose} className={styles.closeButton}><X size={24} /></button>
        <h2 className={styles.title}>{slide ? 'Editar Slide (Responsive)' : 'Nuevo Slide (Responsive)'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            
            {/* Desktop Image Section */}
            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label className={styles.label} style={{display:'flex', alignItems:'center', gap:'8px'}}>
                <Monitor size={18}/> Imagen Desktop (Horizontal)
              </label>
              
              {desktopPreview && (
                <img src={desktopPreview} alt="Desktop Preview" className={styles.imagePreview} style={{width: '100%', height:'150px', objectFit:'cover'}} />
              )}
              
              <input 
                type="file" 
                ref={desktopInputRef}
                onChange={(e) => handleUpload(
                    e.target.files[0],
                    setDesktopPreview,
                    (url) => setFormData(p => ({...p, imageUrl: url})),
                    setUploadingDesktop
                )} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
              <button type="button" onClick={() => desktopInputRef.current?.click()} className={styles.uploadButton}>
                <Upload size={20} style={{ marginRight: 8 }} />
                {uploadingDesktop ? 'Subiendo...' : 'Subir Imagen Desktop'}
              </button>
              <input name="imageUrl" value={formData.imageUrl} disabled placeholder="URL generada automáticamente" className={styles.inputField} style={{marginTop: '0.5rem', background: '#eee'}} />
            </div>

            {/* Mobile Image Section */}
            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label className={styles.label} style={{display:'flex', alignItems:'center', gap:'8px'}}>
                <Smartphone size={18}/> Imagen Mobile (Vertical)
              </label>
              
              {mobilePreview && (
                <img src={mobilePreview} alt="Mobile Preview" className={styles.imagePreview} style={{width: '150px', height:'200px', objectFit:'cover', margin: '0 auto'}} />
              )}
              
              <input 
                type="file" 
                ref={mobileInputRef}
                onChange={(e) => handleUpload(
                    e.target.files[0],
                    setMobilePreview,
                    (url) => setFormData(p => ({...p, mobileImageUrl: url})),
                    setUploadingMobile
                )} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
              <button type="button" onClick={() => mobileInputRef.current?.click()} className={styles.uploadButton}>
                <Upload size={20} style={{ marginRight: 8 }} />
                {uploadingMobile ? 'Subiendo...' : 'Subir Imagen Mobile'}
              </button>
              <input name="mobileImageUrl" value={formData.mobileImageUrl || ''} disabled placeholder="URL generada automáticamente" className={styles.inputField} style={{marginTop: '0.5rem', background: '#eee'}} />
            </div>

            {/* Text Fields */}
            <div className={styles.formField}>
              <label className={styles.label}>Título (Alt Text)</label>
              <input name="title" value={formData.title} onChange={handleChange} placeholder="Título del slide" className={styles.inputField} />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Subtítulo</label>
              <input name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="Subtítulo opcional" className={styles.inputField} />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Texto Botón</label>
              <input name="ctaText" value={formData.cta.text} onChange={handleChange} placeholder="Ej: Ver Ofertas" className={styles.inputField} />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Link Botón</label>
              <input name="ctaLink" value={formData.cta.link} onChange={handleChange} placeholder="/products" className={styles.inputField} />
            </div>

          </div>
          <div className={styles.buttonContainer}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
            <button type="submit" className={styles.submitButton} disabled={uploadingDesktop || uploadingMobile}>
              Guardar Slide
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SlideForm;
