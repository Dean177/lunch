const mockLocalStorage = () => {
  return {
    setItem(key, val): void {
      this[key] = val + '';
    },
    getItem(key): string {
      return this[key];
    },
  };
};

export default mockLocalStorage;
