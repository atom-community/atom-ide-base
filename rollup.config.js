import { createPlugins } from "rollup-plugin-atomic";

const plugins = createPlugins(["ts", "js"], false); // babel is false

export default [
  {
    input: "src/main.ts",
    output: [
      {
        dir: "dist",
        format: "cjs",
        sourcemap: true,
      },
    ],
    // loaded externally
    external: ["atom"],
    plugins: plugins,
  },
];
