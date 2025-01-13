export class FavoritesDatabase {
  private favorites: Set<string>;

  constructor() {
    this.favorites = new Set<string>();
  }

  has(id: string): boolean {
    return this.favorites.has(id);
  }

  add(id: string): void {
    this.favorites.add(id);
  }

  delete(id: string): void {
    this.favorites.delete(id);
  }
}

export const favoritesDb = new FavoritesDatabase();
