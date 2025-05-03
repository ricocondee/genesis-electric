import { useState } from "react";
import DashboardStyles from "../styles/Dashboard.module.css";
import { ShoppingBasket, ShoppingCart, Users } from "lucide-react";
import ProductDashboardList from "../containers/ProductDashboardList";

const Dashboard = () => {
  const [products, setProducts] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    setProducts(true);
  };

  return (
    <main className={DashboardStyles.container}>
      <div className={DashboardStyles.panel__container}>
        <h2>Dashboard</h2>
        <ul className={DashboardStyles.panel__options}>
          <li><ShoppingBasket/><a href="/dashboard" onClick={handleClick}>Productos</a></li>
          <li><ShoppingCart /><a href="/dashboard/orders">Pedidos</a></li>
          <li><Users/><a href="/dashboard/users" >Usuarios</a></li>
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
