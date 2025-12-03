import { prisma } from "db/client";

Bun.serve({
  port: 8081,
  fetch(request, server) {
    // upgrade the request to websocket
    if (server.upgrade(request)) {
      return;
    }

    return new Response("Upgrade failed", { status: 400 });
  },
  websocket: {
    async message(ws, message) {
      await prisma.todo.create({
        data: {
          task: Math.random().toString(36).substring(7),
          completed: false,
          userId: "44783a72-1c0c-43dc-99d9-8d309c65d8f1",
        },
      });
      ws.send(message);
    },
  },
});
