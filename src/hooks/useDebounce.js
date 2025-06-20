// src/hooks/useDebounce.js
import { useState, useEffect, useMemo } from 'react';

export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook para búsqueda con debounce
export const useDebouncedSearch = (items, searchTerm, searchFields = ['name']) => {
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredItems = useMemo(() => {
    if (!debouncedSearchTerm) return items;
    
    const searchLower = debouncedSearchTerm.toLowerCase();
    return items.filter(item => {
      return searchFields.some(field => 
        item[field] && item[field].toLowerCase().includes(searchLower)
      );
    });
  }, [items, debouncedSearchTerm, searchFields]);

  return filteredItems;
};