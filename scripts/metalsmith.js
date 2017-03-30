var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var assets = require('metalsmith-static');
var partials = require('metalsmith-discover-partials');
var collections = require('metalsmith-collections');
var helpers = require('metalsmith-register-helpers');
var paths = require('metalsmith-paths');
var permalinks = require('metalsmith-permalinks');


var ms = Metalsmith(__dirname)
  .source('../src/markdown')
  .destination('../build')
  .use(paths())
  .use(helpers({
    directory: './hbs-helpers'
  }))
  .use(collections({
      home: {
        pattern: 'index.md',
        metadata: {
          name: "Home"
        }
      },
      installation: {
        pattern: 'install/*.md',
        sortBy: 'order',
        metadata: {
          name: "Installation"
        }
      },
      guide: {
        pattern: 'guide/*.md',
        sortBy: 'order',
        metadata: {
          name: "Guide"
        }
      },
	  development: {
        pattern: 'development/*.md',
        sortBy: 'order',
        metadata: {
          name: "Development"
        }
      },
      api: {
        pattern: 'api/*.md',
        sortBy: 'order',
        metadata: {
          name: "API"
        }
      }
    }))
  .use(markdown())
  .use(layouts({
    engine: 'handlebars',
    directory: '../templates',
    default: 'template.hbs'
  }))
  .use(assets({
    src: '../src/assets',
    dest: '../build/assets'
  }))
  .use(assets({
    src: '../src/css',
    dest: '../build/assets/css'
  }))
  .use(assets({
    src: '../public/components/bootstrap/dist',
    dest: '../build/assets/bootstrap'
  }))
  .use(assets({
    src: '../public/components/jquery/dist',
    dest: '../build/assets/jquery'
  }))
  .use(permalinks({
    relative: false
  }))
  
exports.ms = ms;
  
