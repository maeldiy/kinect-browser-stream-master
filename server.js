var app = require('http').createServer(handler).listen(3000)
, fs = require('fs')
//, kinect = require('kinect')
, BufferStream = require('bufferstream')
, $ = require('jquery')
, WebSocketServer = require('ws').Server
, websocket = require('websocket-stream')
, spawn = require('child_process').spawn
, prc = spawn('java',  ['-jar', 'VC0706.jar'])
, wss = new WebSocketServer({server: app});

prc.on('close', function (code) {
    console.log('process exit code ' + code);
});


function handler (req, res) {
  if(req.url === "/"){
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
          if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
          }
          res.writeHead(200);
          res.end(data);
        });
  }
  else{
    fs.readFile(__dirname + req.url, function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' +req.url);
      }
      res.writeHead(200);
      res.end(data);
    });
  }
}

/*var kcontext = kinect();

kcontext.resume();

kcontext.start('depth');
*/
var kstream = new BufferStream();
/*
kcontext.on('depth', function (buf) {
  kstream.write(buf);
});
*/

wss.on('connection', function(ws) {
  var stream = websocket(ws);
  kstream.pipe(stream);
  console.log("connection made");
  ws.on('close', function() {
    stream.writable=false;
    console.log('closed socket');
  });

});

//vkpzjgpozjrp
prc.stdout.on('data', function (data) {
//	kstream.write(new Buffer(data).toString('base64'));

	console.log('stdout data');
	console.log(data);
	var buffer = new Buffer(data,"binary");
	console.log("buffer");
	console.log(buffer);
	fs.writeFile("./tmp/arghhhh.jpg", new Buffer(data, "binary"), function(err) {});
	fs.writeFile("./tmp/test.jpg", data, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
	});
	fs.writeFile("./tmp/test_buffer.jpg", buffer, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("file saved!");
    }
	});
	});
	
	//console.log(new Buffer(data).toString('base64'));





