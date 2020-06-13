import * as autoprefixer from 'autoprefixer';
import * as dotenv from 'dotenv';
import * as TSCheckerPlugin from 'fork-ts-checker-webpack-plugin';
import * as HTMLPlugin from 'html-webpack-plugin';
import * as MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import * as OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin';
import * as path from 'path';
// @ts-ignore
import * as RemovePlugin from 'remove-files-webpack-plugin';
import * as HTMLScriptPlugin from 'script-ext-html-webpack-plugin';
import * as TerserPlugin from 'terser-webpack-plugin';
import {
  Configuration,
  EnvironmentPlugin,
  HotModuleReplacementPlugin,
  NormalModuleReplacementPlugin,
} from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import * as FilterWarningsPlugin from 'webpack-filter-warnings-plugin';
import * as NotifierPlugin from 'webpack-notifier';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

dotenv.config();

const devMode = process.env.NODE_ENV === 'development';
// const hmr = !!process.env.WEBPACK_HMR;
const devServer = process.argv.some(v => v === 'webpack-dev-server');

const faviconTags = `
  <!-- put favicon tags here -->
`;

const statsConfig = devMode
  ? {
      all: false,
      assets: true,
      colors: true,
      hash: true,
      builtAt: true,
      timings: true,
      errors: true,
      errorDetails: true,
      logging: 'info',
      warnings: true,
      version: true,
      context: path.resolve(__dirname, 'src'),
    }
  : {};

export default <Configuration>{
  mode: devMode ? 'development' : 'production',
  entry: ((folders: string) => {
    const output: { [index: string]: [string, ...string[]] } = {};
    for (const folder of folders.split(' '))
      output[folder] =
        // hmr
        //   ? [
        //       'webpack-dev-server/client?http://localhost:8080',
        //       'webpack/hot/only-dev-server',
        //       `./src/${folder}/index.tsx`,
        //     ]
        //   :
        [`./src/pages/${folder}/index.tsx`];

    return output;
  })('main about downloads'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: devMode ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: devMode ? '[name].js' : '[name].[contenthash].js',
    pathinfo: true,
    publicPath: '/',
  },
  experiments: { topLevelAwait: true },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    },
  },
  devServer: <WebpackDevServerConfiguration>{
    index: './views/home.html',
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/views/home.html' },
        { from: /^\/about\/?$/, to: '/views/about.html' },
        { from: /^\/downloads\/?$/, to: '/views/downloads.html' },
      ],
    },
    host: '0.0.0.0',
    // hot: hmr,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    public: 'http://localhost:8080',
    contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'dist')],
    stats: statsConfig,
  },
  devtool: devMode ? 'inline-source-map' : 'source-map',
  watchOptions: {
    ignored: ['./public/**', './server/**', './node_modules/**'],
  },
  optimization: devMode
    ? {
        runtimeChunk: 'single',
        minimize: false,
        minimizer: undefined,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      }
    : {
        // TODO fix this
        usedExports: false,

        // runtimeChunk: 'single',
        minimize: true,
        minimizer: [
          new TerserPlugin({
            test: /\.(j|t)sx?$/i,
            sourceMap: true,
            extractComments: false,
          }),
        ],
        splitChunks: {
          // chunks: 'initial',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              chunks: 'all',
              priority: 10,
            },
            common: {
              test: /[\\/]src[\\/](common|components)[\\/]/,
              name: 'common',
              chunks: 'all',
              priority: 6,
            },
            default: {
              minChunks: 2,
              priority: 0,
              reuseExistingChunk: true,
            },
          },
        },
      },
  stats: statsConfig,
  plugins: (() => {
    const plugins: Array<any> = [
      // ...dllNames.map(name => {
      //   const manifest = require(path.resolve(__dirname, `dist/library/${name}.manifest.json`));
      //   console.log(inspect(manifest));
      //   return new DllReferencePlugin({
      //     context: '/',
      //     manifest,
      //     name,
      //   });
      // }),
      new RemovePlugin({
        before: {
          exclude: ['./dist/library'],
          test: [
            {
              folder: './dist',
              method: () => true,
            },
            {
              folder: './dist/views',
              method: (itemPath: string) => /analyze-\d+\.html/.test(itemPath),
            },
          ],
          logWarning: true,
          logError: true,
          log: true,
          logDebug: true,
        },
        watch: { beforeForFirstBuild: true },
      }),
      new TSCheckerPlugin({ eslint: true, silent: true }),
      new EnvironmentPlugin(['BLUEPRINT_NAMESPACE']),
      new FilterWarningsPlugin({
        exclude: [
          /export 'unstable_renderSubtreeIntoContainer' \(imported as 'ReactDOM'\) was not found in 'react-dom'/,
        ],
      }),
      new NormalModuleReplacementPlugin(
        /.*\/generated\/iconSvgPaths.*/,
        path.resolve(__dirname, 'src/library/iconSvgPaths.js')
      ),
      new HTMLScriptPlugin({
        sync: /runtime(\..+)?\.js/,
        // async: /vendor(-jquery)?(\..+)?\.js/,
        defaultAttribute: 'defer',
      }),
      // html plugins
      ...((pages: {
        [chunk: string]: HTMLPlugin.Options & {
          preBody?: string;
          postBody?: string;
          preHead?: string;
          postHead?: string;
        };
      }) => {
        const output: Array<HTMLPlugin> = [];
        for (const [chunk, options] of Object.entries(pages))
          output.push(
            new HTMLPlugin({
              inject: false,
              chunks: [chunk],
              minify: 'auto',
              faviconTags,
              template: './src/pages/template.ejs',
              preHead: '<link rel="stylesheet" href="/library/blueprint.css"/>',
              // preBody: dllNames
              //   .map(name => `<script defer src="/library/${name}.dll.js"></script>`)
              //   .join('\n'),
              ...options,
            })
          );

        return output;
      })({
        main: { title: 'Home', filename: './views/home.html' },
        about: { title: 'About', filename: './views/about.html' },
        downloads: { title: 'Downloads', filename: './views/downloads.html' },
      }),
    ];

    devMode
      ? plugins.push(
          new NotifierPlugin({ title: 'webpack' }),
          new BundleAnalyzerPlugin({ openAnalyzer: false })
        )
      : plugins.push(
          new OptimizeCSSPlugin(),
          new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static',
            reportFilename: `./views/analyze-${Date.now()}.html`,
          })
        );

    false // hmr
      ? plugins.push(new HotModuleReplacementPlugin())
      : plugins.push(
          new MiniCSSExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: devMode ? '[name].css' : '[name].[contenthash].css',
          })
        );

    return plugins;
  })(),
  module: {
    rules: [
      {
        test: /\.(jp(e?)g|png|gif|mp3|ttf|eot|woff)$/i,
        loader: 'file-loader',
        options: {
          name: () => (devMode ? '[path][name].[ext]' : '[contenthash].[ext]'),
        },
      },
      { test: /\.svg$/i, loader: 'svg-inline-loader' },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          false /* hmr */ ? 'style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true, plugins: [autoprefixer()] } },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.js(x?)$/i,
        enforce: 'pre',
        loader: 'source-map-loader',
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.ts(x?)/i,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: { transpileOnly: true, experimentalWatchApi: true },
          },
        ],
      },
    ],
  },
};
