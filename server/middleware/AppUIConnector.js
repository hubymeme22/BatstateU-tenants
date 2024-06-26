import express, { Router } from 'express';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const uiConnector = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// connection for the app interface
// checks for existence of file
if (fs.existsSync(path.join(__dirname, '..', 'static', 'index.html'))) {
  console.log('[+] Buildfile exists!');
  console.log('[*] Adding middleware connection...');

  uiConnector.use(express.static('server/static'));
  uiConnector.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'static', 'index.html'));
  });

  console.log('[+] Middleware UI added!');
} else {
  console.log('[!] "static/index.html" file does not exist!');
  console.log('[*] Server will start as api mode');
}

export default uiConnector;
