import { dirname } from "path";
import { promisify } from "util";
import { stat } from "fs";
const statAsync = promisify(stat);

export async function getCwd(target = ""): Promise<string | undefined> {
    let cwd: string;

    if (target) {
      cwd = target;
    } else {
      const previousActiveItem = atom.workspace.getActivePaneItem() as {getPath?: () => string}
      cwd = previousActiveItem?.getPath?.() as string
      if (cwd) {
        const dir = atom.project.relativizePath(cwd)[0]
        if (dir) {
          // Use project paths whenever they are available by default.
          return dir
        }
      }
    }

    try {
      if (cwd) {
        // Otherwise, if the path exists on the local file system, use the
        // path or parent directory as appropriate.
        const stats = await statAsync(cwd)
        if (stats.isDirectory()) {
          return cwd
        }

        cwd = dirname(cwd)
        const dirStats = await statAsync(cwd)
        if (dirStats.isDirectory()) {
          return cwd
        }
      }
    } catch {
      //fail silently
    }

    cwd = atom.project.getPaths()[0]
    // no project paths
    return cwd
  }
