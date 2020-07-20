const { execSync } = require("child_process");

const pkg = require("../package.json");
if (pkg["package-deps"]) {
  const deps = Array.from(pkg["package-deps"]);
  for (const dep of deps) {
    execSync(`apm install ${dep}`);
  }
}
