import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FavoriteItem {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  size: string;
  style: string;
  description: string;
  stock: number;
}

interface FavoritesState {
  items: FavoriteItem[];
  addItem: (item: FavoriteItem) => void;
  removeItem: (id: string) => void;
  totalItems: () => number;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          if (state.items.some((favorite) => favorite.id === item.id)) {
            return state;
          }

          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      totalItems: () => get().items.length,
    }),
    { name: 'art-favorites' },
  ),
);
