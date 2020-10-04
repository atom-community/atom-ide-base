import { createPlugins } from "rollup-plugin-atomic"

const plugins = createPlugins([
  ["ts", { tsconfig: "./src-package/tsconfig.json", noEmitOnError: false, module: "ESNext" }],
  "js"
])

export default [
  {
    input: "src-package/main.ts",
    output: [
      {
        dir: "package",
        format: "cjs",
        sourcemap: true,
      },
    ],
    // loaded externally
    external: ["atom"],
    plugins: plugins,
  },
]
