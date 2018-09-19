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
    config.entry.bundle.shift()
    const rules = config.module.rules
    const babelOptions = rules[0].use.options
    babelOptions.presets[0][1].useBuiltIns = 'usage'
    babelOptions.plugins.push(
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-function-bind',
      '@babel/plugin-syntax-import-meta',
      ['@babel/plugin-proposal-class-properties', { loose: false }],
      '@babel/plugin-proposal-json-strings'
    )

    rules.pop()
    rules.pop()
    rules.push(
      {
        test: /\.css$/,
        include: base('client'),
        use: ['style-loader', cssLoader, postcssLoader]
      },
      {
        test: /\.css$/,
        exclude: base('client'),
        use: ['style-loader', 'css-loader', postcssLoader]
      },
      {
        test: /\.g(raph)?ql$/,
        loader: 'raw-loader'
      }
    )

    if (process.env.NODE_ENV === 'production') {
      config.devtool = 'source-map'
    }

    return config
  }
}

function base (loc) {
  return path.resolve(__dirname, 'app', loc)
}
