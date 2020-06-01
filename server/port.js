const argv = require('./argv');

module.exports = parseInt(argv.port || process.env.PORT || process.env.APP_PORT || '3000', 10);
