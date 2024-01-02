import express, { Request, Response } from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';
import categoryRoute from './routes/categoryRoute';
import AppDataSource from './dbConnection';

dotenv.config();

const { PORT } = process.env;
const app = express();
app.use('/api/categories', categoryRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('VKUSEDA');
});
const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('DB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
