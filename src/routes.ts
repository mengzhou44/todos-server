import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { IRepository } from './types';

const createError = (error: unknown) => {
  if (error instanceof Error) return error;
  return new Error(String(error));
};

export const setRoutes = (server: Server, repository: IRepository) => {
  server.route({
    method: 'GET',
    path: '/',
    handler: () => {
      return 'Hello World!';
    },
  });

  server.route({
    method: 'POST',
    path: '/token',
    handler: async (request, h) => {
      try {
        const { email, providerToken } = request.payload;
        
      } catch (err) {
        console.log((err as any).message);
        throw createError(err);
      }
    },
  });

  server.route({
    method: 'GET',
    path: '/todos',
    handler: async () => {
      try {
        const list = await repository.getAll();
        return list;
      } catch (err) {
        console.log((err as any).message);
        throw createError(err);
      }
    },
  });

  server.route({
    method: 'POST',
    path: '/todos/add',
    handler: async (req: Request) => {
      try {
        const { description } = req.payload as any;
        const added = await repository.addItem(description);
        return added;
      } catch (err) {
        throw createError(err);
      }
    },
  });

  server.route({
    method: 'GET',
    path: '/todos/{id}',
    handler: async (req: Request, h: ResponseToolkit) => {
      try {
        const { id } = req.params;
        const item = await repository.getItem(id);
        return item;
      } catch (err) {
        return h.response('Not Found').code(404);
      }
    },
  });

  server.route({
    method: 'PUT',
    path: '/todos/edit/{id}',
    handler: async (req: Request, h: ResponseToolkit) => {
      try {
        const id = parseInt(req.params.id);
        const { description } = req.payload as any;
        await repository.updateItem({ id, description });
        return h.response().code(201);
      } catch (err) {
        throw createError(err);
      }
    },
  });

  server.route({
    method: 'DELETE',
    path: '/todos/delete/{id}',
    handler: async (req: Request, h: ResponseToolkit) => {
      try {
        const id = parseInt(req.params.id);
        await repository.deleteItem(id);
        return h.response().code(200);
      } catch (err) {
        throw createError(err);
      }
    },
  });
};
