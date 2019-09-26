const express = require('express');
const handlebars = require('express-handlebars');
const handlebarsHelpers = require('handlebars-helpers')(['comparison', 'collection', 'array']);
const bodyParser = require('body-parser');
const path = require('path');

class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.set('views', path.join(__dirname, 'views'));
    this.express.use(express.static(path.join(__dirname, 'public')));
    this.express.engine('handlebars', handlebars({
        defaultLayout: "",
        layoutsDir: "",
        helpers: handlebarsHelpers
    }));
    this.express.set('view engine', 'handlebars');
    this.express.use(bodyParser.json());
  }

  routes() {
    this.express.use(require('./routes'));
  }
}

module.exports = new App().express;