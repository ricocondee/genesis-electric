import { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import axiosInstance from "../api/axios";
import { useUser } from "../context/UserContext";
import { showToast } from '../utils/toast';
import styles from "../styles/ServiceOrderModal.module.css";

const serviceTypes = [
  "Seleccionar tipo de servicio",
  "Instalación",
  "Desinstalación",
  "Mantenimiento",
  "Reparación",
  "Revisión",
];
const capacities = [
  "Seleccionar capacidad",
  "9000BTU",
  "12000BTU",
  "18000BTU",
  "24000BTU",
  "36000BTU",
  "48000BTU",
  "5 toneladas",
  "1/10",
  "1/8",
  "1/6",
  "1/5",
  "1/4",
  "1/3",
];
const voltages = ["Seleccione el voltaje", "110V", "220V"];

const equipmentTypes = [
  "Seleccionar Equipo",
  "Mini-Split",
  "Central",
  "Piso Techo",
  "Casette",
  "Fan Coil Desnudo",
  "Cuarto Frío",
  "Nevera",
  "Congelador",
];

const refrigerants = [
  "Seleccionar refrigerante",
  "R410A",
  "R32",
  "R22",
  "R134A",
  "R404A",
  "R600A",
];

const ServiceOrderForm = ({ onClose }) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    natId: "",
    address: "",
    phone: "",
    email: "",
    serviceType: serviceTypes[0],
    equipmentType: equipmentTypes[0],
    capacity: capacities[0],
    voltage: voltages[0],
    refrigerant: refrigerants[0],
    description: "",
    cost: "",
    location: "",
    amperage: "",
    brand: "",
    temperature: "",
    pressure: "",
  });
  const sigCanvas = useRef(null);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (sigCanvas.current.isEmpty()) {
      showToast("Por favor, provea una firma.", "warn");
      setLoading(false);
      return;
    }

    const signature = sigCanvas.current.toDataURL("image/png");

    const orderData = {
      ...formData,
      cost: parseFloat(formData.cost.toString().replace(/[^0-9]/g, '')),
      username: user?.name || 'N/A',
      userId: user?._id,
      signature,
      createdAt: new Date().toISOString(),
    };

    try {
      await axiosInstance.post("service-orders", orderData);
      showToast("¡Orden de servicio creada con éxito!", "success");
      onClose();
    } catch (error) {
      showToast("Error al crear la orden de servicio.", "error");
    } finally {
      setLoading(false);
    }
  };

  const clearSignature = () => sigCanvas.current.clear();

  const formatCurrency = (e) => {
    let raw = e.target.value.replace(/\D/g, "");
    if (!raw) {
      setFormData((prev) => ({ ...prev, cost: "" }));
      return;
    }

    const formatted = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(parseInt(raw));

    setFormData((prev) => ({ ...prev, cost: formatted }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Crear Orden de Servicio</h2>
        <input name="firstName" type="text" placeholder="Nombre" value={formData.firstName} onChange={handleChange} required className={styles.input} />
        <input name="lastName" type="text" placeholder="Apellido" value={formData.lastName} onChange={handleChange} required className={styles.input} />
        <input name="nationalId" type="text" placeholder="Cédula" value={formData.nationalId} onChange={handleChange} required className={styles.input} />
        <input name="address" type="text" placeholder="Dirección" value={formData.address} onChange={handleChange} required className={styles.input} />
        <input name="phone" type="tel" placeholder="Teléfono" value={formData.phone} onChange={handleChange} required className={styles.input} />
        <input name="email" type="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} required className={styles.input} />
        <select name="serviceType" value={formData.serviceType} onChange={handleChange} required className={styles.select}>
            {serviceTypes.map((s, i) => (<option key={i} value={s}>{s}</option>))}
        </select>
        <select name="equipmentType" value={formData.equipmentType} onChange={handleChange} required className={styles.select}>
            {equipmentTypes.map((e, i) => (<option key={i} value={e}>{e}</option>))}
        </select>
        <select name="capacity" value={formData.capacity} onChange={handleChange} required className={styles.select}>
            {capacities.map((c, i) => (<option key={i} value={c}>{c}</option>))}
        </select>
        <select name="voltage" value={formData.voltage} onChange={handleChange} required className={styles.select}>
            {voltages.map((v, i) => (<option key={i} value={v}>{v}</option>))}
        </select>
        <select name="refrigerant" value={formData.refrigerant} onChange={handleChange} required className={styles.select}>
            {refrigerants.map((s, i) => (<option key={i} value={s}>{s}</option>))}
        </select>
        <input type="text" name="location" placeholder="Ubicación" value={formData.location} onChange={handleChange} required className={styles.input} />
        <input type="text" name="amperage" placeholder="Amperaje" value={formData.amperage} onChange={handleChange} required className={styles.input} />
        <input type="text" name="brand" placeholder="Marca" value={formData.brand} onChange={handleChange} required className={styles.input} />
        <input type="text" name="temperature" placeholder="Temperatura" value={formData.temperature} onChange={handleChange} required className={styles.input} />
        <input type="text" name="pressure" placeholder="Presión (PSI)" value={formData.pressure} onChange={handleChange} required className={styles.input} />
        <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} required className={styles.textarea} />
        <input name="cost" type="text" placeholder="Costo del Servicio $" value={formData.cost} onChange={(e) => { handleChange(e); formatCurrency(e); }} required className={`${styles.input} ${styles.valorInput}`} />

        <div className={styles.signatureContainer}>
            <p>Firma del Cliente</p>
            <SignatureCanvas ref={sigCanvas} penColor="black" canvasProps={{ className: styles.signaturePad }} />
            <button type="button" onClick={clearSignature} className={styles.clearButton}>Limpiar Firma</button>
        </div>
        <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelButton} disabled={loading}>Cancelar</button>
            <button type="submit" className={styles.submitButton} disabled={loading}>{loading ? "Enviando..." : "Crear Orden"}</button>
        </div>
        <span className={styles.notice}>Al firmar esta orden, aceptas nuestros <a href="/terms-and-conditions" target="_blank">Términos y Condiciones</a> y nuestras <a href="/privacy-policy" target="_blank">Políticas de privacidad</a>.</span>
    </form>
  );
};

export default ServiceOrderForm;
