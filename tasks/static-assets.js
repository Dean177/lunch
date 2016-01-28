const fs = require('fs-extra');
const path = require('path');

const inputDir =  path.join(__dirname, '..', 'src', 'server');
const outputDir = path.join(__dirname, '..', 'out', 'server');
const staticFiles = ['index.html', 'favicon.ico'];

fs.ensureDirSync(outputDir);
staticFiles.forEach(file => {
  fs.copySync(path.join(inputDir, file), path.join(outputDir, file));
});

