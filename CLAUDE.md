# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI-powered multiple choice examination system with a Rails 8 API backend and Next.js 15 frontend. The Rails app uses the module name `AiMultipleChoice` and is configured in API-only mode.

## Development Commands

### Rails Backend
```bash
bin/setup                    # Initial project setup
bin/rails server            # Start Rails API server (port 3000)
bin/rails console           # Rails console
bin/rails db:migrate        # Run database migrations
bin/rails db:seed           # Seed database
bin/rubocop                 # Code style checking
bin/brakeman               # Security analysis
```

### Next.js Frontend
```bash
cd frontend
npm install                 # Install dependencies
npm run dev                # Start development server with Turbopack
npm run build              # Production build
npm run lint               # ESLint checking
```

## Architecture

### Backend Structure
- **API-only Rails**: Configured for JSON API responses
- **Database**: SQLite3 with Solid Cache, Solid Queue, Solid Cable
- **Deployment**: Kamal with Docker support
- **Security**: Brakeman and Rubocop configured

### Frontend Structure
- **Next.js 15**: App Router with React 19 and TypeScript
- **Styling**: Tailwind CSS 4.x
- **Fonts**: Geist Sans and Geist Mono optimized
- **Path Aliases**: `@/*` maps to `./*` (frontend root)

### Directory Structure
```
frontend/
├── app/                    # App Router pages
├── components/             # Shared components
│   ├── ui/                # Basic UI components
│   └── layout/            # Layout components
├── lib/                   # External library configs
├── hooks/                 # Custom hooks
├── services/              # API services
├── types/                 # TypeScript definitions
└── utils/                 # Utility functions
```

### Current State
- Rails: API-only with health check endpoint (`/up`)
- Frontend: Base structure established with shared utilities
- API client and common types configured

## Development Workflow

1. **Dual Server Setup**: Rails typically runs on port 3000, so frontend needs different port
2. **API Integration**: Configure Next.js to communicate with Rails API backend
3. **Database**: Use `bin/rails db:migrate` before starting development
4. **Code Quality**: Run `bin/rubocop` for Rails and `npm run lint` for frontend

## Key Configuration

- **Rails**: API-only mode, CORS available but commented out
- **TypeScript**: Strict mode enabled with path aliases
- **Deployment**: Kamal configuration included for production deployment
- **Module Name**: Use `AiMultipleChoice` for Rails module naming