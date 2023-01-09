const path = require('path');

module.exports = {
  staticDirs: ['../public'],
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
    builder: {
      name: "@storybook/builder-webpack5",
      options: {
        fsCache: true
      }
    }
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

    config.module.rules.push({
      test: /\.(jpg|png|webp|jpeg)$/i,
      type: 'asset/resource'
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