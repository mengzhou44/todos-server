import { Item, IRepository } from '../src/types';

export class TestRepository implements IRepository {
  list: Array<Item>;
  constructor() {
    this.list = [
      {
        id: 12,
        description: 'clean dishes',
      },
      {
        id: 14,
        description: 'walk the dog!',
      },
    ];
  }
  async getAll(): Promise<Array<Item>> {
    return this.list;
  }

  async addItem(description: string) {
    let newItem: Item = { id: 999, description };
    this.list.push(newItem);
    return newItem;
  }

  async getItem(id: number): Promise<Item> {
    const found = this.list.find((item: Item) => item.id == id);
    if (found === undefined) {
      throw new TypeError('This value was promised to be there.');
    }
    return found;
  }

  async updateItem(item: Item) {
    let found = await this.getItem(item.id);
    found.description = item.description;
  }

  async deleteItem(id: number) {
    this.list = this.list.filter((item: Item) => item.id !== id);
  }
}


export const createRepository = () => new TestRepository();

 
