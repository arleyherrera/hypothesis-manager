// src/services/authService.js - Versión mejorada con mejor debug
import api from './api';

const AUTH_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login'
};

const USER_STORAGE_KEY = 'user';

const persistUserData = (userData) => {
  if (userData.token) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
  }
  return userData;
};

const createAuthRequest = async (endpoint, credentials) => {
  try {
    console.log(`📤 Enviando petición a ${endpoint}:`, {
      ...credentials,
      password: credentials.password ? '[OCULTO]' : undefined
    });
    
    const response = await api.post(endpoint, credentials);
    console.log('✅ Respuesta exitosa:', response.data);
    return persistUserData(response.data);
  } catch (error) {
    console.error(`❌ Error durante petición ${endpoint}:`);
    console.error('Status:', error.response?.status);
    console.error('Mensaje del servidor:', error.response?.data?.message);
    console.error('Errores de validación:', error.response?.data?.errors);
    console.error('Campos faltantes:', error.response?.data?.missingFields);
    console.error('Response completa:', error.response?.data);
    
    // Re-lanzar el error para que el componente lo maneje
    throw error;
  }
};

export const register = async (name, email, password) => {
  // Validación básica en frontend
  if (!name || !email || !password) {
    console.error('❌ Campos requeridos faltantes en frontend');
    throw new Error('Todos los campos son requeridos');
  }
  
  if (password.length < 6) {
    console.error('❌ Contraseña muy corta');
    throw new Error('La contraseña debe tener al menos 6 caracteres');
  }
  
  const credentials = { name, email, password };
  console.log('📝 Intentando registrar con:', { name, email, passwordLength: password.length });
  
  return createAuthRequest(AUTH_ENDPOINTS.REGISTER, credentials);
};

export const login = async (email, password) => {
  const credentials = { email, password };
  return createAuthRequest(AUTH_ENDPOINTS.LOGIN, credentials);
};

export const logout = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
  } catch {
    return null;
  }
};

export const isAuthenticated = () => {
  const user = getCurrentUser();
  return Boolean(user?.token);
};