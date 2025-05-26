# Song Studio - Vite React App

## Getting Started

Install dependencies:

```bash
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode using Vite.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload automatically when you make changes.\
You may also see lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`

Serves the built app from the `build` folder for testing the production build locally.

### `npm test`

Launches the test runner using Vitest.

## Future Implementations

### Search Functionality

- Add a search bar to filter songs by name, artist, or genre
- Implement real-time search with debounce functionality

### Filtering Options

- Create filter mechanisms for:
  - Genre
  - Release Year
  - Artist

### Sorting Capabilities

- Enable sorting of songs by:
  - Title (A-Z, Z-A)
  - Artist
  - Release Year
  - Duration

### Enhanced Pagination

- Improve current pagination with:
  - Page size selection
  - Total song count display
  - Keyboard navigation support

### API Integration

- Implement data fetching using Axios
- Create service layer for API calls
- Add error handling and loading states
- Support dynamic song library from backend
