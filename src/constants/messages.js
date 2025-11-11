// src/constants/messages.js

/**
 * Mensajes de la aplicación centralizados
 * Facilita la internacionalización futura y mantiene consistencia
 */

export const MESSAGES = {
  SUCCESS: {
    // Auth
    LOGIN_SUCCESS: 'Inicio de sesión exitoso',
    REGISTER_SUCCESS: 'Registro exitoso',
    LOGOUT_SUCCESS: 'Sesión cerrada correctamente',
    PASSWORD_RESET_REQUEST: 'Se ha enviado un correo con instrucciones para resetear tu contraseña',
    PASSWORD_RESET_SUCCESS: 'Contraseña restablecida exitosamente',

    // Profile
    PROFILE_UPDATED: 'Perfil actualizado exitosamente',
    PASSWORD_CHANGED: 'Contraseña cambiada correctamente',
    ACCOUNT_DELETED: 'Cuenta eliminada exitosamente',

    // Hypothesis
    HYPOTHESIS_CREATED: 'Hipótesis creada exitosamente',
    HYPOTHESIS_UPDATED: 'Hipótesis actualizada exitosamente',
    HYPOTHESIS_DELETED: 'Hipótesis eliminada exitosamente',

    // Artifacts
    ARTIFACT_GENERATED: 'Artefacto generado exitosamente',
    ARTIFACT_UPDATED: 'Artefacto actualizado exitosamente'
  },

  ERROR: {
    // General
    GENERIC: 'Ocurrió un error inesperado. Por favor, inténtalo más tarde',
    NETWORK: 'Error de conexión. Verifica tu conexión a internet',
    UNAUTHORIZED: 'No estás autorizado para realizar esta acción',
    NOT_FOUND: 'El recurso solicitado no fue encontrado',

    // Auth
    INVALID_CREDENTIALS: 'Credenciales inválidas',
    EMAIL_IN_USE: 'Este correo electrónico ya está en uso',
    TOKEN_EXPIRED: 'La sesión ha expirado. Por favor, inicia sesión nuevamente',
    INVALID_TOKEN: 'Token inválido o expirado',

    // Profile
    PASSWORD_INCORRECT: 'La contraseña actual es incorrecta',
    PASSWORD_MISMATCH: 'Las contraseñas no coinciden',
    PROFILE_UPDATE_FAILED: 'Error al actualizar el perfil',

    // Hypothesis
    HYPOTHESIS_LOAD_FAILED: 'Error al cargar la hipótesis',
    HYPOTHESIS_SAVE_FAILED: 'Error al guardar la hipótesis',

    // Artifacts
    ARTIFACT_GENERATION_FAILED: 'Error al generar el artefacto'
  },

  INFO: {
    LOADING: 'Cargando...',
    NO_DATA: 'No hay datos disponibles',
    EMPTY_LIST: 'La lista está vacía',
    PROCESSING: 'Procesando...'
  },

  WARNING: {
    UNSAVED_CHANGES: 'Tienes cambios sin guardar. ¿Estás seguro que quieres salir?',
    DELETE_CONFIRMATION: '¿Estás seguro que quieres eliminar este elemento?',
    IRREVERSIBLE_ACTION: 'Esta acción no se puede deshacer'
  }
};

export default MESSAGES;
