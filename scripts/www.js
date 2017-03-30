var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var ms = require('./metalsmith.js').ms;

ms
  .use(watch({
        paths: {
          "${source}/**/*": true,
          "../templates/**/*": true,
        },
        livereload: true,
      })
    )
  .use(serve({
    port:3000
  }))
  .build(function(){});
