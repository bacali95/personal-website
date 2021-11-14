import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), viteTsConfigPaths()],
});
