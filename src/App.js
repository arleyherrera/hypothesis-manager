// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Error Boundary
import ErrorBoundary from './components/common/ErrorBoundary';

// Layout
import Navigation from './components/layout/Navigation';
import LandingPage from './components/layout/LandingPage';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Hypothesis Components
import HypothesisForm from './components/hypothesis/HypothesisForm';
import HypothesisList from './components/hypothesis/HypothesisList';
import HypothesisDetail from './components/hypothesis/HypothesisDetail';

// Artifact Components
import ArtifactsPage from './components/artifacts/ArtifactsPage';

// Profile Components
import EditProfile from './components/profile/EditProfile';

// Context
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './styles/theme.css'; 

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Navigation />
            <Routes>
              {/* Rutas públicas (sin Container para landing page full-width) */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />

              {/* Rutas protegidas (con Container) */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Container className="mt-4 pb-5">
                    <HypothesisList />
                  </Container>
                </ProtectedRoute>
              } />

              <Route path="/profile" element={
                <ProtectedRoute>
                  <Container className="mt-4 pb-5">
                    <EditProfile />
                  </Container>
                </ProtectedRoute>
              } />

              <Route path="/create" element={
                <ProtectedRoute>
                  <Container className="mt-4 pb-5">
                    <HypothesisForm />
                  </Container>
                </ProtectedRoute>
              } />

              <Route path="/hypothesis/:id" element={
                <ProtectedRoute>
                  <Container className="mt-4 pb-5">
                    <HypothesisDetail />
                  </Container>
                </ProtectedRoute>
              } />

              <Route path="/artifacts/:id" element={
                <ProtectedRoute>
                  <Container className="mt-4 pb-5">
                    <ArtifactsPage />
                  </Container>
                </ProtectedRoute>
              } />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;