import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';
import svgr from 'vite-plugin-svgr';
// import basicSsl from '@vitejs/plugin-basic-ssl';

/** @type {import('vite').UserConfig} */

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, __dirname, '') };

  return {
    // Although this is called root,
    // in our case this is "src",
    // where our application logic is located.
    // All configuration options defined
    // afterwards will be relative to this endpoint.
    root: 'src',

    // This is where our assets are served from.
    // In webpack, this was "output.publicPath".
    base: '/',

    // This is similar to Webpack's DefinePlugin.
    // It is used to inject constants in your application.
    define: {
      // Using the following configuration made our build fail as
      // mentioned above. I had to change a couple of `global` usages
      // and remove this configuration to make them work.
      // global: { }
    },

    server: {
      // We need https for various 3rd party tools used
      // in local environment. It is similar to
      // Webpack Dev Server's 'server: "https"' config.
      // We require a certificate for this to work and that is
      // achieved through the 'basicSsl' plugin.
      // You can check the actual code to see which package is that.
      https: true,

      // We are proxying all requests from `/api` to our api server.
      // This config is very similar to Webpack Dev Server's proxy config.
      proxy: {},
    },

    // This is almost equivalent to Webpack's "resolve" config.
    // It is used to import files using aliases.
    resolve: {
      alias: [
        {
          find: /^~/,
          replacement: '',
        },
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src'),
        },
      ],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    // Assets under this folder will be copied to the dist folder.
    // We used to achieve the same functionality using
    // the "copy-webpack-plugin" package.
    // Do not forget that this is relative to the "root" path configured above.
    publicDir: '@/src/public',
    // List of plugins used to make various technologies work.
    plugins: [
      // used to add https to local environment
      // basicSsl(),
      // used to include our bundles inside the html file
      createHtmlPlugin({}),
      // used to import svgs
      svgr(),
      // used to make react work with vite
      react(),
    ],
    build: {
      // Specify the dist folder
      outDir: '../dist',
    },
    // Loading a file was failing and adding this configuration
    // fixed it. It basically replaces top-level "this" usage
    // with the "window" object.
    esbuild: {
      define: {
        this: 'window',
      },
    },
  };
});
