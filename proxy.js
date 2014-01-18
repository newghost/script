var fs    = require('fs')
  , http  = require('http')
  ;

/*
proxy
*/
var proxyMapping  = {
    'ourjs.com'       : '127.0.0.1:8052'
  , 'user.ourjs.com'  : '127.0.0.1:8053'
  , 'api.ourjs.com'   : '127.0.0.1:8054'
}

var proxyHandler = function(proxyReq, proxyRes) {
  var url       = proxyReq.url
    , headers   = proxyReq.headers    
    , hostname  = headers.host
    , port      = 80
    , path      = url.split(hostname)[1]
    , method    = proxyReq.method
    ;

  var mapping = proxyMapping[hostname];

  if (mapping) {
    hostname  = mapping.split(':')[0] || hostname;
    port      = mapping.split(':')[1] || port;
  }

  var reqBuffer = [];
  proxyReq.on('data', function(chunk) {
    console.log('reqBuffer');
    reqBuffer.push(chunk);
  });

  proxyReq.on('end', function() {
    var options = {
        hostname: hostname
      , port: port
      , path: path
      , method: method
    };

    console.log(options);

    var req = http.request(options, function(res) {
      //important: passing the encoding
      proxyRes.setHeader('content-encoding', res.headers['content-encoding']);
      res.on('data', function (chunk) {
        proxyRes.write(chunk);
      });
      res.on('end', function() {
        proxyRes.end();
      });
    });

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });

    // write data to request body
    req.write(Buffer.concat(reqBuffer));
    req.end();
  });

  proxyReq.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
};


var httpSvr = http.createServer(proxyHandler);
httpSvr.listen(8080);