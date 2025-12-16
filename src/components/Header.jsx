import { useState } from 'react';
import HeaderStyles from '../styles/Header.module.css'
import Logo from '../assets/GE_SVG_COLOR.svg'
import { TbMenu2, TbX } from 'react-icons/tb'
import { ShoppingCart, Heart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Header = () => {
  const { totalItems } = useCart();
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={HeaderStyles.container}>
      <div className={HeaderStyles.logo__container}>
        <Link to="/" onClick={closeMenu}><img src={Logo} alt="Logo de G&eacute;nesis Electric"/></Link>
      </div>
      
      <button className={HeaderStyles.menuToggle} onClick={toggleMenu} aria-label="Toggle menu">
        {isMenuOpen ? <TbX /> : <TbMenu2 />}
      </button>

      <nav className={`${HeaderStyles.nav} ${isMenuOpen ? HeaderStyles.open : ''}`}>
          <ul>
              <li><Link to="/" onClick={closeMenu}>Inicio</Link></li>
              <li><a href="/#about" onClick={closeMenu}>Nosotros</a></li>
              <li><a href="/#services" onClick={closeMenu}>Servicios</a></li>
              <li><Link to="/products" onClick={closeMenu}>Productos</Link></li>
              <li><Link to="/btu-calculator" onClick={closeMenu}>Calculadora BTU</Link></li>
              <li><a href="/#contact" onClick={closeMenu}>Contacto</a></li>
          </ul>
      </nav>

      <div className={HeaderStyles.icons__container}>
        {user ? (
          <Link to="/profile"><User /></Link>
        ) : (
          <Link to="/login"><User /></Link>
        )}
        <Link to="/favorites"><Heart /></Link>
        <Link to="/cart" className={HeaderStyles.cart__icon}>
          <ShoppingCart />
          {totalItems > 0 && <span className={HeaderStyles.cart__badge}>{totalItems}</span>}
        </Link>
      </div>
    </header>
  )
}

export default Header;
