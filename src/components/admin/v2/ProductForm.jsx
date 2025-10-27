import { useRef, useState, useEffect } from "react";
import { Upload, X, Plus, Trash2 } from "lucide-react";
import styles from "../../../styles/admin/v2/ProductForm.module.css";
import PropTypes from "prop-types";
import { showToast } from '../../../utils/toast';

const ProductForm = ({ onSave, product, onClose }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    imageUrls: [],
    providersPrice: 0,
    profitPercentage: 0,
    quantity: 0,
    category: "",
    status: "Borrador",
    SKU: "",
    brand: "",
    specs: {},
    newImages: [],
  });
  const fileInputRef = useRef(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [removeBg, setRemoveBg] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || null,
        name: product.name || "",
        description: product.description || "",
        imageUrls: product.imageUrls || [],
        providersPrice: product.providersPrice || 0,
        profitPercentage: product.profitPercentage || 0,
        quantity: product.quantity || 0,
        category: product.category || "",
        status: product.status || "Borrador",
        SKU: product.SKU || "",
        brand: product.brand || "",
        specs: product.specs || {},
        newImages: [],
      });
      setImagePreviews(product.imageUrls || []);
      setNewImagePreviews([]);
    } else {
      setFormData({
        id: null,
        name: "",
        description: "",
        imageUrls: [],
        providersPrice: 0,
        profitPercentage: 0,
        quantity: 0,
        category: "",
        status: "publicado",
        discount: 0,
        specs: {},
        SKU: "",
        brand: "",
        newImages: [],
      });
      setImagePreviews([]);
      setNewImagePreviews([]);
    }
  }, [product]);

  useEffect(() => {
    if (!product) { // Only generate SKU for new products
      const namePart = formData.name.substring(0, 3).toUpperCase();
      const brandPart = formData.brand.substring(0, 3).toUpperCase();
      const categoryPart = formData.category.substring(0, 3).toUpperCase();
      
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let randomPart = '';
      for (let i = 0; i < 3; i++) {
        randomPart += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      
      if (namePart && brandPart && categoryPart) {
        const sku = `${namePart}-${brandPart}-${categoryPart}-${randomPart}`;
        setFormData(prev => ({ ...prev, SKU: sku }));
      }
    }
  }, [formData.name, formData.brand, formData.category, product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData((prev) => ({ ...prev, newImages: [...(prev.newImages || []), ...files] }));
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setNewImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index) => {
    const newImageUrls = [...formData.imageUrls];
    newImageUrls.splice(index, 1);
    setFormData(prev => ({ ...prev, imageUrls: newImageUrls }));
    
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  }

  const removeNewImage = (index) => {
    const newImages = [...formData.newImages];
    newImages.splice(index, 1);
    setFormData(prev => ({ ...prev, newImages }));

    const newPreviews = [...newImagePreviews];
    newPreviews.splice(index, 1);
    setNewImagePreviews(newPreviews);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let uploadedUrls = [...formData.imageUrls];

    if (formData.newImages && formData.newImages.length > 0) {
      setIsUploading(true);
      const uploadPromises = formData.newImages.map(async (file) => {
        let processedFile = file;
        if (removeBg) {
          const removeBgFormData = new FormData();
          removeBgFormData.append('image_file', file);
          try {
            const response = await fetch('https://api.remove.bg/v1.0/removebg', {
              method: 'POST',
              headers: { 'X-Api-Key': import.meta.env.VITE_REMOVEBG_API_KEY },
              body: removeBgFormData,
            });
            if (!response.ok) {
              if (response.status === 429) {
                const retryAfter = response.headers.get('Retry-After');
                const message = retryAfter
                  ? `Demasiadas solicitudes a la API de remove.bg. Por favor, inténtalo de nuevo en ${retryAfter} segundos.`
                  : 'Demasiadas solicitudes a la API de remove.bg. Por favor, inténtalo de nuevo en un momento.';
                throw new Error(message);
              }
              throw new Error('La eliminación del fondo falló');
            }
            const imageBlob = await response.blob();
            processedFile = new File([imageBlob], file.name, { type: 'image/png' });
          } catch (error) {
            showToast(error.message, "error");
            return null;
          }
        }

        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append('file', processedFile);
        cloudinaryFormData.append('upload_preset', 'products');

        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            { method: 'POST', body: cloudinaryFormData }
          );
          const data = await response.json();
          return data.secure_url;
        } catch (error) {
          showToast('Error uploading to Cloudinary', "error");
          return null;
        }
      });

      const newUrls = (await Promise.all(uploadPromises)).filter(Boolean);
      uploadedUrls = [...uploadedUrls, ...newUrls];
      setIsUploading(false);
    }

    const finalFormData = { ...formData, imageUrls: uploadedUrls };
    delete finalFormData.newImages;

    onSave(finalFormData);
  };

  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');

  const addSpec = () => {
    if (specKey.trim()) {
      const newSpecs = { ...formData.specs, [specKey.trim()]: specValue.trim() };
      setFormData((prev) => ({ ...prev, specs: newSpecs }));
      setSpecKey('');
      setSpecValue('');
    }
  };

  const removeSpec = (key) => {
    const newSpecs = { ...formData.specs };
    delete newSpecs[key];
    setFormData((prev) => ({ ...prev, specs: newSpecs }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <button onClick={onClose} className={styles.closeButton}>
          <X size={24} />
        </button>
        <h1 className={styles.title}>
          {product ? "Editar Producto" : "Agregar Producto"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label className={styles.label}>Imágenes del Producto</label>
              <div className={styles.imagePreviewContainer}>
                {imagePreviews.map((url, index) => (
                  <div key={index} className={styles.imagePreviewWrapper}>
                    <img src={url} alt={`Preview ${index}`} className={styles.imagePreview} />
                    <button type="button" onClick={() => removeImage(index)} className={styles.removeImageButton}><X size={16} /></button>
                  </div>
                ))}
                {newImagePreviews.map((url, index) => (
                  <div key={index} className={styles.imagePreviewWrapper}>
                    <img src={url} alt={`New Preview ${index}`} className={styles.imagePreview} />
                    <button type="button" onClick={() => removeNewImage(index)} className={styles.removeImageButton}><X size={16} /></button>
                  </div>
                ))}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                multiple
                style={{ display: "none" }}
              />
              <div className={styles.uploadActions}>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={styles.uploadButton}
                  disabled={isUploading}
                >
                  <Upload size={20} />
                  {isUploading ? 'Subiendo...' : 'Subir Imágenes'}
                </button>
                <div className={styles.checkboxContainer}>
                  <input 
                    type="checkbox" 
                    id="removeBg" 
                    checked={removeBg} 
                    onChange={(e) => setRemoveBg(e.target.checked)} 
                  />
                  <label htmlFor="removeBg">Quitar fondo</label>
                </div>
              </div>
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                className={styles.inputField}
                required
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>SKU</label>
              <input
                type="text"
                name="SKU"
                value={formData.SKU || ''}
                onChange={handleChange}
                className={styles.inputField}
                readOnly
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Marca</label>
              <input
                type="text"
                name="brand"
                value={formData.brand || ''}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Precio del proveedor</label>
              <input
                type="number"
                name="providersPrice"
                value={formData.providersPrice || ''}
                onChange={handleChange}
                className={styles.inputField}
                required
                step="0.01"
                min="0"
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Porcentage de ganancia (%)</label>
              <input
                type="number"
                name="profitPercentage"
                value={formData.profitPercentage || ''}
                onChange={handleChange}
                className={styles.inputField}
                required
                step="0.01"
                min="0"
              />
            </div>
            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label className={styles.label}>Descripción</label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                className={styles.inputField}
                rows={4}
                required
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Categoría</label>
              <input
                type="text"
                name="category"
                value={formData.category || ''}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Cantidad</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity || ''}
                onChange={handleChange}
                className={styles.inputField}
                required
                min="0"
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Estado</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={styles.inputField}
              >
                <option value="publicado">Publicado</option>
                <option value="borrador">Borrador</option>
                <option value="inactivo">Inactivo</option>
                <option value="agotado">Agotado</option>
              </select>
            </div>
            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label className={styles.label}>Especificaciones</label>
              <div className={styles.specInputContainer}>
                <input
                  type="text"
                  placeholder="Clave (ej: color)"
                  value={specKey}
                  onChange={(e) => setSpecKey(e.target.value)}
                  className={styles.inputField}
                />
                <input
                  type="text"
                  placeholder="Valor (ej: rojo)"
                  value={specValue}
                  onChange={(e) => setSpecValue(e.target.value)}
                  className={styles.inputField}
                />
                <button
                  type="button"
                  onClick={addSpec}
                  className={styles.addButton}
                >
                  <Plus size={16} />
                  Agregar
                </button>
              </div>
              {Object.entries(formData.specs).map(([key, value]) => (
                <div key={key} className={styles.specRow}>
                  <input
                    type="text"
                    value={key}
                    readOnly
                    className={styles.inputField}
                  />
                  <input
                    type="text"
                    value={value}
                    readOnly
                    className={styles.inputField}
                  />
                  <button
                    type="button"
                    onClick={() => removeSpec(key)}
                    className={styles.removeButton}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.submitButton} disabled={isUploading}>
              {isUploading ? 'Subiendo...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProductForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  product: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default ProductForm;