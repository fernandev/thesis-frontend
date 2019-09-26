const express = require('express');

class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() { }

  routes() {
    this.express.use(require('./routes'));
  }
}

module.exports = new App().express;