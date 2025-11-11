// src/services/userService.js
import api from './api';

const USER_ENDPOINTS = {
  PROFILE: '/users/profile',
  DELETE_ACCOUNT: '/users/account'
};

const USER_STORAGE_KEY = 'user';

/**
 * Obtener perfil del usuario actual
 */
export const getProfile = async () => {
  try {
    console.log('📤 Obteniendo perfil de usuario');

    const response = await api.get(USER_ENDPOINTS.PROFILE);
    console.log('✅ Perfil obtenido exitosamente:', response.data);

    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener perfil:');
    console.error('Status:', error.response?.status);
    console.error('Mensaje:', error.response?.data?.message);

    throw error;
  }
};

/**
 * Actualizar perfil del usuario
 * @param {Object} profileData - Datos a actualizar (name, email, currentPassword, newPassword)
 */
export const updateProfile = async (profileData) => {
  try {
    console.log('📤 Actualizando perfil:', {
      ...profileData,
      currentPassword: profileData.currentPassword ? '[OCULTO]' : undefined,
      newPassword: profileData.newPassword ? '[OCULTO]' : undefined
    });

    const response = await api.put(USER_ENDPOINTS.PROFILE, profileData);
    console.log('✅ Perfil actualizado exitosamente:', response.data);

    // Actualizar datos del usuario en localStorage si hay cambios en name o email
    if (profileData.name || profileData.email) {
      const currentUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          name: response.data.user.name,
          email: response.data.user.email
        };
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      }
    }

    return response.data;
  } catch (error) {
    console.error('❌ Error al actualizar perfil:');
    console.error('Status:', error.response?.status);
    console.error('Mensaje:', error.response?.data?.message);
    console.error('Errores:', error.response?.data?.errors);

    throw error;
  }
};

/**
 * Eliminar cuenta de usuario
 * @param {string} password - Contraseña del usuario para confirmar
 */
export const deleteAccount = async (password) => {
  try {
    console.log('📤 Solicitando eliminación de cuenta');

    const response = await api.delete(USER_ENDPOINTS.DELETE_ACCOUNT, {
      data: { password }
    });
    console.log('✅ Cuenta eliminada exitosamente:', response.data);

    // Limpiar localStorage
    localStorage.removeItem(USER_STORAGE_KEY);

    return response.data;
  } catch (error) {
    console.error('❌ Error al eliminar cuenta:');
    console.error('Status:', error.response?.status);
    console.error('Mensaje:', error.response?.data?.message);

    throw error;
  }
};
