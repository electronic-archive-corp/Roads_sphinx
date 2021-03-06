// Generated by CoffeeScript 1.6.3
(function() {
  var app, connect, cors, http, makeSql, mysql, queryFind, service, url;

  http = require("http");

  connect = require("connect");

  url = require("url");

  mysql = require("mysql");

  cors = function(req, res, next) {
    res.setHeader("Access-Control-Allow-Credenditals", "true");
    res.setHeader("Access-Control-Allow-Headers", "content-type,x-requested-with");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT");
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.method === "OPTIONS") {
      res.end();
    } else {
      next();
    }
  };

  service = function(req, res) {
    var u;
    res.setHeader("Content-Type", "application/json; charset=UTF-8");
    u = url.parse(req.url);
    switch (u.pathname) {
      case "/find":
        return queryFind(req, res);
      default:
        return res.end("{\"result\":\"Unknown script: " + u.pathname + "\"}");
    }
  };

  queryFind = function(req, res) {
    var connection;
    console.log(req.body.f2);
    connection = mysql.createConnection({
      host: "memorial04.cloudapp.net",
      port: 9306,
      user: "root",
      password: ""
    });
    connection.connect(function(err) {
      connection.query(makeSql(req.body), function(error, rows, b) {
        var k, out;
        if (error) {
          throw error;
        }
        connection.end();
        out = {};
        out.ids = [];
        for (k in rows) {
          out.ids.push(rows[k].id);
        }
        res.end(JSON.stringify(out));
      });
    });
  };

  makeSql = function(json) {
    var fname, fvalue, q;
    q = '';
    for (fname in json) {
      fvalue = json[fname];
      q += "@" + fname + " " + fvalue + " ";
    }
    console.log("SELECT id FROM image2mem WHERE match('" + q + "');");
    return "SELECT id FROM image2mem WHERE match('" + q + "');";
  };

  app = connect().use(connect.query()).use(connect.json()).use(cors).use(service);

  http.createServer(app).listen(81);

}).call(this);
