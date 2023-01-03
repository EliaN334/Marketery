const path = require('path');

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions",
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss')
        }
      }
    }],
  framework: {
    name: "@storybook/nextjs",
    options: {
      nextConfigPath: path.resolve(__dirname, '../next.config.cjs')
    }
  },
  core: {
    builder: "@storybook/builder-webpack5"
  },
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.css$/,
      use: [{
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [require('tailwindcss', 'autoprefixer')]
          }
        }
      }],
      include: path.resolve(__dirname, '../')
    });
    return config;
  },
  features: {
    storyStoreV7: true
  },
  docs: {
    autodocs: true
  }
};