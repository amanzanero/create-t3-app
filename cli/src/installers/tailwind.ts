import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type Installer } from "~/installers/index.js";
import { addPackageDependency } from "~/utils/addPackageDependency.js";

export const tailwindInstaller: Installer = ({ projectDir, packages }) => {
  addPackageDependency({
    projectDir,
    dependencies: [
      "tailwindcss",
      "postcss",
      "prettier",
      "prettier-plugin-tailwindcss",
    ],
    devMode: true,
  });

  const extrasDir = path.join(PKG_ROOT, "template/extras");

  const twFile = packages?.shadcn.inUse
    ? "tailwind-with-shadcn.config.ts"
    : "tailwind.config.ts";
  const twCfgSrc = path.join(extrasDir, `config/${twFile}`);
  const twCfgDest = path.join(projectDir, "tailwind.config.ts");

  const postcssCfgSrc = path.join(extrasDir, "config/postcss.config.cjs");
  const postcssCfgDest = path.join(projectDir, "postcss.config.cjs");

  const prettierSrc = path.join(extrasDir, "config/_prettier.config.js");
  const prettierDest = path.join(projectDir, "prettier.config.js");

  const cssFile = packages?.shadcn.inUse ? "globals-shadcn.css" : "globals.css";
  const cssSrc = path.join(extrasDir, `src/styles/${cssFile}`);
  const cssDest = path.join(projectDir, "src/styles/globals.css");

  fs.copySync(twCfgSrc, twCfgDest);
  fs.copySync(postcssCfgSrc, postcssCfgDest);
  fs.copySync(cssSrc, cssDest);
  fs.copySync(prettierSrc, prettierDest);
};
