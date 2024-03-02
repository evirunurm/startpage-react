import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {'process.env': {
      'REACT_APP_FACTS_DOGS_URL':'https://dog-api.kinduff.com/api/facts',
      'REACT_APP_FACTS_CATS_URL':'https://catfact.ninja/fact',
      'REACT_APP_FACTS_JOKES_URL':'https://official-joke-api.appspot.com/random_joke'
    }
  }
})
