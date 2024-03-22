import express, { Request, Response } from 'express';
import https from 'node:https';
import http from 'node:http';
import fs from 'node:fs/promises';
import 'reflect-metadata';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import categoryRoute from './routes/categoryRoute';
import menuRoute from './routes/menuRoute';
import authRoute from './routes/authRoute';
import ordersRoute from './routes/ordersRoute';
import emailRouter from './routes/mailRoute';
import AppDataSource from './dbConnection';
import errorHandler from './middleware/errorHandler';

dotenv.config();
const { PORT } = process.env;
const serverOptions = {
  key: '',
  cert: '',
};
// SSL configuration
(async () => {
  try {
    const key = await fs.readFile('/etc/letsencrypt/live/vkuseda-nn.ru/privkey.pem', { encoding: 'utf8' });
    const cert = await fs.readFile('/etc/letsencrypt/live/vkuseda-nn.ru/fullchain.pem', { encoding: 'utf8' });
    serverOptions.key = key;
    serverOptions.cert = cert;
  } catch (error) {
    console.log(error);
  }
})();

// App configuration
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/categories', categoryRoute);
app.use('/api/menu', menuRoute);
app.use('/api/auth', authRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/email', emailRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Vkuseda API');
});
app.use(express.static(path.join(__dirname, 'images')));
app.use(errorHandler);
// Init server
const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('DB connected successfully');
    if (serverOptions.key && serverOptions.cert) {
      https.createServer(serverOptions, app).listen(PORT, () => {
        console.log(`Server running at https://localhost:${PORT}`);
      });
    } else {
      http.createServer(app).listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// Start server
startServer();
