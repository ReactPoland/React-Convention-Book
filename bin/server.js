require('babel-core/register');

const chalk  = require('chalk');
const server = require('../server/app');
const config = require('../config');

const host = config.get('server_host');
const port = config.get('server_port');

server.listen(port, function () {
  console.log(chalk.green(
    `Server is now running at host:${port}.`
  ));
});
