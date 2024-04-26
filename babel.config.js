module.exports = function (api) {
  api.cache(true);
  const plugins = ['react-native-paper/babel', "babel-plugin-styled-components"];

  return {
    presets: ['babel-preset-expo'],

    plugins,
  };
};
