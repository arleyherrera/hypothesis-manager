// src/utils/authValidation.js
// Utilidades de validación para autenticación

export const authValidation = {
  // Validar nombre - solo letras, espacios y caracteres latinos
  validateName: (name) => {
    if (!name || name.trim().length === 0) {
      return 'El nombre es requerido';
    }
    
    // Eliminar espacios múltiples
    const cleanName = name.trim().replace(/\s+/g, ' ');
    
    if (cleanName.length < 2) {
      return 'El nombre debe tener al menos 2 caracteres';
    }
    
    if (cleanName.length > 50) {
      return 'El nombre no puede tener más de 50 caracteres';
    }
    
    // Solo permitir letras (incluyendo acentos), espacios, guiones y apóstrofes
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-']+$/;
    if (!nameRegex.test(cleanName)) {
      return 'El nombre solo puede contener letras, espacios, guiones y apóstrofes';
    }
    
    // Verificar que no sea solo espacios o caracteres especiales
    const letterRegex = /[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/;
    if (!letterRegex.test(cleanName)) {
      return 'El nombre debe contener al menos una letra';
    }
    
    // Verificar que no empiece o termine con caracteres especiales
    if (cleanName.startsWith('-') || cleanName.startsWith("'") || 
        cleanName.endsWith('-') || cleanName.endsWith("'")) {
      return 'El nombre no puede empezar o terminar con guiones o apóstrofes';
    }
    
    return null;
  },

  // Validar email con reglas estrictas
  validateEmail: (email) => {
    if (!email) {
      return 'El correo electrónico es requerido';
    }
    
    const trimmedEmail = email.trim().toLowerCase();
    
    // Longitud máxima de email
    if (trimmedEmail.length > 100) {
      return 'El correo electrónico es demasiado largo';
    }
    
    // Regex más estricto para email
    const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._-]*@[a-zA-Z0-9][a-zA-Z0-9.-]*\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      return 'Por favor ingrese un correo electrónico válido';
    }
    
    // Verificar que no tenga puntos consecutivos
    if (trimmedEmail.includes('..')) {
      return 'El correo electrónico no puede contener puntos consecutivos';
    }
    
    // Verificar dominios comunes mal escritos
    const commonTypos = ['gmial.com', 'gmai.com', 'yahooo.com', 'hotmial.com'];
    const domain = trimmedEmail.split('@')[1];
    if (commonTypos.includes(domain)) {
      return 'Por favor verifique el dominio del correo electrónico';
    }
    
    return null;
  },

  // Validar contraseña con reglas de seguridad
  validatePassword: (password) => {
    if (!password) {
      return 'La contraseña es requerida';
    }
    
    if (password.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }
    
    if (password.length > 50) {
      return 'La contraseña no puede tener más de 50 caracteres';
    }
    
    // Debe contener al menos una mayúscula
    if (!/[A-Z]/.test(password)) {
      return 'La contraseña debe contener al menos una letra mayúscula';
    }
    
    // Debe contener al menos una minúscula
    if (!/[a-z]/.test(password)) {
      return 'La contraseña debe contener al menos una letra minúscula';
    }
    
    // Debe contener al menos un número
    if (!/\d/.test(password)) {
      return 'La contraseña debe contener al menos un número';
    }
    
    // Debe contener al menos un carácter especial
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'La contraseña debe contener al menos un carácter especial (!@#$%^&*(),.?":{}|<>)';
    }
    
    // No debe contener espacios
    if (/\s/.test(password)) {
      return 'La contraseña no puede contener espacios';
    }
    
    // No debe ser una contraseña común
    const commonPasswords = [
      'password123', 'Password123!', '12345678', 'qwerty123',
      'admin123', 'letmein123', 'welcome123', 'monkey123'
    ];
    if (commonPasswords.some(common => password.toLowerCase().includes(common.toLowerCase()))) {
      return 'Esta contraseña es muy común. Por favor, elija una más segura';
    }
    
    return null;
  },

  // Validar confirmación de contraseña
  validateConfirmPassword: (confirmPassword, password) => {
    if (!confirmPassword) {
      return 'Por favor confirme su contraseña';
    }
    if (confirmPassword !== password) {
      return 'Las contraseñas no coinciden';
    }
    return null;
  },

  // Sanitizar entrada (eliminar caracteres peligrosos)
  sanitizeInput: (input) => {
    if (!input) return '';
    
    // Eliminar caracteres de control y HTML
    return input
      .trim()
      .replace(/[<>]/g, '') // Eliminar < >
      .replace(/[^\x20-\x7E\xA0-\xFF]/g, '') // Solo caracteres imprimibles
      .replace(/\s+/g, ' '); // Normalizar espacios
  },

  // Calcular fortaleza de contraseña
  calculatePasswordStrength: (password) => {
    let strength = 0;
    
    if (!password) return { score: 0, label: '', color: '' };
    
    // Longitud
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    if (password.length >= 16) strength += 10;
    
    // Complejidad
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/\d/.test(password)) strength += 15;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 15;
    
    // Variedad
    const uniqueChars = new Set(password).size;
    if (uniqueChars >= 10) strength += 10;
    
    // Determinar nivel
    let label, color;
    if (strength < 40) {
      label = 'Débil';
      color = 'danger';
    } else if (strength < 70) {
      label = 'Media';
      color = 'warning';
    } else {
      label = 'Fuerte';
      color = 'success';
    }
    
    return { score: strength, label, color };
  }
};

// Exportar funciones individuales para facilitar el uso
export const {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  sanitizeInput,
  calculatePasswordStrength
} = authValidation;