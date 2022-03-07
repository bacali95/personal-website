// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  webpack: (config, env) => {
    if (env === 'production') {
      config.optimization.splitChunks = { chunks: 'all' };
    }

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@core': path.resolve(__dirname, './src/core'),
        '@components': path.resolve(__dirname, './src/components'),
        '@data': path.resolve(__dirname, './src/data'),
      },
    };

    return config;
  },
};
