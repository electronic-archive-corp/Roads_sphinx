var connect = require('connect');
var http = require('http');
var path = require('path');
var url = require('url');
var sphinx = require('sphinx');

var ipaddr  = process.env.OPENSHIFT_INTERNAL_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_INTERNAL_PORT || 8080;

var app = connect();

app.use(connect.logger());
connect.logger({ immediate: true, format: 'dev' });
app.use(connect.json());
app.use(connect.urlencoded());
app.use(function(req, res) {
    var u = url.parse(req.url, true);
    if(u && u.query && u.query.collection){
        if(u.pathname == "/get"){
            getItems(u, req, res);
        } else if(u.pathname == "/update"){
            updateItems(u, req, res);
        } else if(u.pathname == "/delete"){
            deleteItems(u, req, res);
        } else if(u.pathname == "/add"){
            addItems(u, req, res);
        }
        return;
    }

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
});

function addItems(u, req, res) {
}

function updateItems(u, req, res) {
}

function getItems(u, req, res){
}

function deleteItems(u, req, res) {
}

http.createServer(app).listen(port, ipaddr);
console.log("Server running at http://" + ipaddr + ":" + port + "/");