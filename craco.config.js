const path = require('path');
const webpack = require('webpack');
 
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    plugins: [
        // Work around for Buffer is undefined:
        // https://github.com/webpack/changelog-v5/issues/10
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        // new webpack.ProvidePlugin({
        //     process: 'process/browser',
        // }),
    ],
  },
};
