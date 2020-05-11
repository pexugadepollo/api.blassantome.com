import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { rateLimiter } from './middlewares/rateLimit';
import helmet from 'helmet';
import { mailRouter } from './routes/mail';
import { githubRouter } from './routes/github';

dotenv.config({ path: 'development.env' });

const app = express();
app.use(rateLimiter);
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'development'
        ? `http://localhost:3000`
        : 'https://blassantome.com',
  })
);


app.use('/mail', rateLimiter, mailRouter);
app.use('/github', githubRouter);
if (process.env.LE_URL && process.env.LE_CONTENT) {
  app.get(process.env.LE_URL, function(_, res) {
    return res.send(process.env.LE_CONTENT)
  });
}
app.listen(process.env.PORT, () => {
    console.log(`API listening on port ${process.env.PORT}`);
  })