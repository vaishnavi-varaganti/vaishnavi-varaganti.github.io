// Storage file kept for compatibility, but empty since we're using a static site
// No storage or database is needed for this frontend-only application

class NoOpStorage {
  constructor() {
    // Empty constructor - no initialization needed
  }
}

export const storage = new NoOpStorage();
