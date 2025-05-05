import styles from "../styles/TermsAndConditions.module.css";

export default function TermsAndConditions() {
  return (
    <div className={styles.termsContainer}>
      <h1 className={styles.termsTitle}>Términos y Condiciones de Servicio</h1>
      <p className={styles.termsUpdated}>
        <strong>Última actualización:</strong> [Fecha]
      </p>

      <ol className={styles.termsList}>
        <li>
          <strong>Autenticidad de la información:</strong> El cliente garantiza
          que los datos ingresados son verídicos y completos. Génesis Electric
          S.A.S. no se hace responsable por información incorrecta que afecte la
          prestación del servicio.
        </li>
        <li>
          <strong>Aceptación del servicio:</strong> Al firmar digitalmente y
          enviar este formulario, se autoriza a Génesis Electric S.A.S. a
          realizar la visita técnica y/o ejecutar el servicio indicado.
        </li>
        <li>
          <strong>Alcance del servicio:</strong> El tipo de servicio
          seleccionado (instalación, mantenimiento, reparación o inspección)
          será acordado y limitado a lo descrito en el formulario. Cualquier
          servicio adicional requerirá una nueva orden.
        </li>
        <li>
          <strong>Costos y pagos:</strong> Los costos serán definidos con el
          cliente antes de la ejecución. Algunos servicios podrán requerir un
          anticipo. Los pagos se realizarán mediante los canales autorizados por
          la empresa.
        </li>
        <li>
          <strong>Responsabilidad:</strong> Génesis Electric S.A.S. se
          compromete a cumplir con altos estándares de calidad y seguridad. Sin
          embargo, no se hace responsable por daños derivados del uso indebido
          del sistema eléctrico, instalaciones en mal estado previas o causas
          externas.
        </li>
        <li>
          <strong>Privacidad:</strong> La información proporcionada será
          utilizada únicamente para fines de prestación del servicio. Consulta
          nuestra{" "}
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
            Política de Privacidad
          </a>{" "}
          para más detalles.
        </li>
        <li>
          <strong>Firma y registro:</strong> La firma digital tiene validez
          legal como manifestación de voluntad para la ejecución del servicio.
        </li>
      </ol>
    </div>
  );
}
