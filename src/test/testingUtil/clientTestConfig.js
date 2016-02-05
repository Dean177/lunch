require('babel-register');
function noop() { return ''; }
require.extensions['.css'] = noop;
require.extensions['.less'] = noop;
require.extensions['.png'] = noop;
