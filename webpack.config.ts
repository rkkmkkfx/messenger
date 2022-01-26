import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { Configuration } from 'webpack';

const devServer: DevServerConfiguration = {
  compress: true,
  port: 3000,
  static: path.join(__dirname, 'dist'),
  historyApiFallback: true,
};

const clientConfig: Configuration = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  target: 'web',
  entry: './src/index.tsx',
  mode: process.env.NODE_ENV as Configuration['mode'] ?? 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
    publicPath: '/',
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
  ],
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'url-loader',
      },
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
          },
        ],
      },
      {
        test: /\.(p)?css$/,
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
                namedExport: true,
                exportLocalsConvention: 'camelCaseOnly',
              },

            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  devServer,
  stats: {
    logging: 'verbose',
    moduleTrace: true,
    orphanModules: true,
    usedExports: true,
  },
};

const serverConfig = {
  target: 'node',
  entry: './src/server/app.ts',
  mode: process.env.NODE_ENV as Configuration['mode'] ?? 'development',
  output: {
    filename: 'server.js',
    path: path.resolve('dist'),
    publicPath: '/',
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [new TerserPlugin()],
  },
};

export default [clientConfig, serverConfig];
