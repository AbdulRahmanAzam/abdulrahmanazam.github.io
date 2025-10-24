// Portfolio is a static site, so we don't need database storage
// All data is defined in shared/schema.ts

export interface IStorage {
  // No storage needed for static portfolio
}

export class MemStorage implements IStorage {
  constructor() {
    // No initialization needed
  }
}

export const storage = new MemStorage();