import HeaderStyles from '../styles/Header.module.css'
import Button from './Button'
import Logo from '../assets/logo.png'
import { TbMenu2 } from 'react-icons/tb'

const Header = () => {
  return (
    <header className={HeaderStyles.container}>
      <div className={HeaderStyles.logo__container}>
        <img src={Logo} alt="Logo de G&eacute;nesis Electric"/>
      </div>
      <input type="checkbox" name="menu" id="menu" />
        <label className={HeaderStyles.menu} htmlFor="menu"><TbMenu2 /></label>
        <nav>
            <ul>
                <li><a href="#home">Inicio</a></li>
                <li><a href="#about">Nosotros</a></li>
                <li><a href="#services">Servicios</a></li>
                <li><a href="/products">Productos</a></li>
                <li><Button text='Contacto' url='#contact'/></li>
            </ul>
        </nav>
        
    </header>
  )
}

export default Header