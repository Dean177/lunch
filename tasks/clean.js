const del = require('del');
const path = require('path');

del([
  path.join(__dirname, '..', 'out','**'),
  path.join(__dirname, '..', 'build-artifacts','**'),
]);