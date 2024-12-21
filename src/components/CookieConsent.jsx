import { useState } from "react";
import CookieConsent from "react-cookie-consent";

const loadGoogleAnalytics = () => {
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-TG467V7XH9";
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-TG467V7XH9");
};

const CookieCons = () => {
  const [visible, setVisible] = useState(true); // Controla la visibilidad del banner

  return (
    visible && ( // Renderiza el banner solo si es visible
      <CookieConsent
        location="bottom"
        buttonText="Aceptar"
        cookieName="cookieConsent"
        style={{
          background: "#00072d",
          color: "#fff",
          textAlign: "center",
          padding: "10px",
        }}
        buttonStyle={{
          color: "#00072d",
          backgroundColor: "#A6E1FA",
          border: "none",
          borderRadius: "5px",
          padding: "5px 15px",
        }}
        expires={365}
        onAccept={() => {
          loadGoogleAnalytics(); // Activa Google Analytics
        }}
        enableDeclineButton
        declineButtonText="Declinar"
        declineButtonStyle={{
          color: "#00072d",
          backgroundColor: "#A6E1FA", // Rojo para el botón de declinar
          border: "none",
          borderRadius: "5px",
          padding: "5px 15px",
          marginLeft: "10px",
        }}
        onDecline={() => {
          setVisible(false); // Oculta el banner al declinar
        }}
      >
        Usamos cookies para personalizar tu experiencia.{" "}
        <a
          href="/privacy-policy"
          style={{ color: "#A6E1FA", textDecoration: "underline" }}
        >
          Más información
        </a>
      </CookieConsent>
    )
  );
};

export default CookieCons;
