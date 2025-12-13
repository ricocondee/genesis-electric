import { useState, useEffect } from 'react';
import useScript from './useScript';

const useWompi = () => {
  useScript('https://checkout.wompi.co/widget.js');
  const [wompiStatus, setWompiStatus] = useState('loading');

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 100; // 10 seconds

    const interval = setInterval(() => {
      attempts++;

      if (typeof WidgetCheckout !== 'undefined') {
        setWompiStatus('ready');
        clearInterval(interval);
      } else if (attempts >= maxAttempts) {
        setWompiStatus('timeout');
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return wompiStatus;
};

export default useWompi;
