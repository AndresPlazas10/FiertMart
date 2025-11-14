import { useState, useEffect } from 'react';

/**
 * Hook para gestionar mensajes de toast/notificaciones
 * @returns {object} { message, showSuccess, showError, showWarning, showInfo, clear }
 */
export function useToast(duration = 4000) {
  const [message, setMessage] = useState({ type: null, text: '' });

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: null, text: '' });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  const showSuccess = (text) => {
    setMessage({ type: 'success', text });
  };

  const showError = (text) => {
    setMessage({ type: 'error', text });
  };

  const showWarning = (text) => {
    setMessage({ type: 'warning', text });
  };

  const showInfo = (text) => {
    setMessage({ type: 'info', text });
  };

  const clear = () => {
    setMessage({ type: null, text: '' });
  };

  return { 
    message, 
    showSuccess, 
    showError, 
    showWarning, 
    showInfo, 
    clear 
  };
}
