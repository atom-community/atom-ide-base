const {spawnSync} = require("child_process");
const pkg = require("./package.json");
const deps = Array.from(pkg["package-deps"]).map(d => d.name);
for (const dep of deps) {
	spawnSync(`apm install ${dep}`)
}
