import HeaderStyles from '../styles/Header.module.css'
import Logo from '../assets/GE_SVG_COLOR.svg'
import { TbMenu2 } from 'react-icons/tb'
import { ShoppingCart, Heart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Header = () => {
  const { totalItems } = useCart();
  const { user } = useUser();

  return (
    <header className={HeaderStyles.container}>
      <div className={HeaderStyles.logo__container}>
        <Link to="/"><img src={Logo} alt="Logo de G&eacute;nesis Electric"/></Link>
      </div>
      <input type="checkbox" name="menu" id="menu" />
        <label className={HeaderStyles.menu} htmlFor="menu"><TbMenu2 /></label>
        <nav>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><a href="/#about">Nosotros</a></li>
                <li><a href="/#services">Servicios</a></li>
                <li><Link to="/products">Productos</Link></li>
                <li><Link to="/btu-calculator">Calculadora BTU</Link></li>
                <li><a href="/#contact">Contacto</a></li>
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
