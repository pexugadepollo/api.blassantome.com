import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { rateLimiter } from './middlewares/rateLimit';
import helmet from 'helmet';
import { mailRouter } from './routes/mail';

dotenv.config({ path: 'development.env' });

const app = express();
app.use(rateLimiter);
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'development'
        ? `http://localhost:${process.env.PORT}`
        : 'https://blassantome.com',
  })
);

app.use('/mail', rateLimiter, mailRouter);

app.listen(process.env.PORT, () => {
    console.log(`API listening on port ${process.env.PORT}`);
  })