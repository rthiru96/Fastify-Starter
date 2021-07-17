import { FastifyInstance } from 'fastify';
import AutoLoad from 'fastify-autoload';
import Sensible from 'fastify-sensible';
import path from 'path';
export default async function app(fastify: FastifyInstance): Promise<void> {
  // Register Sensible for error helpers
  // Note: Sensible has an internal error handler, it has to be disabled if a custom one is needed
  // see https://github.com/fastify/fastify-sensible#custom-error-handler
  fastify.register(Sensible);

  // AutoLoads routes and plugin from the "routes" and "plugins" folders

  fastify.register(AutoLoad, { dir: path.join(__dirname, 'routes') });

  fastify.register(AutoLoad, { dir: path.join(__dirname, 'plugins') });
}
