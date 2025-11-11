// src/constants/index.js

/**
 * Punto de entrada centralizado para todas las constantes
 * Facilita las importaciones desde un solo lugar
 */

export { ROUTES, buildRoute } from './routes';
export { MESSAGES } from './messages';

// Re-exportar todo por defecto también
export { default as ROUTES_DEFAULT } from './routes';
export { default as MESSAGES_DEFAULT } from './messages';
