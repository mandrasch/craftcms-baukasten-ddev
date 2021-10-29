import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import ViteRestart from 'vite-plugin-restart';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import critical from 'rollup-plugin-critical';
// import { ViteFaviconsPlugin } from 'vite-plugin-favicon';
import path from 'path';

// https://vitejs.dev/config/
export default ({ command }) => ({
  base: command === 'serve' ? '' : '/dist/',
  build: {
    emptyOutDir: true,
    manifest: true,
    outDir: './web/dist',
    rollupOptions: {
      input: {
        app: './src/js/app.ts',
      },
      output: {
        sourcemap: true,
      },
    },
  },
  plugins: [
    critical({
      criticalUrl: 'https://stage.baukasten.io/',
      criticalBase: './web/dist/criticalcss/',
      criticalPages: [
        { uri: '', template: 'index' }
      ],
      criticalConfig: {},
    }),
    // ViteFaviconsPlugin({
    //   /** Your source logo (Will default to ) */
    //   logo: '../src/public/img/favicon-src.svg',
    //   favicons: {
    //     appName: 'craftcms-baukasten',
    //     background: '#244F43',
    //     theme_color: '#244F43',
    //   },
    // }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    nodeResolve({
      moduleDirectories: [path.resolve('./node_modules')],
    }),
    ViteRestart({
      reload: [
        './translations/**/*',
        './templates/**/*'
      ],
      restart: [
        './tailwind.config.js',
        './postcss.config.js',
        './tailwind/**/*',
      ]
    }),
    vue(),
  ],
  publicDir: './src/public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@NPM': '/node_modules',
    },
  },
  server: {
    origin: 'http://localhost:3000/src/',
    host: '0.0.0.0',
  },
});
