let presets = ["babel-preset-atomic"]

let plugins = []

module.exports = {
  presets: presets,
  plugins: plugins,
  ignore: ["node_modules/**", "nuclide/dist-nuclide-commons/node_modules/**", "nuclide/dist-nuclide-commons-atom/node_modules/**", "nuclide/dist-nuclide-commons-ui/node_modules/**", "nuclide/dist-nuclide-debugger-common/node_modules/**", "nuclide/dist-nuclide-node-transpiler/node_modules/**"],
  sourceMap: "inline",
}
