// src/components/ThemeToggle.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { MoonStarsFill, SunFill } from 'react-bootstrap-icons';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = ({ variant = 'icon', className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  // Versión solo icono (para navbar)
  if (variant === 'icon') {
    return (
      <Button
        variant="link"
        onClick={toggleTheme}
        className={`theme-toggle-btn p-2 ${className}`}
        aria-label={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
        title={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
      >
        {isDark ? (
          <SunFill size={20} className="text-warning" />
        ) : (
          <MoonStarsFill size={20} className="text-primary" />
        )}
      </Button>
    );
  }

  // Versión con texto (para configuración)
  if (variant === 'switch') {
    return (
      <div className={`d-flex align-items-center ${className}`}>
        <SunFill size={20} className={`me-2 ${isDark ? 'text-muted' : 'text-warning'}`} />
        <div className="form-check form-switch mb-0">
          <input
            className="form-check-input"
            type="checkbox"
            id="themeSwitch"
            checked={isDark}
            onChange={toggleTheme}
            role="switch"
          />
          <label className="form-check-label" htmlFor="themeSwitch">
            Modo Oscuro
          </label>
        </div>
        <MoonStarsFill size={20} className={`ms-2 ${isDark ? 'text-primary' : 'text-muted'}`} />
      </div>
    );
  }

  // Versión botón con texto
  return (
    <Button
      variant={isDark ? 'light' : 'dark'}
      onClick={toggleTheme}
      className={`d-flex align-items-center ${className}`}
    >
      {isDark ? (
        <>
          <SunFill className="me-2" size={18} />
          Modo Claro
        </>
      ) : (
        <>
          <MoonStarsFill className="me-2" size={18} />
          Modo Oscuro
        </>
      )}
    </Button>
  );
};

export default ThemeToggle;