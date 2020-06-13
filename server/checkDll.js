const fs = require('fs');

if (!fs.existsSync('./dist/library')) {
  console.error('Webpack DLL directory (./dist/library) missing. Starting DLL build.');
  process.exit(1);
} else {
  console.log('Webpack DLL directory exists, not running DLL build.');
  process.exit(0);
}
