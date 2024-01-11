import express, { Request, Response } from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';
import categoryRoute from './routes/categoryRoute';
import menuRoute from './routes/menuRoute';
import AppDataSource from './dbConnection';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const { PORT } = process.env;
const app = express();

app.use(express.json());

app.use('/api/categories', categoryRoute);
app.use('/api/menu', menuRoute);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Home page');
});

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
