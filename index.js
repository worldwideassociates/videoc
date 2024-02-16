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

// Function to handle errors and log them
const logError = (error) => {
  writeLog(`[${new Date().toISOString()}] Error: ${error.stack || error}`);
};

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    try {
      // Handle requests
      handle(req, res, parsedUrl);
      writeLog(`[${new Date().toISOString()}] Request: ${req.url}; body: ${req.body}`); // Log the request
    } catch (error) {
      // Log errors
      logError(error);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
    // Create or clear log file
    fs.writeFile(logFilePath, '', (err) => {
      if (err) {
        console.error('Error clearing log file:', err);
      }
    });
  });
});
