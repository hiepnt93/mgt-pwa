import path from "path";
import jetpack from "fs-jetpack";
import { getAllFiles } from "./files";
import { NuxtModuleOptions } from "./interfaces";

export function addThemeLayouts(moduleObject: NuxtModuleOptions) {
  const layouts = getAllFiles(
    path.join(
      moduleObject.options.rootDir,
      "node_modules/@mgt-pwa/theme/layouts"
    )
  );
  layouts.forEach((layout) => {
    const layoutMatch = layout.match(
      /@mgt-pwa[\/\\\\]+theme[\/\\\\]+layouts[\/\\\\]+(.+)?.vue$/
    );
    const templateName = layoutMatch?.[1];
    const overrideExists = !!jetpack.exists(
      path.join(moduleObject.options.rootDir, "layouts", templateName + ".vue")
    );
    if (!overrideExists && templateName)
      moduleObject.addLayout({ src: layout }, templateName);
  });
}
