import api from './api';

// Generar un artefacto con IA
export const generateArtifactWithAI = async (hypothesisId, phase) => {
  try {
    const response = await api.post(`/artifacts/${hypothesisId}/generate-ai/${phase}`);
    return response.data;
  } catch (error) {
    console.error('Error generating artifact with AI:', error);
    throw error;
  }
};

// Mejorar un artefacto existente con IA
export const improveArtifactWithAI = async (artifactId, prompt = null) => {
  try {
    const response = await api.post(`/artifacts/${artifactId}/improve`, { prompt });
    return response.data;
  } catch (error) {
    console.error('Error improving artifact with AI:', error);
    throw error;
  }
};

// NUEVA FUNCIÓN: Mejorar todos los artefactos de una fase
export const improveAllArtifactsWithAI = async (hypothesisId, phase) => {
  try {
    const response = await api.post(`/artifacts/${hypothesisId}/improve-all/${phase}`);
    return response.data;
  } catch (error) {
    console.error('Error improving all artifacts with AI:', error);
    throw error;
  }
};

// Generar opciones de hipótesis desde un problema
export const generateHypothesisOptions = async (problem) => {
  try {
    const response = await api.post('/hypotheses/generate-from-problem', { problem });
    return response.data;
  } catch (error) {
    console.error('Error generating hypothesis options:', error);
    throw error;
  }
};