import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const useGlobalSearch = (hypotheses = [], artifacts = []) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Combinar todos los resultados de búsqueda
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const results = [];
    const searchTerm = query.toLowerCase();
    
    // Buscar en hipótesis
    hypotheses.forEach(hypothesis => {
      const matchesName = hypothesis.name?.toLowerCase().includes(searchTerm);
      const matchesProblem = hypothesis.problem?.toLowerCase().includes(searchTerm);
      const matchesSegment = hypothesis.customerSegment?.toLowerCase().includes(searchTerm);
      
      if (matchesName || matchesProblem || matchesSegment) {
        results.push({
          type: 'hypothesis',
          id: hypothesis.id,
          title: hypothesis.name,
          subtitle: hypothesis.problem?.substring(0, 100) + '...',
          icon: 'lightbulb',
          action: () => navigate(`/hypothesis/${hypothesis.id}`)
        });
      }
    });

    // Buscar en artefactos
    artifacts.forEach(artifact => {
      const matchesTitle = artifact.title?.toLowerCase().includes(searchTerm);
      const matchesContent = artifact.content?.toLowerCase().includes(searchTerm);
      const matchesPhase = artifact.phase?.toLowerCase().includes(searchTerm);
      
      if (matchesTitle || matchesContent || matchesPhase) {
        results.push({
          type: 'artifact',
          id: artifact.id,
          title: artifact.title,
          subtitle: `${artifact.phase} • ${artifact.content?.substring(0, 80)}...`,
          icon: 'file-text',
          action: () => navigate(`/artifacts/${artifact.hypothesisId}?phase=${artifact.phase}`)
        });
      }
    });

    // Agregar acciones de navegación
    const navItems = [
      { name: 'Nueva Hipótesis', path: '/create', icon: 'plus-circle', keywords: ['nueva', 'crear', 'hipotesis'] },
      { name: 'Lista de Hipótesis', path: '/', icon: 'list', keywords: ['lista', 'todas', 'hipotesis'] },
      { name: 'Inicio', path: '/', icon: 'house', keywords: ['inicio', 'home', 'principal'] }
    ];

    navItems.forEach(item => {
      const matchesName = item.name.toLowerCase().includes(searchTerm);
      const matchesKeywords = item.keywords.some(keyword => keyword.includes(searchTerm));
      
      if (matchesName || matchesKeywords) {
        results.push({
          type: 'navigation',
          title: item.name,
          subtitle: 'Navegación',
          icon: item.icon,
          action: () => navigate(item.path)
        });
      }
    });

    return results.slice(0, 8); // Limitar a 8 resultados
  }, [query, hypotheses, artifacts, navigate]);

  const executeAction = (index) => {
    if (searchResults[index]) {
      searchResults[index].action();
      setIsOpen(false);
      setQuery('');
    }
  };

  return {
    query,
    setQuery,
    isOpen,
    setIsOpen,
    searchResults,
    selectedIndex,
    setSelectedIndex,
    executeAction
  };
};