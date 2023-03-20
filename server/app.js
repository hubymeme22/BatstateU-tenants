import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';

import api from './api/api.js';
import uiConnector from './middleware/AppUIConnector.js';

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
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api', api);
app.use('/', uiConnector);

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
