import { Prisma, Note } from '@prisma/client';
import { Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';

// Json Validation

const Note = Type.Object({
  id: Type.Number(),
  title: Type.String(),
  text: Type.Optional(Type.String({})),
});

const Notes = Type.Array(Note);

const NoteInput = Type.Object({
  title: Type.String(),
  text: Type.Optional(Type.String({})),
});

const CreateNoteInput = NoteInput;

const UpdateNoteInput = NoteInput;

// Routes

const notes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get(
    '/notes',
    {
      schema: {
        response: {
          200: Notes,
        },
      },
    },
    async () => {
      return await fastify.prisma.note.findMany();
    },
  );

  fastify.get<{ Params: { id: number }; Response: Note }>(
    '/notes/:id',
    {
      schema: {
        params: Type.Object({
          id: Type.Number(),
        }),
        response: {
          200: Note,
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params;

      const note = await fastify.prisma.note.findUnique({
        where: {
          id: id,
        },
      });

      if (!note) reply.notFound();

      reply.send(note);
    },
  );

  fastify.post<{ Body: Prisma.NoteCreateInput; Response: Note }>(
    '/notes',
    {
      schema: {
        body: CreateNoteInput,
        response: {
          200: Note,
        },
      },
    },
    async (req) => {
      const { title, text } = req.body;
      return await fastify.prisma.note.create({
        data: {
          title,
          text,
        },
      });
    },
  );

  fastify.put<{ Params: { id: number }; Body: Prisma.NoteUpdateInput; Response: Note }>(
    '/notes/:id',
    {
      schema: {
        params: Type.Object({
          id: Type.Number(),
        }),
        body: UpdateNoteInput,
        response: {
          200: Note,
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params;
      const { title, text } = req.body;

      const exists =
        (await fastify.prisma.note.count({
          where: {
            id,
          },
        })) !== 0;

      if (!exists) {
        reply.notFound();
      }

      return await fastify.prisma.note.update({
        where: {
          id,
        },
        data: {
          title,
          text,
        },
      });
    },
  );

  fastify.delete<{ Params: { id: number } }>(
    '/notes/:id',
    {
      schema: {
        params: Type.Object({
          id: Type.Number(),
        }),
        response: {
          200: Note,
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params;

      const exists =
        (await fastify.prisma.note.count({
          where: {
            id,
          },
        })) !== 0;

      if (!exists) {
        reply.notFound();
      }

      await fastify.prisma.note.delete({
        where: {
          id,
        },
      });
      reply.code(204).send();
    },
  );
};

export default notes;
