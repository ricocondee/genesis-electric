import React from 'react';
import { useLocation } from 'react-router-dom'; // Importa el hook para obtener la ubicación actual

const Layout = ({ children }) => {
  const location = useLocation();

  // Compara la ruta actual con las rutas en las que quieres ocultar el header y footer
  const hideHeaderAndFooter = location.pathname === '/dashboard';

  return (
    <div>
      {!hideHeaderAndFooter && <Header />} {/* Solo muestra el Header si no es la página indicada */}
      <main>{children}</main>
      {!hideHeaderAndFooter && <Footer />} {/* Solo muestra el Footer si no es la página indicada */}
    </div>
  );
};

export default Layout;
