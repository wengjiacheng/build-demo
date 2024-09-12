import { defineConfig, loadEnv } from '@rsbuild/core'
import { pluginVue2 } from '@rsbuild/plugin-vue2'
import { pluginBabel } from '@rsbuild/plugin-babel'
import { pluginVue2Jsx } from '@rsbuild/plugin-vue2-jsx'
import { pluginLess } from '@rsbuild/plugin-less'
import { pluginCssMinimizer } from '@rsbuild/plugin-css-minimizer'

const { publicVars } = loadEnv({ prefixes: ['VUE_APP_'] })

export default defineConfig({
  plugins: [
    pluginBabel(),
    pluginVue2(),
    pluginVue2Jsx(),
    pluginLess({
      lessLoaderOptions: {
        lessOptions: {
          math: 'always',
        },
      },
    }),
    pluginCssMinimizer(),
  ],
  output: {
    assetPrefix: '/cv3/',
    cleanDistPath: true,
    polyfill: 'usage',
    sourceMap: {
      js:
        process.env.NODE_ENV === 'development'
          ? 'cheap-module-source-map'
          : false,
    },
  },
  source: {
    entry: {
      app: './src/main.js',
    },
    define: publicVars,
    alias: {
      '@': './src',
    },
    include: [
      /[\\/]node_modules[\\/]tslib[\\/]/,
      /[\\/]node_modules[\\/]@rspack[\\/]core[\\/]/,
    ],
    transformImport: [
    ],
  },
  dev: {
    progressBar: true,
  },
  html: {
    template: './public/index.html',
  },
  tools: {

    rspack: (config, { appendPlugins }) => {
      return config
    },

    htmlPlugin(config, { entryName }) {
      if (entryName === 'app') {
        config.filename = 'index.html'
      }
    },
  },
  performance: {
    removeConsole: ['log', 'warn'],
  },
})
