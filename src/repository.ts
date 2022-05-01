import pool from './db';
import { Item, IRepository } from './types';

class Repository implements IRepository {
  async getAll() {
    const allTodos = await pool.query('SELECT * FROM todo');
    return allTodos.rows;
  }

  async addItem(description: string) {
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description]
    );
    return newTodo.rows[0];
  }

  async getItem(id: number) {
    const todo = await pool.query('SELECT * FROM todo WHERE id = $1', [
      id,
    ]);
    return todo.rows[0];
  }

  async updateItem(item: Item) {
    await pool.query('UPDATE todo SET description = $1 WHERE id = $2', [
      item.description,
      item.id,
    ]);
  }

  async deleteItem(id: number) {
    await pool.query('DELETE FROM todo WHERE id = $1', [id]);
  }
}

export default new Repository();
