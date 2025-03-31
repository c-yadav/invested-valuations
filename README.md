# Invested Valuations

## Overview

Invested Valuations is a web application built with Vue 3 and Vite. It allows users to calculate company valuations using financial methods such as Margin of Safety, Ten Cap Value, and Payback Time. The application provides features to add, update, and visualize company data, including charts for valuation metrics.

## Features

- Add and manage company data, including financial metrics.
- Calculate valuations using:
  - Margin of Safety
  - Ten Cap Value
  - Payback Time
- Visualize valuation metrics with interactive charts.
- Dark mode support.

## Tech Stack

- **Frontend**: Vue 3, Tailwind CSS
- **Build Tool**: Vite
- **Charting**: Chart.js
- **State Management**: VueUse

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd invested-valuations
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the application in your browser at `http://localhost:3000`.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run preview`: Preview the production build.

## Project Structure

- `src/`: Contains the source code.
  - `components/`: Vue components for the application.
  - `routers/`: Vue Router configuration.
  - `styles/`: CSS and Tailwind styles.
- `public/`: Static assets.
- `index.html`: Entry point for the application.

## Configuration

- **Tailwind CSS**: Configured in `tailwind.config.js`.
- **PostCSS**: Configured in `postcss.config.js`.
- **TypeScript**: Configured in `tsconfig.json` and related files.
