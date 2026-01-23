/**
 * Development script for website
 * Reads port from .env file
 */
require('dotenv').config();
const { spawn } = require('child_process');

const websiteUrl = process.env.WEBSITE_URL || process.env.WEBSITE || 'http://localhost:3000';
const url = new URL(websiteUrl);
const port = url.port || (url.protocol === 'https:' ? '443' : '80');

console.log(`Starting website on port ${port}...`);

const child = spawn('npx', ['next', 'dev', '--turbopack', '-p', port], {
  stdio: 'inherit',
  shell: true
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
