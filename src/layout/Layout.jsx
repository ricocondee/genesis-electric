import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HelpButton from '../components/HelpButton';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  const hideHeaderAndFooter = location.pathname.startsWith('/admin'); // updated to hide on all admin pages

  return (
    <div>
      {!hideHeaderAndFooter && <Header />}
      <main>{children}</main>
      {!hideHeaderAndFooter && <Footer />}
      {!hideHeaderAndFooter && <HelpButton />}
    </div>
  );
};

export default Layout;