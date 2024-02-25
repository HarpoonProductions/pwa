const fs = require("fs");
const path = require("path");

const basePath = "/Users/alexmarshall/Documents/GitHub/pwa"; // Adjust to your project's path
const prefix = "/pwa"; // This will be prefixed to all the paths
let urlsToCache = [];

function readDirectory(directory) {
  fs.readdirSync(directory, { withFileTypes: true }).forEach((file) => {
    if (file.name.startsWith(".")) {
      // Skip hidden files and directories
      return;
    }
    const absolutePath = path.join(directory, file.name);
    if (file.isDirectory()) {
      readDirectory(absolutePath);
    } else {
      // Replace the base path and format it for web use
      const webPath = absolutePath
        .replace(basePath, prefix)
        .replace(/\\/g, "/");
      urlsToCache.push(`"${webPath}"`);
    }
  });
}

readDirectory(basePath);

// Output to paths.txt, with each path wrapped in quotes and comma-separated
const outputPath = path.join(__dirname, "paths.txt");
fs.writeFileSync(outputPath, urlsToCache.join(",\n"), "utf-8");
console.log(`Paths written to ${outputPath}`);
