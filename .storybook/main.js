// .storybook/main.js

module.exports = {
  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: true, // type-check stories during Storybook build
  },
  core: {
    builder: 'webpack5',
  },
  // https://github.com/storybookjs/storybook/issues/16555#issuecomment-1418252785
  webpackFinal: async (config) => {
    config.output.hashFunction = 'sha512'
    return config
  },
}
