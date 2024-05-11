<p align="center">
  <img src="https://i.ibb.co/VSMGVXd/logo-secondary.png" width="200" alt="AAS Logo">
</p>

<div align="center">
  <h1>Academic Administration Solution</h1>
</div>

[![Client](https://img.shields.io/badge/Client-Yes-brightgreen)](https://github.com/fahimahammed/academic-administration-solution-client) [![Version](https://img.shields.io/badge/Version-1.0-blue)](https://github.com/fahimahammed/academic-administration-solution-server) [![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)](https://github.com/fahimahammed/academic-administration-solution-server) [![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)


## Introduction

Welcome to the Academic Administration Solution client repository! This client-side application is a crucial component of our university management system, providing an intuitive user interface for students, faculty, and administrators to interact with the system's features efficiently.

## Getting Started

To set up the client-side application locally, follow these steps:

1. **Clone the Repository:** 
   ```
   git clone https://github.com/fahimahammed/academic-administration-solution-client.git
   ```
   
2. **Install Dependencies:** 
   ```
   cd academic-administration-client
   yarn install
   ```

3. **Run the Development Server:**
   ```
   yarn dev
   ```

4. **Access the Application:**
   - Open your web browser and navigate to `http://localhost:3000`.

## Technology Stack

- **Next.js:** React framework for building server-side rendered (SSR) and statically generated web applications.
- **Ant Design (antd):** React UI library with a set of high-quality components for building elegant and responsive user interfaces.
- **TypeScript:** Typed superset of JavaScript that enhances code maintainability and scalability.
- **Redux:** State management library for managing application state in a predictable and efficient manner.

## Folder Structure

The client-side application follows a standard folder structure:

```
academic-administration-client/
├── public/
├── src/
    ├── assets/        # Static assets like icons, images, and other files
    ├── components/    # Reusable React components
    ├── constants/     # Constants used across the application
    ├── contexts/      # React context providers
    ├── helpers/       # Helper functions and utilities
    ├── hooks/         # Custom React hooks
    ├── pages/         # Next.js pages
    ├── redux/         # Redux setup, actions, and reducers
    ├── schemas/       # Data schemas and validation
    ├── services/      # API services and integrations
    ├── styles/        # CSS stylesheets and global styles
    ├── transformer/   # Data transformation utilities
    ├── types/         # TypeScript type definitions
    ├── ui/            # UI components and styles
    └── utils/         # Miscellaneous utilities
```

