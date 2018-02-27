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
  webpack (config) {
    const rules = config.module.rules
    rules.pop()
    rules[0].use.options.presets.push(require('@babel/preset-stage-0'))
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
  }
}

function base (loc) {
  return path.resolve(__dirname, loc)
}
