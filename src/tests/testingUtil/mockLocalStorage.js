const localStorage = {
  setItem: function (key, val) {
    this[key] = val + '';
  },
  getItem: function (key) {
   return this[key];
  },
};

export default localStorage;
