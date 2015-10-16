const MockLocalStorage = () => {
  return {
    setItem(key, val) {
      this[key] = val + '';
    },
    getItem(key) {
      return this[key];
    },
  };
};

export default MockLocalStorage;
