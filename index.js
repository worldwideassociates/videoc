// server.js
const fs = require('fs');
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const logFilePath = './server.log'; // Specify the file path for the log

// Function to write logs to file
const writeLog = (log) => {
  fs.appendFile(logFilePath, log + '\n', (err) => {
    if (err) {
      console.error('Error writing log:', err);
    }
  });
};

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    writeLog(`[${new Date().toISOString()}] Request: ${req.url}`); // Log the request

    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
