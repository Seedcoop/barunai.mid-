import { copyFile, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

const outputDir = "public";
const staticFiles = ["index.html", "app.js", "styles.css", "gate-config.js"];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

await Promise.all(
  staticFiles.map((file) => copyFile(file, join(outputDir, file)))
);

console.log(`Copied ${staticFiles.length} static files to ${outputDir}/`);
