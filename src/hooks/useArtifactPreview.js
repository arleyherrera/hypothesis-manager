import { useState, useCallback } from 'react';

export const useArtifactPreview = () => {
  const [previewData, setPreviewData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const showPreview = useCallback((artifact, mouseEvent) => {
    if (!artifact) return;
    
    const rect = mouseEvent.currentTarget.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const previewWidth = 350; // Ancho estimado del preview
    const previewHeight = 200; // Alto estimado del preview
    
    // Calcular posición óptima
    let x = rect.right + 10;
    let y = rect.top;
    
    // Ajustar si se sale por la derecha
    if (x + previewWidth > viewportWidth) {
      x = rect.left - previewWidth - 10;
    }
    
    // Ajustar si se sale por abajo
    if (y + previewHeight > viewportHeight) {
      y = viewportHeight - previewHeight - 20;
    }
    
    // Asegurar que no se salga por arriba o por la izquierda
    x = Math.max(10, x);
    y = Math.max(10, y);
    
    setPosition({ x, y });
    setPreviewData(artifact);
    setIsVisible(true);
  }, []);

  const hidePreview = useCallback(() => {
    setIsVisible(false);
    // Limpiar datos después de la animación
    setTimeout(() => setPreviewData(null), 300);
  }, []);

  const updatePosition = useCallback((mouseEvent) => {
    if (!isVisible) return;
    
    const rect = mouseEvent.currentTarget.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const previewWidth = 350;
    
    let x = rect.right + 10;
    if (x + previewWidth > viewportWidth) {
      x = rect.left - previewWidth - 10;
    }
    x = Math.max(10, x);
    
    setPosition(prev => ({ ...prev, x }));
  }, [isVisible]);

  return {
    previewData,
    isVisible,
    position,
    showPreview,
    hidePreview,
    updatePosition
  };
};