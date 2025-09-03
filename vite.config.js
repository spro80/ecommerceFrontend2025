import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const passthroughEnvKeys = ['VITE_API_BASE_URL', 'VITE_GOOGLE_CLIENT_ID', 'VITE_APP_SITE_NAME'];
  const reactAppEnvKeys = Object.keys(env)
    .filter((k) => k.startsWith('REACT_APP_') || passthroughEnvKeys.includes(k))
    .reduce((acc, key) => {
      acc[`import.meta.env.${key}`] = JSON.stringify(env[key]);
      return acc;
    }, {});

  return {
    plugins: [react()],
    define: {
      ...reactAppEnvKeys,
    },
  };
});
