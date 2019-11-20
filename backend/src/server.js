'use strict';

const app = require('./app.js');

// Constants
const PORT = process.env.PORT || 6200;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
