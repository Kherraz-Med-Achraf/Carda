import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // Rend les tokens du design system disponibles dans TOUS
        // les fichiers SCSS, sans avoir besoin de les importer.
        // On utilise "styles/..." + loadPaths pour que Sass
        // résolve correctement depuis n'importe quel dossier.
        additionalData: '@use "styles/tokens" as *;\n',
        loadPaths: ['src'],
      },
    },
  },
})

