const mockLocalStorage = () => ({
  setItem(key, val) {
    this[key] = `${val}`;
  },
  getItem(key) {
    return this[key];
  },
});

export default mockLocalStorage;
