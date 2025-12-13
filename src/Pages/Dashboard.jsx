import React from 'react';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.topMetrics}>
        <div className={styles.statCard}>
          <p>Total Sales</p>
          <p className={styles.statValue}>12,345</p>
        </div>
        <div className={styles.statCard}>
          <p>Total Orders</p>
          <p className={styles.statValue}>678</p>
        </div>
        <div className={styles.statCard}>
          <p>Total Visitors</p>
          <p className={styles.statValue}>90,123</p>
        </div>
        <div className={styles.statCard}>
          <p>Live Visitors</p>
          <p className={styles.statValue}>45</p>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={`${styles.card} ${styles.revenueCard}`}>
          <h3>Total Revenue 2025</h3>
          <div className={styles.barChartPlaceholder}></div>
        </div>
        <div className={`${styles.card} ${styles.customerVolumeCard}`}>
          <h3>Customer Volume</h3>
          <div className={styles.circlePlaceholder}></div>
        </div>
        <div className={`${styles.card} ${styles.trafficAnalyticsCard}`}>
          <h3>Traffic Analytics</h3>
          <ul className={styles.trafficList}>
            <li>
              <span>Google</span>
              <div className={styles.horizontalBarPlaceholder}></div>
            </li>
            <li>
              <span>Facebook</span>
              <div className={styles.horizontalBarPlaceholder}></div>
            </li>
            <li>
              <span>Instagram</span>
              <div className={styles.horizontalBarPlaceholder}></div>
            </li>
            <li>
              <span>Direct</span>
              <div className={styles.horizontalBarPlaceholder}></div>
            </li>
          </ul>
        </div>
        <div className={`${styles.card} ${styles.salesFunnelCard}`}>
          <h3>Sales Funnel</h3>
          <div className={styles.funnelSteps}>
            <div className={styles.funnelStep}>Product View</div>
            <div className={styles.funnelStep}>Add to Cart</div>
            <div className={styles.funnelStep}>Initiate Checkout</div>
            <div className={styles.funnelStep}>Purchase</div>
          </div>
        </div>
        <div className={`${styles.card} ${styles.topProductsCard}`}>
          <h3>Top Selling Products</h3>
          <ul className={styles.productList}>
            <li className={styles.productItem}>
              <div className={styles.productImagePlaceholder}></div>
              <div className={styles.productInfo}>
                <p>Product Title 1</p>
                <div className={styles.ratingPlaceholder}></div>
              </div>
              <p className={styles.productPrice}>$99.99</p>
            </li>
            <li className={styles.productItem}>
              <div className={styles.productImagePlaceholder}></div>
              <div className={styles.productInfo}>
                <p>Product Title 2</p>
                <div className={styles.ratingPlaceholder}></div>
              </div>
              <p className={styles.productPrice}>$129.99</p>
            </li>
            <li className={styles.productItem}>
              <div className={styles.productImagePlaceholder}></div>
              <div className={styles.productInfo}>
                <p>Product Title 3</p>
                <div className={styles.ratingPlaceholder}></div>
              </div>
              <p className={styles.productPrice}>$79.99</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
