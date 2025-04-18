import { useState } from "react";
import ProductForm from "../components/ProductForm";
import DashboardStyles from "../Styles/Dashboard.module.css";
import { TbShoppingBagEdit, TbShoppingCartCog, TbUserCog } from "react-icons/tb";
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
      <div className={DashboardStyles.content}>
        <div className={DashboardStyles.panel__container}>
        <h2>Dashboard</h2>
            <ul className={DashboardStyles.panel__options}>
                <li><TbShoppingBagEdit/><a href="/dashboard" onClick={handleClick}>Productos</a></li>
                <li><TbShoppingCartCog/><a href="/dashboard/orders">Pedidos</a></li>
                <li><TbUserCog/><a href="/dashboard/users" >Usuarios</a></li>
            </ul>
        </div>
        <div className={DashboardStyles.form__container}>
        {products ? (
          <ProductDashboardList/>
        ) : (
          <div>
            <h3>Productos</h3>
            <button onClick={handleClick}>Agregar Producto</button>
          </div>
        )}
        </div>
        
      </div>
    </main>
  );
};

export default Dashboard;