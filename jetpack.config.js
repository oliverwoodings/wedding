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
      require('postcss-cssnext')(),
      require('postcss-browser-reporter')(),
      require('postcss-reporter')(),
      require('postcss-remove-root')
    ]
  }
}

module.exports = {
  port: 1298,
  webpack (config) {
    const rules = config.module.rules
    rules.pop()
    const babelPresets = rules[0].use.options.presets
    babelPresets[0][1].useBuiltIns = 'usage'
    babelPresets[0][1].targets = '> 1%'
    babelPresets.push(require('@babel/preset-stage-0'))

    rules.push({
      test: /\.css$/,
      include: base('client'),
      use: ['style-loader', cssLoader, postcssLoader]
    }, {
      test: /\.css$/,
      exclude: base('client'),
      use: ['style-loader', 'css-loader', postcssLoader]
    }, {
      test: /\.g(raph)?ql$/,
      loader: 'raw-loader'
    })

    if (process.env.NODE_ENV === 'production') {
      config.devtool = 'source-map'
    }
  },
  html: 'server/index.html'
}

function base (loc) {
  return path.resolve(__dirname, loc)
}
