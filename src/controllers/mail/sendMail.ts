import { Request, Response } from 'express';
import nodemailer, { SendMailOptions } from 'nodemailer';

export const sendMail = async (req: Request, res: Response) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.subject ||
    !req.body.body
  ) {
    res.status(400).json({
      status: 'error',
      error: 'Todos los campos son requeridos',
    });
    return;
  }

  const { name, email, subject, body } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions: SendMailOptions = {
      from: email,
      to: process.env.NODEMAILER_RECEIVER,
      subject,
      html: `
			<h3>Mensaje de ${name}.</h3>
			<h4>${email} ha escrito un mensaje desde tu web:</h4>
			<p>${body}</p>
		`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    res.status(500).json({ status: 'error', error });
  }
};
