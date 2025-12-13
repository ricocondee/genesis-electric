import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import styles from '../../styles/Dashboard.module.css';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveFunnel } from '@nivo/funnel';

const brandColors = {
  darkBlue: '#00072D',
  mediumDarkBlue: '#001C55',
  mediumBlue: '#0A2472',
  lightBlue: '#0E6BA8',
  paleBlue: '#A6E1FA',
  contrastBlue: '#97becf',
};

const AdminHome = () => {
  const [totalSales, setTotalSales] = useState({ value: 0, growth: 0 });
  const [totalOrders, setTotalOrders] = useState({ value: 0, growth: 0 });
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [liveVisitors, setLiveVisitors] = useState(0);
  const [revenueByYear, setRevenueByYear] = useState([]);
  const [customerVolume, setCustomerVolume] = useState({ newCustomers: 0, returningCustomers: 0, totalCustomers: 0 });
  const [trafficSources, setTrafficSources] = useState([]);
  const [salesFunnel, setSalesFunnel] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [mostViewedProducts, setMostViewedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch dashboard summary (total sales, total orders)
        const summaryRes = await axios.get('/stats/dashboard-summary');
        setTotalSales(summaryRes.data.totalSales);
        setTotalOrders(summaryRes.data.totalOrders);

        // Fetch total visitors
        const visitorsRes = await axios.get('/stats/total-visitors');
        setTotalVisitors(visitorsRes.data.totalVisitors);

        // Fetch live visitors
        const liveVisitorsRes = await axios.get('/stats/live-visitors');
        setLiveVisitors(liveVisitorsRes.data.liveVisitors);

        // Fetch sales by year
        const salesByYearRes = await axios.get('/stats/sales-by-year');
        setRevenueByYear(salesByYearRes.data.salesByYear);

        // Fetch customer volume
        const customerVolumeRes = await axios.get('/stats/customer-volume');
        setCustomerVolume(customerVolumeRes.data);

        // Fetch traffic sources
        const trafficSourcesRes = await axios.get('/stats/traffic-sources');
        setTrafficSources(trafficSourcesRes.data);

        // Fetch sales funnel
        const salesFunnelRes = await axios.get('/stats/sales-funnel');
        setSalesFunnel(salesFunnelRes.data);

        // Fetch top selling products
        const topSellingProductsRes = await axios.get('/stats/top-selling-products');
        setTopSellingProducts(topSellingProductsRes.data);

        // Fetch most viewed products
        const mostViewedProductsRes = await axios.get('/stats/most-viewed-products');
        setMostViewedProducts(mostViewedProductsRes.data);

      } catch (err) {
        setError('Fallo al cargar los datos del dashboard.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Cargando dashboard...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  const newCustomerPercentage = customerVolume.totalCustomers > 0
    ? ((customerVolume.newCustomers / customerVolume.totalCustomers) * 100).toFixed(0)
    : 0;

  const customerVolumeData = [
    {
      id: 'Clientes Nuevos',
      label: 'Clientes Nuevos',
      value: customerVolume.newCustomers,
    },
    {
      id: 'Clientes Recurrentes',
      label: 'Clientes Recurrentes',
      value: customerVolume.returningCustomers,
    },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.topMetrics}>
        <div className={styles.statCard}>
          <p>Ventas Totales</p>
          <p className={styles.statValue}>${totalSales.value?.toFixed(2)}</p>
          <p className={totalSales.growth >= 0 ? styles.growthPositive : styles.growthNegative}>
            {totalSales.growth >= 0 ? '+' : ''}{totalSales.growth?.toFixed(2)}%
          </p>
        </div>
        <div className={styles.statCard}>
          <p>Pedidos Totales</p>
          <p className={styles.statValue}>{totalOrders.value}</p>
          <p className={totalOrders.growth >= 0 ? styles.growthPositive : styles.growthNegative}>
            {totalOrders.growth >= 0 ? '+' : ''}{totalOrders.growth?.toFixed(2)}%
          </p>
        </div>
        <div className={styles.statCard}>
          <p>Visitantes Totales</p>
          <p className={styles.statValue}>{totalVisitors}</p>
        </div>
        <div className={styles.statCard}>
          <p>Visitantes en Vivo</p>
          <p className={styles.statValue}>{liveVisitors}</p>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={`${styles.card} ${styles.revenueCard}`}>
          <h3>Ingresos Totales por Año</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveBar
              data={revenueByYear}
              keys={['value1']}
              indexBy="year"
              margin={{ top: 15, right: 150, bottom: 80, left: 120 }}
              padding={0.3}
              colors={[brandColors.mediumBlue]}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Año',
                legendPosition: 'middle',
                legendOffset: 32
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Ingresos',
                legendPosition: 'middle',
                legendOffset: -100
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              legends={[
                {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemOpacity: 1
                      }
                    }
                  ]
                }
              ]}
            />
          </div>
        </div>
        <div className={`${styles.card} ${styles.customerVolumeCard}`}>
          <h3>Volumen de Clientes</h3>
          <div className={styles.chartWrapper}>
            <ResponsivePie
              data={customerVolumeData}
              margin={{ top: 60, right: 80, bottom: 100, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              colors={[brandColors.lightBlue, brandColors.mediumBlue]}
              borderWidth={1}
              borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
              radialLabelsSkipAngle={10}
              radialLabelsTextXOffset={6}
              radialLabelsTextColor={brandColors.darkBlue}
              radialLabelsLinkOffset={0}
              radialLabelsLinkDiagonalLength={16}
              radialLabelsLinkHorizontalLength={24}
              radialLabelsLinkStrokeWidth={1}
              radialLabelsLinkColor={{ from: 'color' }}
              slicesLabelsSkipAngle={10}
              slicesLabelsTextColor={brandColors.darkBlue}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              legends={[
                {
                  anchor: 'bottom',
                  direction: 'row',
                  translateY: 56,
                  itemsSpacing: 20,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: '#999',
                  symbolSize: 18,
                  symbolShape: 'circle',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemTextColor: '#000'
                      }
                    }
                  ]
                }
              ]}
            />
          </div>
        </div>
        <div className={`${styles.card} ${styles.trafficAnalyticsCard}`}>
          <h3>Análisis de Tráfico</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveBar
              data={trafficSources}
              keys={['value']}
              indexBy="source"
              margin={{ top: 20, right: 130, bottom: 100, left: 100 }}
              padding={0.3}
              layout="vertical"
              colors={[brandColors.mediumBlue]}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Fuentes de Tráfico',
                legendPosition: 'middle',
                legendOffset: 40
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Visitas',
                legendPosition: 'middle',
                legendOffset: -50
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              legends={[
                {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 15,
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemOpacity: 1
                      }
                    }
                  ]
                }
              ]}
            />
          </div>
        </div>
        <div className={`${styles.card} ${styles.salesFunnelCard}`}>
          <h3>Embudo de Ventas</h3>
          <ResponsiveFunnel
            data={salesFunnel.map(item => ({ id: item.stage, value: item.value, label: item.stage }))}
            margin={{ top: 20, right: 50, bottom: 20, left: 50 }}
            direction="horizontal"
            shapeBlending={0.8}
            valueFormat=">,d"
            colors={[brandColors.paleBlue, brandColors.lightBlue, brandColors.mediumBlue, brandColors.contrastBlue]}
            borderWidth={10}
            label={d => `${d.label} (${d.value})`}
            labelColor={({ id }) => (id === 'Reached Checkout' ? brandColors.paleBlue : { from: 'color', modifiers: [['darker', 3]] })}
            beforeSeparatorLength={50}
            beforeSeparatorOffset={20}
            afterSeparatorLength={50}
            afterSeparatorOffset={20}
            currentPartSizeExtension={0}
            currentBorderWidth={0}
            motionConfig="gentle"
          />
        </div>
        <div className={`${styles.card} ${styles.topProductsCard}`}>
          <h3>Productos Más Vendidos</h3>
          <ul className={styles.productList}>
            {topSellingProducts.map((product) => (
              <li key={product._id} className={styles.productItem}>
                <div className={styles.productImagePlaceholder}></div>
                <div className={styles.productInfo}>
                  <p>{product.name}</p>
                  <div className={styles.ratingPlaceholder}></div> {/* Placeholder for rating */}
                </div>
                <p className={styles.productPrice}>Vendido: {product.totalSold}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${styles.card} ${styles.mostViewedProductsCard}`}>
          <h3>Productos Más Vistos</h3>
          <ul className={styles.productList}>
            {mostViewedProducts.map((product) => (
              <li key={product._id} className={styles.productItem}>
                <div className={styles.productImagePlaceholder}></div>
                <div className={styles.productInfo}>
                  <p>{product.name}</p>
                </div>
                <p className={styles.productPrice}>Vistas: {product.views}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
