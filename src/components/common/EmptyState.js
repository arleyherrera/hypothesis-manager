// src/components/common/EmptyState.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './EmptyState.css';

/**
 * Ilustraciones SVG para estados vacíos
 */
const illustrations = {
  // Ilustración para hipótesis vacías
  hypothesis: (
    <svg viewBox="0 0 200 160" className="empty-state-illustration" aria-hidden="true">
      <defs>
        <linearGradient id="bulbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffc107" />
          <stop offset="100%" stopColor="#ff9800" />
        </linearGradient>
        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e3f2fd" />
          <stop offset="100%" stopColor="#bbdefb" />
        </linearGradient>
      </defs>

      {/* Fondo decorativo */}
      <circle cx="100" cy="80" r="60" fill="url(#cardGradient)" opacity="0.5" className="float-animation" />

      {/* Tarjetas apiladas */}
      <rect x="50" y="65" width="100" height="70" rx="8" fill="#fff" stroke="#e0e0e0" strokeWidth="2" className="card-stack card-3" />
      <rect x="55" y="60" width="100" height="70" rx="8" fill="#fff" stroke="#e0e0e0" strokeWidth="2" className="card-stack card-2" />
      <rect x="60" y="55" width="100" height="70" rx="8" fill="#fff" stroke="#e0e0e0" strokeWidth="2" className="card-stack card-1" />

      {/* Líneas simulando texto */}
      <rect x="70" y="70" width="60" height="6" rx="3" fill="#e0e0e0" />
      <rect x="70" y="82" width="80" height="4" rx="2" fill="#f0f0f0" />
      <rect x="70" y="92" width="70" height="4" rx="2" fill="#f0f0f0" />
      <rect x="70" y="102" width="50" height="4" rx="2" fill="#f0f0f0" />

      {/* Bombilla con animación */}
      <g className="bulb-animation">
        <circle cx="100" cy="30" r="20" fill="url(#bulbGradient)" />
        <rect x="95" y="50" width="10" height="8" fill="#9e9e9e" rx="2" />
        <path d="M92 58 L108 58 L106 65 L94 65 Z" fill="#757575" />

        {/* Rayos de luz */}
        <line x1="100" y1="5" x2="100" y2="-5" stroke="#ffc107" strokeWidth="2" strokeLinecap="round" className="ray" />
        <line x1="125" y1="30" x2="135" y2="30" stroke="#ffc107" strokeWidth="2" strokeLinecap="round" className="ray" />
        <line x1="75" y1="30" x2="65" y2="30" stroke="#ffc107" strokeWidth="2" strokeLinecap="round" className="ray" />
        <line x1="118" y1="12" x2="125" y2="5" stroke="#ffc107" strokeWidth="2" strokeLinecap="round" className="ray" />
        <line x1="82" y1="12" x2="75" y2="5" stroke="#ffc107" strokeWidth="2" strokeLinecap="round" className="ray" />
      </g>

      {/* Signo + decorativo */}
      <g className="plus-animation">
        <circle cx="165" cy="100" r="15" fill="#4caf50" />
        <line x1="165" y1="92" x2="165" y2="108" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        <line x1="157" y1="100" x2="173" y2="100" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  ),

  // Ilustración para artefactos vacíos
  artifacts: (
    <svg viewBox="0 0 200 160" className="empty-state-illustration" aria-hidden="true">
      <defs>
        <linearGradient id="docGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#42a5f5" />
          <stop offset="100%" stopColor="#1e88e5" />
        </linearGradient>
      </defs>

      {/* Documentos apilados */}
      <g className="docs-animation">
        <rect x="45" y="50" width="70" height="90" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="2" transform="rotate(-5 80 95)" />
        <rect x="55" y="45" width="70" height="90" rx="4" fill="#fff" stroke="#e0e0e0" strokeWidth="2" transform="rotate(3 90 90)" />
        <rect x="65" y="40" width="70" height="90" rx="4" fill="#fff" stroke="#1e88e5" strokeWidth="2" />

        {/* Icono de documento */}
        <rect x="75" y="55" width="50" height="8" rx="4" fill="url(#docGradient)" />
        <rect x="75" y="70" width="40" height="4" rx="2" fill="#e0e0e0" />
        <rect x="75" y="80" width="45" height="4" rx="2" fill="#e0e0e0" />
        <rect x="75" y="90" width="35" height="4" rx="2" fill="#e0e0e0" />
        <rect x="75" y="100" width="42" height="4" rx="2" fill="#e0e0e0" />
        <rect x="75" y="110" width="30" height="4" rx="2" fill="#e0e0e0" />
      </g>

      {/* Robot IA */}
      <g className="robot-animation">
        <circle cx="155" cy="70" r="25" fill="#e3f2fd" stroke="#1e88e5" strokeWidth="2" />
        <circle cx="148" cy="65" r="4" fill="#1e88e5" />
        <circle cx="162" cy="65" r="4" fill="#1e88e5" />
        <path d="M145 78 Q155 85 165 78" stroke="#1e88e5" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="152" y="42" width="6" height="8" fill="#1e88e5" rx="2" />
        <circle cx="155" cy="38" r="5" fill="#ffc107" className="antenna-blink" />
      </g>

      {/* Partículas de magia */}
      <g className="magic-particles">
        <circle cx="130" cy="55" r="3" fill="#ffc107" />
        <circle cx="175" cy="95" r="2" fill="#4caf50" />
        <circle cx="140" cy="110" r="2.5" fill="#e91e63" />
        <circle cx="170" cy="50" r="2" fill="#9c27b0" />
      </g>
    </svg>
  ),

  // Ilustración para búsqueda sin resultados
  search: (
    <svg viewBox="0 0 200 160" className="empty-state-illustration" aria-hidden="true">
      <defs>
        <linearGradient id="searchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c4dff" />
          <stop offset="100%" stopColor="#536dfe" />
        </linearGradient>
      </defs>

      {/* Lupa grande */}
      <g className="search-animation">
        <circle cx="90" cy="70" r="35" fill="none" stroke="#e0e0e0" strokeWidth="8" />
        <circle cx="90" cy="70" r="35" fill="none" stroke="url(#searchGradient)" strokeWidth="8" strokeDasharray="220" strokeDashoffset="180" className="search-ring" />
        <line x1="115" y1="95" x2="145" y2="125" stroke="#9e9e9e" strokeWidth="12" strokeLinecap="round" />
        <line x1="115" y1="95" x2="145" y2="125" stroke="#757575" strokeWidth="8" strokeLinecap="round" />
      </g>

      {/* Signos de interrogación */}
      <g className="question-animation">
        <text x="85" y="80" fontSize="30" fill="#bdbdbd" fontFamily="Arial" fontWeight="bold">?</text>
      </g>

      {/* Partículas flotantes */}
      <circle cx="50" cy="50" r="4" fill="#e0e0e0" className="float-particle p1" />
      <circle cx="150" cy="40" r="3" fill="#e0e0e0" className="float-particle p2" />
      <circle cx="160" cy="100" r="5" fill="#e0e0e0" className="float-particle p3" />
      <circle cx="40" cy="110" r="3" fill="#e0e0e0" className="float-particle p4" />
    </svg>
  ),

  // Ilustración para error
  error: (
    <svg viewBox="0 0 200 160" className="empty-state-illustration" aria-hidden="true">
      <defs>
        <linearGradient id="errorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff5252" />
          <stop offset="100%" stopColor="#f44336" />
        </linearGradient>
      </defs>

      {/* Nube con error */}
      <g className="error-animation">
        <ellipse cx="100" cy="80" rx="60" ry="40" fill="#fff" stroke="#e0e0e0" strokeWidth="2" />
        <ellipse cx="60" cy="85" rx="25" ry="20" fill="#fff" />
        <ellipse cx="140" cy="85" rx="25" ry="20" fill="#fff" />
        <ellipse cx="75" cy="60" rx="20" ry="15" fill="#fff" />
        <ellipse cx="125" cy="60" rx="20" ry="15" fill="#fff" />

        {/* X de error */}
        <circle cx="100" cy="80" r="20" fill="url(#errorGradient)" />
        <line x1="90" y1="70" x2="110" y2="90" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        <line x1="110" y1="70" x2="90" y2="90" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Rayos de alerta */}
      <g className="alert-rays">
        <line x1="100" y1="30" x2="100" y2="20" stroke="#ffc107" strokeWidth="3" strokeLinecap="round" />
        <line x1="60" y1="45" x2="50" y2="38" stroke="#ffc107" strokeWidth="3" strokeLinecap="round" />
        <line x1="140" y1="45" x2="150" y2="38" stroke="#ffc107" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  ),

  // Ilustración para éxito
  success: (
    <svg viewBox="0 0 200 160" className="empty-state-illustration" aria-hidden="true">
      <defs>
        <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#66bb6a" />
          <stop offset="100%" stopColor="#43a047" />
        </linearGradient>
      </defs>

      {/* Círculo de éxito */}
      <g className="success-animation">
        <circle cx="100" cy="80" r="45" fill="url(#successGradient)" className="success-circle" />
        <polyline
          points="75,80 92,97 125,64"
          fill="none"
          stroke="#fff"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="success-check"
        />
      </g>

      {/* Confetti */}
      <g className="confetti-animation">
        <rect x="55" y="40" width="8" height="8" fill="#ffc107" transform="rotate(15 59 44)" />
        <rect x="140" y="35" width="6" height="6" fill="#e91e63" transform="rotate(-20 143 38)" />
        <rect x="45" y="100" width="7" height="7" fill="#2196f3" transform="rotate(30 48.5 103.5)" />
        <rect x="150" y="110" width="8" height="8" fill="#9c27b0" transform="rotate(-15 154 114)" />
        <circle cx="165" cy="60" r="4" fill="#00bcd4" />
        <circle cx="35" cy="70" r="3" fill="#ff9800" />
      </g>

      {/* Estrellas */}
      <g className="stars-animation">
        <polygon points="30,50 32,56 38,56 33,60 35,66 30,62 25,66 27,60 22,56 28,56" fill="#ffc107" />
        <polygon points="170,90 171.5,94.5 176,94.5 172.5,97.5 174,102 170,99 166,102 167.5,97.5 164,94.5 168.5,94.5" fill="#ffc107" />
      </g>
    </svg>
  )
};

/**
 * Componente EmptyState reutilizable
 */
const EmptyState = ({
  type = 'hypothesis',
  title = 'No hay elementos',
  description = 'Comienza creando tu primer elemento',
  actionText = 'Crear',
  actionLink = '/',
  onAction = null,
  showAction = true,
  icon = null,
  className = ''
}) => {
  const illustration = illustrations[type] || illustrations.hypothesis;

  return (
    <div className={`empty-state-container ${className}`} role="status" aria-live="polite">
      <div className="empty-state-content">
        {/* Ilustración */}
        <div className="empty-state-illustration-wrapper">
          {illustration}
        </div>

        {/* Texto */}
        <h3 className="empty-state-title">{title}</h3>
        <p className="empty-state-description">{description}</p>

        {/* Acción */}
        {showAction && (
          <div className="empty-state-action">
            {onAction ? (
              <Button
                variant="primary"
                size="lg"
                onClick={onAction}
                className="empty-state-button"
              >
                {icon && <span className="me-2">{icon}</span>}
                {actionText}
              </Button>
            ) : (
              <Button
                as={Link}
                to={actionLink}
                variant="primary"
                size="lg"
                className="empty-state-button"
              >
                {icon && <span className="me-2">{icon}</span>}
                {actionText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
