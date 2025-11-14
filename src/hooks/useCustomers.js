import { useState, useEffect } from 'react';
import { supabase } from '@/supabase/Client';

/**
 * Hook para gestionar clientes de un negocio
 * @param {string} businessId - ID del negocio
 * @returns {object} { customers, loading, error, reload }
 */
export function useCustomers(businessId) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCustomers = async () => {
    if (!businessId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('customers')
        .select('id, full_name, email, phone, id_number')
        .eq('business_id', businessId)
        .order('full_name', { ascending: true });

      if (fetchError) {
        // Si la tabla no existe, no es un error crítico
        if (fetchError.code === '42P01') {
          setCustomers([]);
          setError(null);
          return;
        }
        throw fetchError;
      }
      
      setCustomers(data || []);
    } catch (err) {
      setError(err.message);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [businessId]);

  return { 
    customers, 
    loading, 
    error, 
    reload: loadCustomers 
  };
}
