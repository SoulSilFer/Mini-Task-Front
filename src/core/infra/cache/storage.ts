interface IStorage {
  get: (key: string) => any;
  set: (key: string, value: any) => Promise<void>;
  delete: (key: string) => Promise<void>;
}

const prefix = '@SilFer';

export class SessionStorage implements IStorage {
  async set(key: string, value: any): Promise<void> {
    await sessionStorage.setItem(`${prefix}_${key}`, JSON.stringify(value));
  }

  get(key: string): any {
    const data = sessionStorage.getItem(`${prefix}_${key}`);
    return data ? JSON.parse(data) : null;
  }

  async delete(key: string): Promise<void> {
    if (!key) return;
    await sessionStorage.removeItem(`${prefix}_${key}`);
  }
}

export class LocalStorage implements IStorage {
  async set(key: string, value: any): Promise<void> {
    await localStorage.setItem(`${prefix}_${key}`, JSON.stringify(value));
  }

  get(key: string): any {
    const data = localStorage.getItem(`${prefix}_${key}`);
    return data ? JSON.parse(data) : null;
  }

  async delete(key: string): Promise<void> {
    if (!key) return;
    await localStorage.removeItem(`${prefix}_${key}`);
  }
}
