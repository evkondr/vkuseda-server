import express, { Request, Response } from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';
import path from 'path';
import categoryRoute from './routes/categoryRoute';
import menuRoute from './routes/menuRoute';
import authRoute from './routes/authRoute';
import ordersRoute from './routes/ordersRoute';
import AppDataSource from './dbConnection';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const { PORT } = process.env;
const app = express();

app.use(express.json());

app.use('/api/categories', categoryRoute);
app.use('/api/menu', menuRoute);
app.use('/api/auth', authRoute);
app.use('/api/orders', ordersRoute);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Vkuseda API');
});
app.use(express.static(path.join(__dirname, 'images')));
app.use(errorHandler);
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
