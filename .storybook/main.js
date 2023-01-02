const path = require('path');
// const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions",
  // "storybook-addon-next-router",
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
    config.resolve.plugins = [...(config.resolve.plugins || [])
    // new TsConfigPathsPlugin({
    //   extensions: config.resolve.extensions
    // })
    ];

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