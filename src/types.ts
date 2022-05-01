export interface Item {
  id: number;
  description: string;
}

export interface IRepository {
  getAll: () => Promise<Array<Item>>;
  addItem: (description: string) => Promise<Item>;
  getItem: (id: number) => Promise<Item>;
  updateItem: (item: Item) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
}
