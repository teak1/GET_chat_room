const http = require("http");
const profanity = require("./profanity.js");
const fs = require("fs");
const lt = require("localtunnel");
const config = JSON.parse(fs.readFileSync("./config.json"));
var url;
var port = config.port;
var safe = ["","/home","/test","/content.js"];
var newc = "";

http.createServer(function (req, res) {
  //res.writeHead(200, {'Content-Type': 'text/html'});
  //res.end(`hi`);
  
  var isSafe = false;
  for(var i = 0;i<safe.length;i++){
    if(safe[i]==req.url)isSafe=true;
  }
  console.log(req.url,isSafe);
  if(isSafe){
    res.writeHead(200,{'Content-Type': '*'});
    var ext = req.url.split(".").length>1?"":".html"
    res.end(fs.readFileSync(__dirname+req.url+ext));
      }else if(req.url==="/req/new"){
          setTimeout(()=>{
            res.writeHead(200,{'Conent-Type': 'text/plain'});
            res.end(JSON.stringify({"a":newc}));
            },config.refresh_rate);
          }else if(req.url.split("/")[1]==="send"){
            newc += profanity(req.url.split("/")[2]+"::"+req.url.split("/")[3]+"\n");
            
            res.writeHead(200,{'Conent-Type': 'text/plain'});
            res.end("");
           }else{
    res.writeHead(200,{'Conent-Type': 'text/html'});
    res.end("<h1>404 page not found</h1>");
    }
}).listen(port);


var tunnel = lt(port, {subdomain:config.targeturl},function(err, tunnel) {
    if (err) console.log(err);
    console.log(tunnel.url);
    url=tunnel.url;
});

tunnel.on('close', function() {
    // tunnels are closed
});
