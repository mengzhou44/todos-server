import { Server, ServerInjectResponse } from '@hapi/hapi';
import { createRepository, TestRepository } from './test-repostiory';
import { setRoutes } from '../src/routes';
import { IRepository, Item } from '../src/types';

describe('todo apis test', () => {
  let server: Server;
  let repository: TestRepository;
  beforeEach(async () => {
    server = new Server();
    repository = createRepository();
    setRoutes(server, repository);
    await server.start();
  });

  afterEach(async () => {
    await server.stop();
  });

  it('GET /todos -> array todos', async () => {
    const { payload } = await server.inject('/todos');
    const items = JSON.parse(payload);
    expect(items.length).toBe(2);

    const item: Item = items[0];
    expect(item.id).toBe(12);
    expect(item.description).toBe('clean dishes');
  });

  it('GET /todos/:id -> get a specific to do item', async () => {
    const req = {
      method: 'GET',
      url: '/todos/12',
    };
    const { payload } = await server.inject(req);
    const item = JSON.parse(payload);
    expect(item.id).toBe(12);
    expect(item.description).toBe('clean dishes');
  });

  it('GET /todos/:id -> 404 if not found', async () => {
    const req = {
      method: 'GET',
      url: '/todos/88',
    };
    const res: ServerInjectResponse = await server.inject(req);
    expect(res.statusCode).toBe(404);
  });

  it('POST /todos/add -> create a todo', async () => {
    const req = {
      method: 'POST',
      url: '/todos/add',
      payload: JSON.stringify({
        description: 'buy pillow',
      }),
    };
    await server.inject(req);
    expect(repository.list.length).toBe(3);
  });

  it('PUT /todos/edit -> edit a todo', async () => {
    const req = {
      method: 'PUT',
      url: '/todos/edit/12',
      payload: JSON.stringify({
        description: 'Updated',
      }),
    };
    await server.inject(req);
    expect(repository.list[0].description).toBe('Updated');
  });


  it('DELETE /todos/delete -> delete todo', async () => {
    const req = {
      method: 'DELETE',
      url: '/todos/delete/12',
    };
    await server.inject(req);
    expect(repository.list.length).toBe(1);
  });
});
