const path = require('path')

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[name]__[local]___[hash:base64:5]',
    importLoaders: 1
  }
}

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: [
      require('postcss-import')(),
      require('postcss-url')({
        url: 'inline'
      }),
      require('postcss-cssnext')(),
      require('postcss-browser-reporter')(),
      require('postcss-reporter')(),
      require('postcss-remove-root')
    ]
  }
}

module.exports = {
  port: 1298,
  middleware: require('./app/server'),
  webpack (config) {
    const loaders = config.module.loaders
    loaders.pop()
    loaders[0].use.options.presets.push(require('@babel/preset-stage-0'))
    loaders.push({
      test: /\.css$/,
      include: base('app/client'),
      use: ['style-loader', cssLoader, postcssLoader]
    }, {
      test: /\.css$/,
      exclude: base('app/client'),
      use: ['style-loader', 'css-loader', postcssLoader]
    })
  }
}

function base (loc) {
  return path.resolve(__dirname, loc)
}
