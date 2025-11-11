# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Lean Startup Assistant** React application that helps entrepreneurs validate business hypotheses using the Build-Measure-Learn methodology with AI integration. The app allows users to create hypotheses, generate AI-powered artifacts across different phases (Build, Measure, Learn, Pivot, Iterate), and analyze context coherence.

## Development Commands

```bash
# Start development server
npm start

# Build for production  
npm run build

# Run tests
npm test

# Run linting (if configured)
npm run lint

# Run type checking (if configured)
npm run typecheck
```

## Architecture Overview

### Core Concepts
- **Hypothesis-Driven Development**: Each business hypothesis contains multiple artifacts organized by Lean Startup phases
- **AI Integration**: Uses OpenAI-style API to generate hypothesis components and improve artifacts
- **Problem-First Approach**: All workflows start with problem definition before solution generation
- **Phase-Based Organization**: Artifacts are categorized into Build/Measure/Learn/Pivot/Iterate phases

### Key Architectural Patterns

#### Service Layer Pattern
All API communication goes through centralized services in `src/services/`:
- `api.js` - Base Axios configuration with token management
- `authService.js` - Authentication operations
- `hypothesisService.js` - Hypothesis CRUD operations  
- `aiService.js` - AI generation and improvement operations
- `artifactService.js` - Artifact management by phase
- `contextService.js` - Context coherence analysis

#### Context-Based State Management
Uses React Context for global state:
- `AuthContext` - User authentication and session management
- `ThemeContext` - Light/dark mode with system preference detection

#### Component Organization
- **Pages**: Main route components (`HypothesisList`, `HypothesisDetail`, `ArtifactsPage`)
- **Forms**: Complex form components with validation (`HypothesisForm`, `Login`, `Register`)
- **Utilities**: Reusable UI components (`Navigation`, `ProtectedRoute`, `ThemeToggle`)

### API Integration Points

The application expects a backend API at `http://localhost:5000/api` with the following key endpoints:

**Authentication:**
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

**Hypotheses:**
- `GET /hypotheses` - List user hypotheses
- `POST /hypotheses` - Create hypothesis
- `GET /hypotheses/:id` - Get hypothesis details
- `PUT /hypotheses/:id` - Update hypothesis
- `DELETE /hypotheses/:id` - Delete hypothesis

**AI Operations:**
- `POST /hypotheses/generate-from-problem` - Generate hypothesis options from problem
- `POST /artifacts/:hypothesisId/generate-ai/:phase` - Generate artifacts for phase
- `POST /artifacts/:artifactId/improve` - Improve specific artifact
- `POST /artifacts/:hypothesisId/improve-all/:phase` - Improve all phase artifacts

**Artifacts:**
- `GET /artifacts/:hypothesisId` - Get artifacts by hypothesis
- `POST /artifacts/:hypothesisId` - Create artifact
- `PUT /artifacts/:id` - Update artifact
- `DELETE /artifacts/:id` - Delete artifact
- `GET /artifacts/:hypothesisId/context-stats` - Get context analysis

### Authentication Flow
1. Token stored in localStorage with key 'user'
2. Axios request interceptor automatically attaches Bearer token
3. Global response interceptor handles 401 errors by redirecting to login
4. ProtectedRoute component guards authenticated routes

### Validation Strategy
- **Client-side validation** in utils/validation.js and utils/authValidation.js
- **Input sanitization** to prevent XSS attacks
- **Email typo detection** with correction suggestions
- **Password strength calculation** with security requirements
- **Real-time form validation** with visual feedback

### Theme System
- CSS variables in `src/styles/theme.css` for comprehensive theming
- Dark/light mode with automatic system preference detection  
- Smooth transitions between themes
- Bootstrap integration with custom theme variables

### Performance Optimizations
- React.memo for expensive components (HypothesisCard)
- useDebounce hook for search operations (300ms delay)
- useCallback for event handlers to prevent re-renders
- Lazy loading with React.Suspense (ready for implementation)

## Development Notes

### Adding New AI Endpoints
When adding new AI functionality, follow the pattern in `aiService.js`:
1. Create endpoint-specific function using the service factory pattern
2. Add comprehensive error handling and logging
3. Update the AI operations in relevant components

### Form Development
New forms should use the validation utilities in `src/utils/`:
- Import validation functions from validation.js
- Use real-time validation with visual feedback
- Follow the error handling pattern in existing forms

### Phase Management
When working with Lean Startup phases, use the standardized phase names:
- `build`, `measure`, `learn`, `pivot`, `iterate` (lowercase)
- Each phase has associated colors in the CSS theme system

### Testing Strategy
The project is configured for testing with:
- @testing-library/react for component testing
- @testing-library/jest-dom for DOM assertions  
- @testing-library/user-event for user interaction testing

When writing tests, focus on user interactions and business logic rather than implementation details.

### Git Workflow
Based on recent commits, the project follows:
- Main branch development
- Descriptive commit messages in Spanish
- Modified files should be reviewed for git status before commits

## Backend Configuration

The application is currently configured for local development with:
- Base URL: `http://localhost:5000/api` 
- Production URL commented out: `https://hypothesis-backend-production.up.railway.app/api`

To switch to production, update the BASE_URL in `src/services/api.js`.