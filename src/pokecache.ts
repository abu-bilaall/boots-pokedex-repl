type CacheEntry<T> = {
  createdAt: [number];
  val: T;
};

type Timeout = ReturnType<typeof setTimeout>; // NodeJS.Timeout in node env, number in browser env

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    const entry: CacheEntry<T> = {
        createdAt: [Date.now()],
        val: val,
    }

    this.#cache.set(key, entry);
  }

  get<T>(key: string): CacheEntry<any> | undefined {
    return this.#cache.get(key);
    return this.#cache.get(key)?.val;
  }

  #reap() {
    for (const item of this.#cache) {
      if (item[1].createdAt[0] < (Date.now() - this.#interval)) {
        this.#cache.delete(item[0]);
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(this.#reap.bind(this), this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
