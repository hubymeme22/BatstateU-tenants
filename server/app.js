import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';

import api from './api/api.js';

const app = express();
const appIP = process.env.IP;
const appPort = process.env.PORT;
const mongodbURI = process.env.MONGODB_URI;
const corsOptions = {
  origin: process.env.ACCEPTED_URIS,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api', api);

console.log('[*] Connecting to database...');

mongoose.set('strictQuery', true);
mongoose
  .connect(mongodbURI)
  .then(() => {
    console.log('[+] Connected to database!');
    app.listen(appPort, appIP, () => {
      console.log(`[+] Server started at: http://${appIP}:${appPort}/`);
    });
  })

  .catch((error) => {
    console.log('[-] An error occured!');
    console.log(error);
  });
