import Hapi from '@hapi/hapi';
import { setRoutes } from './routes';
import repository from './repository';
 
const init = async () => {
  const server = Hapi.server({
    port: 3001,
    host: 'localhost',
    routes: {
      cors: true,
    },
  });

  setRoutes(server, repository);
  await server.start();
  console.log('Server running on port 3001');
};

init();
