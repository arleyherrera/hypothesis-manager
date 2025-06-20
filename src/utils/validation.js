// src/utils/validation.js

/**
 * Expresiones regulares para validación
 */
export const REGEX = {
  // Solo letras (incluye acentos), espacios, guiones y apóstrofes
  NAME: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-']+$/,
  // Email estricto
  EMAIL: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  // Caracteres peligrosos en email
  EMAIL_DANGEROUS: /[()<>&\[\]\\,;:\s"]/,
  // Múltiples espacios
  MULTIPLE_SPACES: /\s{2,}/,
  // Solo espacios o caracteres especiales
  ONLY_SPECIAL: /^[\s\-']+$/,
  // Al menos una minúscula
  HAS_LOWERCASE: /[a-z]/,
  // Al menos una mayúscula
  HAS_UPPERCASE: /[A-Z]/,
  // Al menos un número
  HAS_NUMBER: /\d/,
  // Al menos un carácter especial
  HAS_SPECIAL: /[!@#$%^&*]/
};

/**
 * Límites de caracteres
 */
export const LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 50,
  EMAIL_MAX: 100,
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 50
};

/**
 * Validadores
 */
export const validators = {
  /**
   * Valida el nombre
   */
  name: (value) => {
    if (!value || value.trim().length === 0) {
      return 'El nombre es requerido';
    }
    
    const trimmed = value.trim();
    
    if (trimmed.length < LIMITS.NAME_MIN) {
      return `El nombre debe tener al menos ${LIMITS.NAME_MIN} caracteres`;
    }
    
    if (trimmed.length > LIMITS.NAME_MAX) {
      return `El nombre no puede exceder ${LIMITS.NAME_MAX} caracteres`;
    }
    
    if (!REGEX.NAME.test(value)) {
      return 'El nombre solo puede contener letras, espacios, guiones y apóstrofes';
    }
    
    if (REGEX.MULTIPLE_SPACES.test(value)) {
      return 'El nombre no puede contener espacios múltiples';
    }
    
    const letterCount = (value.match(/[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/g) || []).length;
    if (letterCount < 2) {
      return 'El nombre debe contener al menos 2 letras';
    }
    
    if (REGEX.ONLY_SPECIAL.test(value)) {
      return 'El nombre no puede consistir solo de espacios o caracteres especiales';
    }
    
    return null;
  },

  /**
   * Valida el email
   */
  email: (value) => {
    if (!value) {
      return 'El correo electrónico es requerido';
    }
    
    if (!REGEX.EMAIL.test(value)) {
      return 'Por favor ingrese un correo electrónico válido';
    }
    
    const localPart = value.split('@')[0];
    if (REGEX.EMAIL_DANGEROUS.test(localPart)) {
      return 'El correo no puede contener paréntesis, &, <, > u otros caracteres especiales';
    }
    
    if (value.length > LIMITS.EMAIL_MAX) {
      return `El correo no puede exceder ${LIMITS.EMAIL_MAX} caracteres`;
    }
    
    return null;
  },

  /**
   * Valida la contraseña
   */
  password: (value) => {
    if (!value) {
      return 'La contraseña es requerida';
    }
    
    if (value.length < LIMITS.PASSWORD_MIN) {
      return `La contraseña debe tener al menos ${LIMITS.PASSWORD_MIN} caracteres`;
    }
    
    if (value.length > LIMITS.PASSWORD_MAX) {
      return `La contraseña no puede exceder ${LIMITS.PASSWORD_MAX} caracteres`;
    }
    
    if (/\s/.test(value)) {
      return 'La contraseña no puede contener espacios';
    }
    
    const requirements = [];
    if (!REGEX.HAS_LOWERCASE.test(value)) requirements.push('una minúscula');
    if (!REGEX.HAS_UPPERCASE.test(value)) requirements.push('una mayúscula');
    if (!REGEX.HAS_NUMBER.test(value)) requirements.push('un número');
    if (!REGEX.HAS_SPECIAL.test(value)) requirements.push('un carácter especial (!@#$%^&*)');
    
    if (requirements.length > 0) {
      return `La contraseña debe contener al menos: ${requirements.join(', ')}`;
    }
    
    return null;
  },

  /**
   * Valida la confirmación de contraseña
   */
  confirmPassword: (value, password) => {
    if (!value) {
      return 'Por favor confirme su contraseña';
    }
    if (value !== password) {
      return 'Las contraseñas no coinciden';
    }
    return null;
  }
};

/**
 * Sanitizadores
 */
export const sanitizers = {
  /**
   * Sanitiza el nombre
   */
  name: (value) => {
    return value
      .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-']/g, '') // Solo caracteres permitidos
      .replace(/\s+/g, ' ') // Múltiples espacios a uno solo
      .trim();
  },

  /**
   * Sanitiza el email (normalización básica)
   */
  email: (value) => {
    return value.toLowerCase().trim();
  }
};

/**
 * Detecta typos comunes en dominios de email
 */
export const detectEmailTypo = (email) => {
  const domain = email.split('@')[1];
  const commonTypos = {
    'gmial.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'gmil.com': 'gmail.com',
    'yahooo.com': 'yahoo.com',
    'yaho.com': 'yahoo.com',
    'hotmial.com': 'hotmail.com',
    'hotmal.com': 'hotmail.com',
    'hotmil.com': 'hotmail.com',
    'outlok.com': 'outlook.com',
    'outloo.com': 'outlook.com'
  };
  
  if (commonTypos[domain]) {
    return `${email.split('@')[0]}@${commonTypos[domain]}`;
  }
  
  return null;
};

/**
 * Calcula la fortaleza de la contraseña
 */
export const calculatePasswordStrength = (password) => {
  if (!password) return 0;
  
  let strength = 0;
  
  // Longitud
  if (password.length >= 8) strength += 20;
  if (password.length >= 12) strength += 10;
  if (password.length >= 16) strength += 10;
  
  // Complejidad
  if (REGEX.HAS_LOWERCASE.test(password)) strength += 15;
  if (REGEX.HAS_UPPERCASE.test(password)) strength += 15;
  if (REGEX.HAS_NUMBER.test(password)) strength += 15;
  if (REGEX.HAS_SPECIAL.test(password)) strength += 15;
  
  return Math.min(strength, 100);
};

/**
 * Obtiene el label de fortaleza
 */
export const getPasswordStrengthLabel = (strength) => {
  if (strength === 0) return '';
  if (strength <= 40) return 'Débil';
  if (strength <= 70) return 'Media';
  return 'Fuerte';
};

/**
 * Obtiene el color de fortaleza para Bootstrap
 */
export const getPasswordStrengthColor = (strength) => {
  if (strength === 0) return '';
  if (strength <= 40) return 'danger';
  if (strength <= 70) return 'warning';
  return 'success';
};