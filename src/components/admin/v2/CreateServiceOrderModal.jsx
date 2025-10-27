import { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import SignatureCanvas from "react-signature-canvas";
import styles from "../../../styles/admin/v2/CreateServiceOrderModal.module.css";
import { showToast } from "../../../utils/toast";
import axiosInstance from "../../../api/axios";
import ButtonGroup from "./ButtonGroup";

Modal.setAppElement("#root");
const servicios = [
  "Seleccionar tipo de servicio",
  "Instalación",
  "Desinstalación",
  "Mantenimiento",
  "Reparación",
  "Diagnóstico",
];
const capacidades = ["9000BTU", "12000BTU", "18000BTU", "24000BTU", "36000BTU", "48000BTU", "5 Toneladas", "1/10HP", "1/8HP", "1/6HP", "1/5HP", "1/4HP", "1/3HP", "Otro"];
const voltajes = ["110V", "220V"];
const refrigerantes = ["R410A", "R22", "R32"];

const equipos = [
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

export default function CreateServiceOrderModal({ isOpen, onRequestClose }) {
  const [orderNumber, setOrderNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    direccion: "",
    telefono: "",
    email: "",
    servicio: servicios[0],
    equipo: equipos[0],
    capacidad: capacidades[0],
    voltaje: voltajes[0],
    refrigerante: refrigerantes[0],
    descripcion: "",
    valor: "",
    ubicacion: "",
    amperaje: "",
    marca: "",
    temperatura: "",
    psi: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const fetchOrderNumber = async () => {
      try {
        const res = await axiosInstance.get("/service-orders/next-number");
        setOrderNumber(res.data.nextOrderNumber);
      } catch (err) {
        showToast("Error obteniendo número de orden:" + err.message, "error");
      }
    };

    if (isOpen) fetchOrderNumber(); // Solo al abrir el modal
  }, [isOpen]);
  const sigCanvas = useRef(null);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (sigCanvas.current.isEmpty()) {
      showToast("Por favor, firma antes de enviar.", "warn");
      setLoading(false);
      return;
    }
    if (!termsAccepted) {
      showToast("Debes aceptar los términos y condiciones.", "warn");
      setLoading(false);
      return;
    }
    // ... (resto de la función handleSubmit)
  };

  const clearSignature = () => sigCanvas.current.clear();

  const formatCurrency = (e) => {
    let raw = e.target.value.replace(/\D/g, "");
    if (!raw) {
      setFormData((prev) => ({ ...prev, valor: "" }));
      return;
    }

    const formatted = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(parseInt(raw));

    setFormData((prev) => ({ ...prev, valor: formatted }));
  };

  const showTechnicalData = formData.servicio === "Reparación" || formData.servicio === "Diagnóstico";

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={styles.overlay}
      className={styles.modal}
    >
      <h2 className={styles.title}>Crear Orden de Servicio</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Datos del Cliente</h3>
          <div className={styles.grid}>
            <input name="nombre" type="text" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required className={styles.input} />
            <input name="apellido" type="text" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required className={styles.input} />
            <input name="cedula" type="text" placeholder="Cédula (Ej: 1002345678)" value={formData.cedula} onChange={handleChange} required className={styles.input} />
            <input name="direccion" type="text" placeholder="Dirección" value={formData.direccion} onChange={handleChange} required className={styles.input} />
            <input name="telefono" type="tel" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required className={styles.input} />
            <input name="email" type="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required className={styles.input} />
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Datos del Equipo</h3>
          <div className={styles.grid}>
            <select name="servicio" value={formData.servicio} onChange={handleChange} required className={styles.select}>
              {servicios.map((s, i) => <option key={i} value={s}>{s}</option>)}
            </select>
            <select name="equipo" value={formData.equipo} onChange={handleChange} required className={styles.select}>
              {equipos.map((e, i) => <option key={i} value={e}>{e}</option>)}
            </select>
            <ButtonGroup title="Capacidad" options={capacidades} selected={formData.capacidad} setSelected={(value) => setFormData({...formData, capacidad: value})} />
            <ButtonGroup title="Voltaje" options={voltajes} selected={formData.voltaje} setSelected={(value) => setFormData({...formData, voltaje: value})} />
            <ButtonGroup title="Refrigerante" options={refrigerantes} selected={formData.refrigerante} setSelected={(value) => setFormData({...formData, refrigerante: value})} />
          </div>
        </div>

        {showTechnicalData && (
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Datos Técnicos</h3>
            <div className={styles.grid}>
              <input type="text" name="ubicacion" placeholder="Ubicación" value={formData.ubicacion} onChange={handleChange} required className={styles.input} />
              <input type="text" name="amperaje" placeholder="Amperaje (Ej: 5A)" value={formData.amperaje} onChange={handleChange} required className={styles.input} />
              <input type="text" name="marca" placeholder="Marca" value={formData.marca} onChange={handleChange} required className={styles.input} />
              <input type="text" name="temperatura" placeholder="Temperatura (Ej: 12°C)" value={formData.temperatura} onChange={handleChange} required className={styles.input} />
              <input type="text" name="psi" placeholder="Presión en PSI (Ej: 60 PSI)" value={formData.psi} onChange={handleChange} required className={styles.input} />
            </div>
          </div>
        )}

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Diagnóstico u Observaciones</h3>
          <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} required className={styles.textarea} />
          <input name="valor" type="text" placeholder="Valor del servicio $" value={formData.valor} onChange={(e) => { handleChange(e); formatCurrency(e); }} required className={`${styles.input} ${styles.valorInput}`} />
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Firma y Cierre del Servicio</h3>
          <div className={styles.signatureContainer}>
            <p>Firma del cliente.</p>
            <SignatureCanvas ref={sigCanvas} penColor="black" minWidth={1} maxWidth={3} velocityFilterWeight={0.7} canvasProps={{ className: styles.signaturePad }} />
            <button type="button" onClick={clearSignature} className={styles.clearButton}>Limpiar Firma</button>
          </div>
        </div>

        <div className={styles.actionsContainer}>
          <div className={styles.termsContainer}>
            <input type="checkbox" id="terms" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} />
            <label htmlFor="terms">Acepto <a href="/terms-and-conditions" target="_blank">términos y condiciones</a></label>
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={onRequestClose} className={styles.cancelButton} disabled={loading}>Cancelar</button>
            <button type="submit" className={styles.secondaryButton} disabled={loading}>{loading ? "Enviando..." : "Enviar por Email"}</button>
            <button type="submit" className={styles.primaryButton} disabled={loading}>{loading ? "Guardando..." : "Guardar Orden"}</button>
          </div>
        </div>
      </form>
    </Modal>
  );
}