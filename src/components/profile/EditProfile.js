// src/components/EditProfile.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Row, Col, Container, InputGroup, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  PersonFill,
  EnvelopeFill,
  LockFill,
  EyeFill,
  EyeSlashFill,
  CheckCircleFill,
  XCircleFill,
  ArrowLeft,
  TrashFill
} from 'react-bootstrap-icons';
import { useAuth } from '../../context/AuthContext';
import { getProfile, updateProfile, deleteAccount } from '../../services/userService';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [originalData, setOriginalData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();
  const { logout } = useAuth();

  // Cargar datos del perfil
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoadingProfile(true);
      const data = await getProfile();

      setFormData({
        name: data.user.name,
        email: data.user.email,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });

      setOriginalData({
        name: data.user.name,
        email: data.user.email
      });

      setLoadingProfile(false);
    } catch (err) {
      console.error('Error al cargar perfil:', err);
      setError(err.response?.data?.message || 'Error al cargar el perfil');
      setLoadingProfile(false);
    }
  };

  // Validaciones
  const validateName = (name) => {
    if (!name || name.trim().length === 0) {
      return 'El nombre es requerido';
    }
    if (name.trim().length < 2) {
      return 'El nombre debe tener al menos 2 caracteres';
    }
    if (name.trim().length > 50) {
      return 'El nombre no puede exceder 50 caracteres';
    }
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-']+$/;
    if (!nameRegex.test(name)) {
      return 'El nombre solo puede contener letras, espacios, guiones y apóstrofes';
    }
    if (/\s{2,}/.test(name)) {
      return 'El nombre no puede contener espacios múltiples';
    }
    return null;
  };

  const validateEmail = (email) => {
    if (!email || email.trim().length === 0) {
      return 'El correo electrónico es requerido';
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'Debe ser un correo electrónico válido';
    }
    if (email.length > 100) {
      return 'El correo no puede exceder 100 caracteres';
    }
    return null;
  };

  const validatePassword = (password) => {
    if (!password || password.length === 0) {
      return null; // La contraseña es opcional si no se está cambiando
    }
    if (password.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }
    if (password.length > 50) {
      return 'La contraseña no puede exceder 50 caracteres';
    }
    if (!/[a-z]/.test(password)) {
      return 'La contraseña debe contener al menos una letra minúscula';
    }
    if (!/[A-Z]/.test(password)) {
      return 'La contraseña debe contener al menos una letra mayúscula';
    }
    if (!/\d/.test(password)) {
      return 'La contraseña debe contener al menos un número';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return 'La contraseña debe contener al menos un carácter especial (!@#$%^&*)';
    }
    if (/\s/.test(password)) {
      return 'La contraseña no puede contener espacios';
    }
    return null;
  };

  const validateForm = () => {
    const errors = {};

    const nameError = validateName(formData.name);
    if (nameError) errors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    // Validar cambio de contraseña solo si se está intentando cambiar
    if (changePassword) {
      if (!formData.currentPassword) {
        errors.currentPassword = 'Debe ingresar su contraseña actual';
      }

      if (!formData.newPassword) {
        errors.newPassword = 'Debe ingresar una nueva contraseña';
      } else {
        const passwordError = validatePassword(formData.newPassword);
        if (passwordError) errors.newPassword = passwordError;
      }

      if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
        errors.confirmNewPassword = 'Las contraseñas no coinciden';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo cuando el usuario escribe
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const hasChanges = () => {
    if (formData.name !== originalData.name) return true;
    if (formData.email !== originalData.email) return true;
    if (changePassword && formData.newPassword) return true;
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    if (!hasChanges()) {
      setError('No hay cambios para guardar');
      return;
    }

    setLoading(true);

    try {
      const updateData = {};

      // Solo incluir campos que cambiaron
      if (formData.name !== originalData.name) {
        updateData.name = formData.name.trim();
      }

      if (formData.email !== originalData.email) {
        updateData.email = formData.email.trim().toLowerCase();
      }

      // Solo incluir contraseñas si se está cambiando
      if (changePassword && formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      await updateProfile(updateData);

      setSuccess(true);
      setError(null);

      // Limpiar campos de contraseña
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }));
      setChangePassword(false);

      // Recargar perfil para actualizar los datos originales
      loadProfile();

      // Scroll to top para mostrar mensaje de éxito
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {
      console.error('Error al actualizar perfil:', err);
      const errorMessage = err.response?.data?.message || 'Error al actualizar el perfil';
      const errors = err.response?.data?.errors;

      if (errors && Array.isArray(errors)) {
        const newErrors = {};
        errors.forEach(error => {
          newErrors[error.field] = error.message;
        });
        setValidationErrors(newErrors);
      }

      setError(errorMessage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setError('Debe ingresar su contraseña para eliminar su cuenta');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await deleteAccount(deletePassword);
      setShowDeleteModal(false);

      // Logout y redirigir
      logout();
      navigate('/register', {
        state: { message: 'Tu cuenta ha sido eliminada exitosamente' }
      });

    } catch (err) {
      console.error('Error al eliminar cuenta:', err);
      setError(err.response?.data?.message || 'Error al eliminar la cuenta');
      setShowDeleteModal(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  if (loadingProfile) {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando perfil...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4 mb-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Button
            variant="outline-secondary"
            onClick={() => navigate('/hypotheses')}
            className="mb-3"
          >
            <ArrowLeft className="me-2" />
            Volver
          </Button>

          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">
                <PersonFill className="me-2" />
                Editar Perfil
              </h4>
            </Card.Header>
            <Card.Body className="p-4">
              {error && (
                <Alert variant="danger" dismissible onClose={() => setError(null)}>
                  <XCircleFill className="me-2" />
                  {error}
                </Alert>
              )}

              {success && (
                <Alert variant="success" dismissible onClose={() => setSuccess(false)}>
                  <CheckCircleFill className="me-2" />
                  Perfil actualizado exitosamente
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                {/* Nombre */}
                <Form.Group className="mb-3">
                  <Form.Label>
                    <PersonFill className="me-2" />
                    Nombre completo
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.name}
                    placeholder="Tu nombre completo"
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>
                    <EnvelopeFill className="me-2" />
                    Correo electrónico
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.email}
                    placeholder="tu@email.com"
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <hr className="my-4" />

                {/* Cambiar contraseña */}
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="change-password"
                    label="Cambiar contraseña"
                    checked={changePassword}
                    onChange={(e) => {
                      setChangePassword(e.target.checked);
                      if (!e.target.checked) {
                        setFormData(prev => ({
                          ...prev,
                          currentPassword: '',
                          newPassword: '',
                          confirmNewPassword: ''
                        }));
                        setValidationErrors(prev => ({
                          ...prev,
                          currentPassword: null,
                          newPassword: null,
                          confirmNewPassword: null
                        }));
                      }
                    }}
                  />
                </Form.Group>

                {changePassword && (
                  <>
                    {/* Contraseña actual */}
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <LockFill className="me-2" />
                        Contraseña actual
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showCurrentPassword ? 'text' : 'password'}
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          isInvalid={!!validationErrors.currentPassword}
                          placeholder="Tu contraseña actual"
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeSlashFill /> : <EyeFill />}
                        </Button>
                        <Form.Control.Feedback type="invalid">
                          {validationErrors.currentPassword}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    {/* Nueva contraseña */}
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <LockFill className="me-2" />
                        Nueva contraseña
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showNewPassword ? 'text' : 'password'}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          isInvalid={!!validationErrors.newPassword}
                          placeholder="Tu nueva contraseña"
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeSlashFill /> : <EyeFill />}
                        </Button>
                        <Form.Control.Feedback type="invalid">
                          {validationErrors.newPassword}
                        </Form.Control.Feedback>
                      </InputGroup>
                      <Form.Text className="text-muted">
                        La contraseña debe tener: mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*)
                      </Form.Text>
                    </Form.Group>

                    {/* Confirmar nueva contraseña */}
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <LockFill className="me-2" />
                        Confirmar nueva contraseña
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmNewPassword"
                          value={formData.confirmNewPassword}
                          onChange={handleChange}
                          isInvalid={!!validationErrors.confirmNewPassword}
                          placeholder="Confirma tu nueva contraseña"
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeSlashFill /> : <EyeFill />}
                        </Button>
                        <Form.Control.Feedback type="invalid">
                          {validationErrors.confirmNewPassword}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </>
                )}

                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    disabled={loading || !hasChanges()}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <CheckCircleFill className="me-2" />
                        Guardar cambios
                      </>
                    )}
                  </Button>
                </div>
              </Form>

              <hr className="my-4" />

              {/* Zona peligrosa */}
              <div className="border border-danger rounded p-3">
                <h5 className="text-danger">
                  <TrashFill className="me-2" />
                  Zona peligrosa
                </h5>
                <p className="text-muted mb-3">
                  Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, asegúrate.
                </p>
                <Button
                  variant="outline-danger"
                  onClick={() => setShowDeleteModal(true)}
                  disabled={loading}
                >
                  <TrashFill className="me-2" />
                  Eliminar mi cuenta
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal de confirmación de eliminación */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">
            <TrashFill className="me-2" />
            Confirmar eliminación de cuenta
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">
            <strong>¡Advertencia!</strong> Esta acción no se puede deshacer. Se eliminarán permanentemente:
            <ul className="mt-2 mb-0">
              <li>Tu perfil de usuario</li>
              <li>Todas tus hipótesis</li>
              <li>Todos tus artefactos</li>
            </ul>
          </Alert>

          <Form.Group>
            <Form.Label>
              <LockFill className="me-2" />
              Ingresa tu contraseña para confirmar
            </Form.Label>
            <Form.Control
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="Tu contraseña"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteAccount}
            disabled={loading || !deletePassword}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Eliminando...
              </>
            ) : (
              <>
                <TrashFill className="me-2" />
                Eliminar permanentemente
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EditProfile;
