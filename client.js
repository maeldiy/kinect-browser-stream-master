var websocket = require('websocket-stream');

var socket = websocket('ws://localhost:3000');

console.log("connected");

var width = 320;
var height = 240;
var bytearray;

var ctx = document.getElementById('canvas').getContext('2d');

//video vis

socket.on('data', function (data) {
      console.log(data);
      var ctx = document.getElementById('canvas').getContext('2d');
    var img = new Image();
    img.src = data;
    img.onload = function(){
      ctx.drawImage(img, 0, 0);

    }

});

socket.on('end', function(){
  console.log("stream ended");
  socket.close();
});
