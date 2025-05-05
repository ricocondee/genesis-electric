// ServiceOrderModal.js
import { useState, useRef } from "react";
import Modal from "react-modal";
import SignatureCanvas from "react-signature-canvas";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Plus } from "lucide-react";
import emailjs from "emailjs-com";
import styles from "../styles/ServiceOrderButton.module.css";

// Instalar dependencias:
// npm install react-modal jspdf react-signature-canvas lucide-react html2canvas

Modal.setAppElement("#root");
const servicios = ["Instalación", "Mantenimiento", "Reparación", "Inspección"];

export default function ServiceOrderButton() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
    descripcion: "",
  });
  const sigCanvas = useRef(null);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Obtener IP pública
    let ip = "Desconocida";
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      ip = (await res.json()).ip;
    } catch (error) {
      console.error("Error fetching IP:", error);
    }

    // Capturar firma
    const canvasSig = sigCanvas.current;
    const signatureData = canvasSig?.toDataURL("image/png");

    //Numero de orden
    setOrderNumber((prevOrderNumber) => prevOrderNumber + 1);

    // Preparar container para html2canvas
    const container = document.createElement("div");
    Object.assign(container.style, {
      position: "absolute",
      left: "-9999px",
      width: "595px",
    });
    container.innerHTML = `
      <div style="font-family:Arial,sans-serif;padding:20px;color:#00072d;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <h2 style="margin:0;color:#0a2472;">Génesis Electric S.A.S.</h2>
            <small>NIT: 901802144</small><br/><small>Barranquilla, Atlántico</small>
          </div>
          <div style="text-align:right;font-size:12px;">
            <div>Fecha: ${new Date().toLocaleDateString()}</div>
            <div>Hora: ${new Date().toLocaleTimeString()}</div>
          </div>
        </div>
        <hr style="border:none;height:2px;background:#0a2472;margin:12px 0;"/>
        <h1 style="text-align:center;margin-bottom:20px;">Orden de servicio #00${orderNumber}</h1>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tbody>
            ${Object.entries(formData)
              .map(
                ([key, value]) => `
              <tr>
                <td style="padding:8px;border:1px solid #e0e0e0;background:#f9f9f9;text-transform:capitalize;font-weight:bold;">${key}</td>
                <td style="padding:8px;border:1px solid #e0e0e0;">${value}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
    document.body.appendChild(container);

    // Generar PDF
    let pdf;
    try {
      const canvas = await html2canvas(container, { scale: 2, useCORS: true });
      pdf = new jsPDF("p", "pt", "a4");
      const w = pdf.internal.pageSize.getWidth();
      const h = (canvas.height * w) / canvas.width;
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, w, h);

      if (signatureData) {
        const sigElement = canvasSig.getCanvas();
        const sigW = 150;
        const sigH = (sigElement.height * sigW) / sigElement.width;
        const sigY = h + 20;
        if (sigY + sigH + 40 > pdf.internal.pageSize.getHeight()) pdf.addPage();
        pdf.addImage(signatureData, "PNG", 40, sigY, sigW, sigH);
        const y0 = sigY + sigH + 15;
        pdf.setFontSize(12);
        pdf.text(`Nombre: ${formData.nombre} ${formData.apellido}`, 40, y0);
        pdf.text(`Cédula: ${formData.cedula}`, 40, y0 + 15);
        pdf.text(`IP: ${ip}`, 40, y0 + 30);
      }
    } catch (err) {
      console.error("Error generando PDF:", err);
      alert("Error generando el PDF.");
      setLoading(false);
      document.body.removeChild(container);
      return;
    } finally {
      document.body.removeChild(container);
    }

    // Subir PDF a Cloudinary
    const pdfBlob = pdf.output("blob");
    const formDataCloud = new FormData();
    formDataCloud.append('file', pdfBlob, `orden_00${orderNumber}.pdf`);
    formDataCloud.append("upload_preset", "service_order_pdf");
    formDataCloud.append("resource_type", "raw");

    let cloudinaryUrl = "";
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dbdsggxeg/raw/upload",
        {
          method: "POST",
          body: formDataCloud,
        }
      );
      const data = await response.json();
      cloudinaryUrl = data.secure_url;
      if (!cloudinaryUrl) throw new Error("URL de Cloudinary vacía");
    } catch (err) {
      console.error("Error subiendo a Cloudinary:", err);
      alert("Error al subir el PDF a la nube.");
      setLoading(false);
      return;
    }

    // Preparar parámetros para EmailJS
    const templateParams = {
        nombre: e.target.nombre.value,
        apellido: e.target.apellido.value,
        cedula: e.target.apellido.value,
        email: e.target.email.value,
        telefono: e.target.telefono.value,
        direccion: e.target.direccion.value,
        descripcion: e.target.descripcion.value,
        servicio: e.target.servicio.value,
        ip: ip,
        timestamp: new Date().toLocaleString(),
        pdfLink: cloudinaryUrl,
      };

    // DEBUG: revisar que to_email no esté vacío
    if (!formData.email) {
      console.error("El campo de email está vacío, EmailJS fallará.");
      alert("Por favor, ingresa un correo válido.");
      setLoading(false);
      return;
    }

    // Enviar email
    try {
      await emailjs.send(
        "service_0jqbmlj",
        "template_9kkwry7",
        templateParams,
        "IL2DxPWQ8dBzivMTe"
      );
      alert("Orden enviada por email con éxito");
    } catch (error) {
      console.error("Error enviando email:", error);
      alert(
        "Error al enviar el email: revisa consola o configuración de template en EmailJS."
      );
    }

    // Reset
    setFormData({
      nombre: "",
      apellido: "",
      cedula: "",
      direccion: "",
      telefono: "",
      email: "",
      servicio: servicios[0],
      descripcion: "",
    });
    sigCanvas.current.clear();
    setModalIsOpen(false);
    setLoading(false);
  };

  const clearSignature = () => sigCanvas.current.clear();

  return (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className={styles.floatingButton}
        disabled={loading}
      >
        <Plus className={styles.icon} /> Crear Orden
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        overlayClassName={styles.overlay}
        className={styles.modal}
      >
        <h2 className={styles.title}>Crear Orden de Servicio</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="nombre"
            type="text"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            name="apellido"
            type="text"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            name="cedula"
            type="text"
            placeholder="Cédula"
            value={formData.cedula}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            name="direccion"
            type="text"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            name="telefono"
            type="tel"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <select
            name="servicio"
            value={formData.servicio}
            onChange={handleChange}
            required
            className={styles.select}
          >
            {servicios.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleChange}
            required
            className={styles.textarea}
          />
          <div className={styles.signatureContainer}>
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              minWidth={1}
              maxWidth={3}
              velocityFilterWeight={0.7}
              canvasProps={{ className: styles.signaturePad }}
            />
            <button
              type="button"
              onClick={clearSignature}
              className={styles.clearButton}
            >
              Limpiar Firma
            </button>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              onClick={() => setModalIsOpen(false)}
              className={styles.cancelButton}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar por Email"}
            </button>
          </div>
          <span className={styles.notice}>
            Al enviar esta orden, aceptas nuestros{" "}
            <a href="/terms-and-conditions" target="_blank">
              Términos y condiciones
            </a>
            .
          </span>
        </form>
      </Modal>
    </>
  );
}
