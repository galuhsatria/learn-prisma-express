import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();

const port = 5000;

const prisma = new PrismaClient();

app.use(express.json());

//create
app.post('/users', async (req, res, next) => {
  const { name, email, address } = req.body;
  const result = await prisma.users.create({
    data: {
      name: name,
      email: email,
      address: address,
    },
  });

  res.json({ data: result, message: 'User Created' });
});

// read
app.get('/users', async (req, res) => {
  const result = await prisma.users.findMany({
    select: {
      name: true,
      email: true,
      address: true,
    },
  });

  res.json({ data: result, message: 'User List' });
});

//update
app.patch('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, address } = req.body;
  const result = await prisma.users.update({
    data: {
      name: name,
      email: email,
      address: address,
    },
    where: {
      id: Number(id),
    },
  });

  res.json({ data: result, message: `User ${id} Updated` });
});

//delete
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  const result = await prisma.users.delete({
    where: {
      id: Number(id),
    },
  });

  res.json({ message: `User ${id} Deleted` });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
