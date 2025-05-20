# Messiah Meal Planner

A web app to help Messiah University students plan and budget their dining dollars for the semester.

## Overview

Messiah Meal Planner lets you:
- Enter your semester dates, starting balance, and meal plan type.
- Browse available meals and add them to your weekly plan.
- Create and manage custom meals.
- Use a meal queue to batch-add meals to multiple days.
- See a summary of your spending, including charts and projections.
- See if you're on budget and get warnings if you'll run out of funds.

The main application logic starts in [`src/main.tsx`](src/main.tsx).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/nickslick03/messiah-meal-planner.git
   cd messiah-meal-planner
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

### Running the App

Start the development server:
```sh
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
```
The production build will be in the `dist/` folder.

### Deploying to GitHub Pages

```sh
npm run gh-pages
```
This runs the build and pushes the result to the `gh-pages` branch, which deploys the app to production.

## Project Structure

- [`src/main.tsx`](src/main.tsx): Main entry point and application logic.
- `src/components/`: React components for UI sections (meals, queue, editor, results, etc) as well as shared UI components.
- `src/static/`: Static data, constants, and tooltips.
- `src/types/`: TypeScript type definitions.
- `src/hooks/`: Custom React hooks.
- `src/lib/`: Utility functions and calculations.
- `src/assets/`: Images and icons.
- `src/test/`: Unit tests.
- `src/types/`: TypeScript type definitions.

## Contributing

Pull requests are welcome! Please open an issue first to discuss changes.

## License

This project is licensed under the [MIT License](LICENSE).

---

By [Caleb Rice](https://www.linkedin.com/in/caleb-rice-2626-cs/) and [Nicholas Epps](https://www.linkedin.com/in/nicholas-epps-597b94295/).
