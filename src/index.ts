import express, { Request, Response } from 'express';
import categoryRoute from './routes/categoryRoute';
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT
const app = express();
app.use('/api/categories', categoryRoute)

app.get('/', (req: Request, res: Response) => {
  res.send("VKUSEDA");
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
});