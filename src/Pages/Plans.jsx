import React from 'react';
import styles from '../styles/Plans.module.css';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import plan1Image from '../assets/plan1.webp';
import plan2Image from '../assets/plan2.webp';
import plan3Image from '../assets/plan3.webp';
import plan4Image from '../assets/plan4.webp';

const Plans = () => {
  const plans = [
    {
      id: 1,
      name: 'Plan Básico',
      price: '150.000 COP/año',
      image: plan1Image,
      benefits: [
        '1 Visita de mantenimiento preventivo anual',
        'Limpieza de filtros y serpentines',
        'Revisión de niveles de refrigerante',
        'Verificación de conexiones eléctricas',
        'Descuento del 5% en reparaciones',
      ],
    },
    {
      id: 2,
      name: 'Plan Estándar',
      price: '250.000 COP/año',
      image: plan2Image,
      benefits: [
        '2 Visitas de mantenimiento preventivo anual',
        'Limpieza profunda de unidades (interna y externa)',
        'Revisión y ajuste de componentes mecánicos',
        'Prioridad en atención de emergencias',
        'Descuento del 10% en reparaciones',
        'Diagnóstico avanzado de fallas',
      ],
    },
    {
      id: 3,
      name: 'Plan Premium',
      price: '400.000 COP/año',
      image: plan3Image,
      benefits: [
        '3 Visitas de mantenimiento preventivo anual',
        'Limpieza química de serpentines (si aplica)',
        'Reemplazo de filtros de aire (hasta 2 unidades)',
        'Atención de emergencias 24/7',
        'Descuento del 15% en reparaciones',
        'Garantía extendida en servicios de mantenimiento',
        'Asesoría técnica personalizada',
      ],
    },
    {
      id: 4,
      name: 'Plan Empresarial',
      price: 'Contactar',
      image: plan4Image,
      benefits: [
        'Mantenimiento personalizado para flotas de equipos',
        'Servicio técnico prioritario 24/7',
        'Gestión integral de garantías y repuestos',
        'Reportes de rendimiento y eficiencia energética',
        'Capacitación para personal de operación',
        'Descuentos exclusivos en equipos nuevos',
        'Asesoría estratégica en climatización',
      ],
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Nuestros Planes de Mantenimiento</h1>
      <p className={styles.pageSubtitle}>Elige el plan que mejor se adapte a tus necesidades y asegura el óptimo funcionamiento de tus equipos de aire acondicionado.</p>

      <div className={styles.plansGrid}>
        {plans.map(plan => (
          <div key={plan.id} className={styles.planCard}>
            <img src={plan.image} alt={plan.name} className={styles.planImage} />
            <div className={styles.cardContent}>
              <h2 className={styles.planName}>{plan.name}</h2>
              <p className={styles.planPrice}>{plan.price}</p>
              <ul className={styles.planBenefits}>
                {plan.benefits.map((benefit, index) => (
                  <li key={index} className={styles.benefitItem}>
                    <CheckCircle size={18} className={styles.benefitIcon} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className={styles.ctaButton}>Contratar Plan</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
