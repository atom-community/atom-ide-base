let presets = ["babel-preset-atomic"]

let plugins = []

module.exports = {
  presets: presets,
  plugins: plugins,
  ignore: ["node_modules/**", "nuclide/**/node_modules/**", "dist-nuclide/**/node_modules/**"],
  sourceMap: "inline",
}
