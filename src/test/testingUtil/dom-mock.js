import jsdom from 'jsdom';

function propagateToGlobal(window) {
  for (const key in window) {
    if (!window.hasOwnProperty(key) &&
      key in global) {
      global[key] = window[key];
    }
  }
}

global.document = jsdom.jsdom('<!DOCTYPE html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = { userAgent: 'node.js' };

propagateToGlobal(global.window);
