import { useState, useEffect } from 'react';

const useWompi = () => {
  const [wompiStatus, setWompiStatus] = useState('loading'); // 'loading', 'ready', 'error'

  useEffect(() => {
    // 1. Check if the script is already in the DOM to prevent duplicates
    if (document.getElementById('wompi-script')) {
      if (typeof window.WidgetCheckout !== 'undefined') {
        setWompiStatus('ready');
      }
      return;
    }

    // 2. Verify the Public Key exists
    const publicKey = import.meta.env.VITE_WOMPI_PUBLIC_KEY;
    if (!publicKey) {
      console.error('CRITICAL: VITE_WOMPI_PUBLIC_KEY is missing in environment variables.');
      setWompiStatus('error');
      return;
    }

    // 3. Create the script element manually
    const script = document.createElement('script');
    script.src = 'https://checkout.wompi.co/widget.js';
    script.id = 'wompi-script';
    script.async = true;
    script.type = 'text/javascript';

    // --- THE FIX: Attach the key to the script tag ---
    // This satisfies Wompi's internal auto-initialization check
    script.setAttribute('data-public-key', publicKey);
    // ------------------------------------------------

    script.onload = () => {
      // Allow a brief moment for the global variable to attach
      if (typeof window.WidgetCheckout !== 'undefined') {
        setWompiStatus('ready');
      } else {
        // Fallback: Check again after 500ms if not immediately available
        setTimeout(() => {
            if (typeof window.WidgetCheckout !== 'undefined') {
                setWompiStatus('ready');
            } else {
                setWompiStatus('error');
            }
        }, 500);
      }
    };

    script.onerror = () => {
      console.error('Failed to load Wompi script');
      setWompiStatus('error');
    };

    document.body.appendChild(script);

    // Cleanup: We usually don't remove the script on unmount for payment widgets 
    // to avoid reloading it if the user navigates back and forth.
  }, []);

  return wompiStatus;
};

export default useWompi;