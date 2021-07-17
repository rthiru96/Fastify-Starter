import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin = async (fastify: FastifyInstance) => {
  // Creates new Prisma Cliente
  const prisma = new PrismaClient({
    log: ['error', 'warn'],
  });

  // Connect to DB
  await prisma.$connect();

  // Makes prisma instance available trought the app -> fastify.prisma
  fastify.decorate('prisma', prisma);

  // Disconnect from DB
  fastify.addHook('onClose', async (fastify) => {
    fastify.log.info('disconnecting Prisma from DB');
    await fastify.prisma.$disconnect();
  });
};

export default fp(prismaPlugin);
