module.exports = {
  plugins: [
    'postcss-nested',
    'postcss-flexbugs-fixes',
    [
      'autoprefixer',
      {
        flexbox: 'no-2009',
        grid: 'autoplace',
      },
    ],
    [
      'postcss-preset-env',
      {
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
  ],
};
