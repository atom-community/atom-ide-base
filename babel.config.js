let presets = [
  [
    "babel-preset-atomic",
    {
      addModuleExports: false,
    },
  ],
];

let plugins = []

module.exports = {
  presets: presets,
  plugins: plugins,
  ignore: [
    "node_modules/**",
    "nuclide/**/node_modules/**", "dist-nuclide/**/node_modules/**", // do not transform node_modules
    "**/fixtures/symbol-definition-preview-sample.js" // should be used as it is
  ],
  sourceMap: "inline",
}
