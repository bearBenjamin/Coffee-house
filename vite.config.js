import { defineConfig } from 'vite';
import vituum from 'vituum';
import pug from '@vituum/vite-plugin-pug';
import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap';

export default defineConfig({
  base: './', // Относительные пути в итоговой сборке (удобно для заказчика и GitHub Pages)
  plugins: [
    VitePluginSvgSpritemap('./src/assets/icons/*.svg', {
      prefix: 'icon-',
      svgo: true,
    }),
    vituum({
      pages: {
        dir: './src/pug/pages', // Указываем новую папку со страницами
        normalizeBasePath: true, // Корректные относительные пути при base: './'
      },
      imports: {
        filenamePattern: {
          '+.css': [], // Отключаем автоматическое создание +.css
        },
      },
    }),
    pug({
      root: './src/pug', // Меняем корень для extends и include на src/pug
      options: {
        pretty: true, // Красивое форматирование итогового HTML без сжатия в одну строку
      },
    }),
  ],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0, // Не вшивать мелкие картинки в base64
    rollupOptions: {
      input: [
        './src/pug/pages/**/*.{json,pug,html}', // Указываем новую папку для продакшн-сборки
        '!./src/pug/pages/**/*.{pug,html}.json',
      ],
    },
  },
});
