// src/constants/routes.js

/**
 * Constantes de rutas de la aplicación
 * Centraliza todas las rutas para facilitar el mantenimiento
 */

export const ROUTES = {
  // Rutas públicas
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
  RESET_PASSWORD_BASE: '/reset-password',

  // Rutas protegidas
  PROFILE: '/profile',
  HYPOTHESES: '/',
  HYPOTHESIS_CREATE: '/create',
  HYPOTHESIS_DETAIL: '/hypothesis/:id',
  HYPOTHESIS_DETAIL_BASE: '/hypothesis',
  ARTIFACTS: '/artifacts/:id',
  ARTIFACTS_BASE: '/artifacts'
};

/**
 * Helper para construir rutas dinámicas
 */
export const buildRoute = {
  hypothesisDetail: (id) => `/hypothesis/${id}`,
  artifacts: (id) => `/artifacts/${id}`,
  resetPassword: (token) => `/reset-password/${token}`
};

export default ROUTES;
