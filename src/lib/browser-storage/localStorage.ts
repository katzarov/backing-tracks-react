export class LocalStorage {
  private static keyPrefix = "bt_";

  private static getKeyWithPrefix(key: string) {
    return `${this.keyPrefix}${key}`;
  }

  static write(key: string, value: string | number | null) {
    const data = JSON.stringify({ value });

    const keyWithPrefix = this.getKeyWithPrefix(key);
    localStorage.setItem(keyWithPrefix, data);
  }

  static read<T extends number | string>(key: string) {
    const keyWithPrefix = this.getKeyWithPrefix(key);
    const value = localStorage.getItem(keyWithPrefix);

    if (value === null || value === undefined) {
      return null;
    }

    try {
      const parsed: { value: T } = JSON.parse(value);

      // todo check for shape of obj, if it includes value prop

      return parsed.value;
    } catch (error) {
      console.error("Error JSON parsing localStorage item", error);
      return null;
    }
  }
}
