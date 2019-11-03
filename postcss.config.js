const postcssPresetEnv = require('postcss-preset-env')
const postcssRem = require('postcss-rem')

module.exports = {
  plugins: [
    postcssRem(),
    postcssPresetEnv({
      preserve: false,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'custom-selectors': true,
        'color-mod-function': { unresolved: 'warn' },
      },
      importFrom: './src/style/index.css',
    }),
  ],
}
