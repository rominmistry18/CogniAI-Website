/**
 * Development script for admin panel
 * Reads port from .env file
 */
require('dotenv').config();
const { spawn } = require('child_process');

const adminUrl = process.env.ADMIN_URL || process.env.ADMIN_PORT || 'http://localhost:3001';
const url = new URL(adminUrl);
const port = url.port || (url.protocol === 'https:' ? '443' : '80');

console.log(`Starting admin panel on port ${port}...`);

const child = spawn('npx', ['next', 'dev', '--turbopack', '-p', port], {
  stdio: 'inherit',
  shell: true
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
