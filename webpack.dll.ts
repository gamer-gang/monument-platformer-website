import * as dotenv from 'dotenv';
import * as _ from 'lodash/fp';
import * as path from 'path';
import { Configuration, DllPlugin, EnvironmentPlugin } from 'webpack';
import * as autoprefixer from 'autoprefixer';
import * as MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import * as OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin';

dotenv.config();

const devMode = process.env.NODE_ENV === 'development';

const dllNames: string[] = [];
let dllScriptTags = '';

const dll = (
  name: string,
  filename: string,
  entry: string | string[],
  options?: Omit<Configuration, 'entry' | 'output'>
) => {
  const config = <Configuration>{
    mode: devMode ? 'development' : 'production',
    devtool: devMode ? 'inline-source-map' : 'source-map',
    entry: {},
    output: {
      filename,
      path: path.resolve(__dirname, 'dist/library'),
      library: name,
    },
    stats: 'detailed',
    plugins: [
      new DllPlugin({
        name,
        context: '/',
        path: path.resolve(__dirname, `dist/library/${name}.manifest.json`),
      }),
    ],
  };

  config.entry![name] = entry;

  options && options.plugins && config.plugins!.push(...options.plugins) && delete options.plugins;

  dllNames.push(name);

  return _.merge(_.cloneDeep(config), options);
};

export default <Configuration[]>[
  dll('blueprint', 'blueprint.css.js', './src/library/blueprint.scss', {
    plugins: [
      // @ts-ignore
      new MiniCSSExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].css',
        esModule: true,
      }),
      // @ts-ignore
      new OptimizeCSSPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
        { test: /\.svg$/i, loader: 'svg-inline-loader' },
        {
          test: /\.(sa|sc|c)ss$/i,
          use: [
            MiniCSSExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true, plugins: [autoprefixer()] } },
            { loader: 'sass-loader' },
          ],
        },
      ],
    },
  }),
  // dll('preact', 'preact'),
];

export { dllNames };
