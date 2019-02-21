class LocalStorageFromWindowProvider {
  constructor(window) {
    this.localStorage = window.localStorage;
  }

  get() {
    return this.localStorage;
  }
}

export default new LocalStorageFromWindowProvider(window);
