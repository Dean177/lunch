const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

//const buildArtifactsOut = './build-artifacts';
const mocha = new Mocha({
  // reporter: 'min'
  // reporter: 'mocha-junit-reporter',
  // reporterOptions: { mochaFile: path.join(buildArtifactsOut, 'tests.xml') },
});
const testDir = './out/tests/client';

fs.readdirSync(testDir)
  .filter((file) => file.substr(-3) === '.js') // Only keep the .js files
  .forEach((file) => mocha.addFile(path.join(testDir, file)));

mocha.run((failures) => {
  process.on('exit', () => { process.exit(failures); });
});
