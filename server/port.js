const argv = require('./argv');

module.exports = process.env.NODE_ENV === 'production' ? '' : parseInt(argv.port || process.env.APP_PORT || '3000', 10);
