import { useState } from "react";
import DashboardStyles from "../styles/Dashboard.module.css";
import { ShoppingBasket, ShoppingCart, Users } from "lucide-react";
import ProductDashboardList from "../containers/ProductDashboardList";

const Dashboard = () => {
  const [products, setProducts] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    setProducts(true);
    // Opcional: cerrar menú en móvil
    document.querySelector(`.${DashboardStyles.panel__container}`).classList.remove(DashboardStyles.open);
  };

  const toggleMenu = () => {
    document.querySelector(`.${DashboardStyles.panel__container}`).classList.toggle(DashboardStyles.open);
  };

  return (
    <main className={DashboardStyles.container}>
      <button className={DashboardStyles.menuToggle} onClick={toggleMenu}>
        ☰ Menú
      </button>

      <div className={DashboardStyles.panel__container}>
        <h2>Dashboard</h2>
        <ul className={DashboardStyles.panel__options}>
          <li><ShoppingBasket /><a href="/dashboard" onClick={handleClick}>Productos</a></li>
          <li><ShoppingCart /><a href="/dashboard/orders">Pedidos</a></li>
          <li><Users /><a href="/dashboard/users">Usuarios</a></li>
        </ul>
      </div>

      <div className={DashboardStyles.content__container}>
        {products ? (
          <ProductDashboardList />
        ) : (
          <div>
            <h3>Productos</h3>
            <button onClick={handleClick}>Agregar Producto</button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;