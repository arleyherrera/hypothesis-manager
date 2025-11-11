// src/services/userService.js
import api from './api';

const USER_ENDPOINTS = {
  PROFILE: '/users/profile',
  UPDATE_PROFILE: '/users/profile',
  DELETE_ACCOUNT: '/users/account'
};

/**
 * Obtiene el perfil del usuario actual
 * @returns {Promise<Object>} - Datos del perfil del usuario
 */
export const getProfile = async () => {
  try {
    console.log('📤 Obteniendo perfil del usuario');
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
 * Actualiza el perfil del usuario
 * @param {Object} updateData - Datos a actualizar (name, email, currentPassword, newPassword)
 * @returns {Promise<Object>} - Datos del perfil actualizado
 */
export const updateProfile = async (updateData) => {
  try {
    console.log('📤 Actualizando perfil del usuario:', {
      ...updateData,
      currentPassword: updateData.currentPassword ? '[OCULTO]' : undefined,
      newPassword: updateData.newPassword ? '[OCULTO]' : undefined
    });

    const response = await api.put(USER_ENDPOINTS.UPDATE_PROFILE, updateData);
    console.log('✅ Perfil actualizado exitosamente:', response.data);

    // Si el perfil se actualiza exitosamente y hay un nuevo token, actualizarlo en localStorage
    if (response.data.token) {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      userData.token = response.data.token;
      localStorage.setItem('user', JSON.stringify(userData));
    }

    return response.data;
  } catch (error) {
    console.error('❌ Error al actualizar perfil:');
    console.error('Status:', error.response?.status);
    console.error('Mensaje:', error.response?.data?.message);
    console.error('Errores de validación:', error.response?.data?.errors);
    throw error;
  }
};

/**
 * Elimina la cuenta del usuario
 * @param {string} password - Contraseña del usuario para confirmar
 * @returns {Promise<Object>} - Confirmación de eliminación
 */
export const deleteAccount = async (password) => {
  try {
    console.log('📤 Eliminando cuenta del usuario');
    const response = await api.delete(USER_ENDPOINTS.DELETE_ACCOUNT, {
      data: { password }
    });
    console.log('✅ Cuenta eliminada exitosamente:', response.data);

    // Limpiar localStorage al eliminar la cuenta
    localStorage.removeItem('user');

    return response.data;
  } catch (error) {
    console.error('❌ Error al eliminar cuenta:');
    console.error('Status:', error.response?.status);
    console.error('Mensaje:', error.response?.data?.message);
    throw error;
  }
};
