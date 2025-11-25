// src/components/common/SuccessAnimation.js
import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './SuccessAnimation.css';

/**
 * Componente de animación de éxito con confetti
 */
const SuccessAnimation = ({
  show = false,
  message = '¡Completado!',
  subMessage = '',
  duration = 2500,
  onComplete = () => {},
  type = 'success' // success, saved, created, deleted
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleComplete = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsExiting(false);
      onComplete();
    }, 300);
  }, [onComplete]);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setIsExiting(false);

      const timer = setTimeout(() => {
        handleComplete();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, handleComplete]);

  if (!isVisible) return null;

  const icons = {
    success: (
      <svg viewBox="0 0 52 52" className="success-checkmark">
        <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
        <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </svg>
    ),
    saved: (
      <svg viewBox="0 0 52 52" className="success-icon-svg">
        <circle cx="26" cy="26" r="25" fill="#4caf50" className="icon-circle" />
        <path
          d="M22 34 L22 18 L32 26 Z"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon-path"
          style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
        />
        <path
          d="M18 36 L34 36"
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          className="icon-path"
        />
      </svg>
    ),
    created: (
      <svg viewBox="0 0 52 52" className="success-icon-svg">
        <circle cx="26" cy="26" r="25" fill="#2196f3" className="icon-circle" />
        <line x1="26" y1="16" x2="26" y2="36" stroke="#fff" strokeWidth="3" strokeLinecap="round" className="icon-path" />
        <line x1="16" y1="26" x2="36" y2="26" stroke="#fff" strokeWidth="3" strokeLinecap="round" className="icon-path" />
      </svg>
    ),
    deleted: (
      <svg viewBox="0 0 52 52" className="success-icon-svg">
        <circle cx="26" cy="26" r="25" fill="#ff9800" className="icon-circle" />
        <path
          d="M20 20 L32 32 M32 20 L20 32"
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          className="icon-path"
        />
      </svg>
    )
  };

  const confettiColors = ['#ffc107', '#4caf50', '#2196f3', '#e91e63', '#9c27b0', '#00bcd4'];

  const content = (
    <div
      className={`success-animation-overlay ${isExiting ? 'exiting' : ''}`}
      role="alert"
      aria-live="polite"
    >
      {/* Confetti */}
      <div className="confetti-container" aria-hidden="true">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="confetti-piece"
            style={{
              '--confetti-left': `${Math.random() * 100}%`,
              '--confetti-delay': `${Math.random() * 0.5}s`,
              '--confetti-duration': `${2 + Math.random() * 2}s`,
              '--confetti-color': confettiColors[i % confettiColors.length],
              '--confetti-rotation': `${Math.random() * 360}deg`
            }}
          />
        ))}
      </div>

      {/* Success content */}
      <div className="success-animation-content">
        <div className="success-icon-container">
          {icons[type] || icons.success}
        </div>

        <h2 className="success-message">{message}</h2>
        {subMessage && <p className="success-sub-message">{subMessage}</p>}
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

/**
 * Hook para manejar animaciones de éxito
 */
export const useSuccessAnimation = () => {
  const [animationState, setAnimationState] = useState({
    show: false,
    message: '',
    subMessage: '',
    type: 'success'
  });

  const showSuccess = useCallback((options = {}) => {
    setAnimationState({
      show: true,
      message: options.message || '¡Completado!',
      subMessage: options.subMessage || '',
      type: options.type || 'success',
      duration: options.duration || 2500,
      onComplete: options.onComplete || (() => {})
    });
  }, []);

  const hideSuccess = useCallback(() => {
    setAnimationState(prev => ({ ...prev, show: false }));
  }, []);

  const SuccessComponent = useCallback(() => (
    <SuccessAnimation
      show={animationState.show}
      message={animationState.message}
      subMessage={animationState.subMessage}
      type={animationState.type}
      duration={animationState.duration}
      onComplete={() => {
        hideSuccess();
        animationState.onComplete?.();
      }}
    />
  ), [animationState, hideSuccess]);

  return {
    showSuccess,
    hideSuccess,
    SuccessComponent
  };
};

/**
 * Toast de notificación
 */
export const Toast = ({
  show = false,
  message = '',
  type = 'success', // success, error, warning, info
  duration = 3000,
  onClose = () => {},
  position = 'bottom-right' // top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setIsExiting(false);

      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          setIsVisible(false);
          onClose();
        }, 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: '✓',
    error: '✕',
    warning: '!',
    info: 'i'
  };

  const content = (
    <div
      className={`toast-notification toast-${type} toast-${position} ${isExiting ? 'toast-exiting' : ''}`}
      role="alert"
      aria-live="polite"
    >
      <span className={`toast-icon toast-icon-${type}`}>{icons[type]}</span>
      <span className="toast-message">{message}</span>
      <button
        className="toast-close"
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsVisible(false);
            onClose();
          }, 300);
        }}
        aria-label="Cerrar notificación"
      >
        ×
      </button>
    </div>
  );

  return createPortal(content, document.body);
};

/**
 * Hook para manejar toasts
 */
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((options = {}) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, ...options }]);
    return id;
  }, []);

  const hideToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const ToastsContainer = useCallback(() => (
    <>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          show={true}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          position={toast.position}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </>
  ), [toasts, hideToast]);

  return {
    showToast,
    hideToast,
    ToastsContainer
  };
};

export default SuccessAnimation;
