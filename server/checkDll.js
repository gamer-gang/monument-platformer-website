const fs = require('fs');

if (!fs.existsSync('./dist/library')) {
  console.error('Webpack DLL directory (./dist/library) missing. Starting DLL build.');
  process.exit(1);
} else {
  fs.readdir('./dist/library', (err, files) => {
    if (err) {
      console.error(err);
      process.exit(0);
    } else {
      if (!files.length) {
        console.error('Webpack DLL directory (./dist/library) has no files. Starting DLL build.');
        process.exit(1);
      } else {
        console.log('Webpack DLL directory exists and has files; not running DLL build.');
        process.exit(0);
      }
    }
  });
}
