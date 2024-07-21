/**
 *
 * Singleton class representing an indexedDB connection in a promise based api.
 * TODO: Handle storage quota exceeded.., any user consent type of events need to be handled ?
 */
export class IndexedDB {
  private static instance?: IndexedDB;
  private static dbName = "backing-tracks";
  private static version = 1;
  static trackStore = "track_blobs";

  private dbConnection: IDBDatabase | null = null;

  private constructor() {}

  static getInstance(): IndexedDB {
    if (IndexedDB.instance === undefined) {
      IndexedDB.instance = new IndexedDB();
    }
    return IndexedDB.instance;
  }

  private isConnected(): boolean {
    return this.dbConnection !== null;
  }

  /**
   *
   * Iniitalizes connection and runs migrations
   */
  private async connect() {
    if (this.isConnected()) {
      return;
    }

    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(IndexedDB.dbName, IndexedDB.version);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;

        db.createObjectStore(IndexedDB.trackStore, { keyPath: "uri" });
      };

      request.onsuccess = (event: Event) => {
        this.dbConnection = (event.target as IDBOpenDBRequest).result;
        console.info("Initialized connection to IndexedDB.");

        this.dbConnection.onclose = () => {
          this.dbConnection = null;
          console.warn("Database connection closed unexpectedly.");
        };

        resolve();
      };

      request.onerror = (event: Event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  async get<T>(storeName: string, key: string) {
    if (!this.isConnected()) {
      await this.connect();
    }

    return new Promise<T | null>((resolve, reject) => {
      const transaction = this.dbConnection!.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = () => {
        resolve(request.result ?? null);
      };

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }

  async add<T>(storeName: string, data: T) {
    if (!this.isConnected()) {
      await this.connect();
    }

    return new Promise<void>((resolve, reject) => {
      const transaction = this.dbConnection!.transaction(
        storeName,
        "readwrite"
      );
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }

  async delete(storeName: string, key: string) {
    if (!this.isConnected()) {
      await this.connect();
    }

    return new Promise<void>((resolve, reject) => {
      const transaction = this.dbConnection!.transaction(
        storeName,
        "readwrite"
      );
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }
}
