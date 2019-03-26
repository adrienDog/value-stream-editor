import localStorageProvider from './LocalStorageProvider';

const STORE_KEY = 'valueStream';
const subKeys = {
  rawJson: `${STORE_KEY}:rawJson`
};
const localStorage = localStorageProvider.get();

class ValueStreamStore {
  constructor(localStorage) {
    this.localStorage = localStorage;
    console.debug('storage', localStorage);
  }

  async save(json) {
    const raw = JSON.stringify(json);
    localStorage.setItem(subKeys.rawJson, raw);
  }

  async clear() {
    console.log('removing item', subKeys.rawJson);
    localStorage.removeItem(subKeys.rawJson)
  }

  async get() {
    const raw = localStorage.getItem(subKeys.rawJson);
    if (raw === 'undefined') return undefined;
    return JSON.parse(raw);
  }
}

export default new ValueStreamStore(localStorage);
