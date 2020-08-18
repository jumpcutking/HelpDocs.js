// staging.js
var deployd = require('deployd');

var server = deployd({
  port: 8083,
  env: 'staging',
  db: {
    connectionString: "mongodb://usr:pass@127.0.0.1:27017/udocs?authSource=admin"
  }
});


server.listen();

server.on('error', function(err) {
  console.error(err);
  process.nextTick(function() { // Give the server a chance to return an error
    process.exit();
  });
});

//
//
