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
      imports: {
        filenamePattern: {
          '+.css': [], // Отключаем автоматическое создание +.css
        },
      },
    }),
    pug({
      root: './src', // Позволяет делать include от корня src
      options: {
        pretty: true, // Красивое форматирование итогового HTML без сжатия в одну строку
      },
    }),
  ],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0, // Не вшивать мелкие картинки в base64
  },
});
