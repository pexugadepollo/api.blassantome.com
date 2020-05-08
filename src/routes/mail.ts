import { Router } from 'express';
import { sendMail } from '../controllers/mail/sendMail';

export const mailRouter = Router();

mailRouter.post('/send', sendMail);
