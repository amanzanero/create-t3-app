import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const shadcnInstaller: Installer = ({ projectDir }) => {
  addPackageDependency({
    projectDir,
    dependencies: [
      "class-variance-authority",
      "clsx",
      "lucide-react",
      "tailwind-merge",
      "tailwindcss-animate",
    ],
    devMode: false,
  });

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const utilsSrc = path.join(extrasDir, "src/lib/utils.ts");
  const utilsDest = path.join(projectDir, "src/lib/utils,ts");

  const componentsSrc = path.join(extrasDir, "config/components.json");
  const componentsDest = path.join(projectDir, "components.json");

  fs.copySync(utilsSrc, utilsDest);
  fs.copySync(componentsSrc, componentsDest);
};
