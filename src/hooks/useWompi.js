import { useState, useEffect } from 'react';

const useWompi = () => {
  const [wompiStatus, setWompiStatus] = useState('loading');

  useEffect(() => {
    // 1. Check existing script
    if (document.getElementById('wompi-script')) {
      if (typeof window.WidgetCheckout !== 'undefined') {
        setWompiStatus('ready');
      }
      return;
    }

    // 2. Load and Clean Key
    const rawKey = import.meta.env.VITE_WOMPI_PUBLIC_KEY;
    const publicKey = rawKey ? rawKey.replace(/['"\s]/g, '') : '';

    if (!publicKey) {
      console.error('CRITICAL: Wompi Public Key Missing in Environment');
      setWompiStatus('error');
      return;
    }

    // 3. Inject Script
    const script = document.createElement('script');
    script.src = 'https://checkout.wompi.co/widget.js';
    script.id = 'wompi-script';
    script.async = true;
    script.type = 'text/javascript';
    script.setAttribute('data-public-key', publicKey);

    script.onload = () => setWompiStatus('ready');
    script.onerror = () => setWompiStatus('error');

    document.body.appendChild(script);
  }, []);

  return wompiStatus;
};

export default useWompi;