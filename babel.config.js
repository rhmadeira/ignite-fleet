module.exports = function (api) {
  api.cache(true);
  const plugins = [
    'react-native-paper/babel',
    'babel-plugin-styled-components',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        allowUndefined: false,
      },
    ],
  ];

  return {
    presets: ['babel-preset-expo'],

    plugins,
  };
};
