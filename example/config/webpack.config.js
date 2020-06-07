const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const { resolve } = path;

function buildEntry() {
  let root = resolve(__dirname,'../');
  let entrys = fs.readdirSync(root);
  let outs = entrys.reduce((entries, dir) => {
    const fullDir = path.join(root, dir)
    const entry = path.join(fullDir, 'app.ts')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ['webpack-hot-middleware/client', entry];
    }
    return entries;
  }, {});
  return outs;
}


//  new HtmlWebpackPlugin({
//       template: resolve(__dirname, '../template/index.html'),
//       filename: 'index.html',
//       // chunks: ['common', 'app']
//     }),


module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  entry: buildEntry(),
  output: {
    path: resolve(__dirname, '../bin/'),
    filename: '[name].js',
    publicPath: '/__build__/'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader'
        ]
      }
    ]
  },
}