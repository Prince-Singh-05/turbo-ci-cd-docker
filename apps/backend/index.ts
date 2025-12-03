import express from "express";
import cors from "cors";
import { prisma } from "db/client";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/get-users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({
    users,
  });
});

app.post("/user", async (req, res) => {
  const { username, password } = req.body;

  const newUser = await prisma.user.create({
    data: {
      username,
      password,
    },
  });

  res.json({
    newUser,
    message: "User created successfully",
  });
});

app.get("/get-todos", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json({
    todos,
  });
});

app.post("/todo", async (req, res) => {
  const { task } = req.body;

  const newTodo = await prisma.todo.create({
    data: {
      task,
      completed: false,
      userId: "default-user",
    },
  });

  res.json({
    newTodo,
    message: "Todo created successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
