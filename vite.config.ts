import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {'process.env': {
      'REACT_APP_FACTS_DOGS_URL':'https://dog-api.kinduff.com/api/facts',
      'REACT_APP_FACTS_CATS_URL':'https://catfact.ninja/fact',
      'REACT_APP_FACTS_JOKES_URL':'https://official-joke-api.appspot.com/random_joke'
    }
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/presentation/view/components'),
      '@view': path.resolve(__dirname, 'src/presentation/view'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@entity': path.resolve(__dirname, 'src/domain/entity'),
      '@viewModels': path.resolve(__dirname, 'src/presentation/view-model'),
      "@interactors": path.resolve(__dirname, 'src/domain/interactors'),
      "@utils": path.resolve(__dirname, 'src/utils'),
      "@styles": path.resolve(__dirname, 'src/presentation/styles'),
    },
  },
})
