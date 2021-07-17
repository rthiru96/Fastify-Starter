import Fastify from 'fastify';
import * as dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

// Setup dotenv and dotenv expand
const dotenvConfig = dotenv.config();
dotenvExpand(dotenvConfig);

const PORT = process.env.PORT || 3000;

// Setup fastify
const fastify = Fastify({ logger: true });

fastify.register(import('./index'));

// Start server
fastify.listen(PORT, '0.0.0.0', console.log);
