var http = require('http');
var connect = require('connect');
var mysql = require('mysql');

//======================================================

function cors( req, res, next ) {
    res.setHeader( 'Access-Control-Allow-Credenditals', 'true' );
    res.setHeader( 'Access-Control-Allow-Headers', 'content-type,x-requested-with' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT' );
    res.setHeader( 'Access-Control-Allow-Origin', '*' );

    if( req.method == 'OPTIONS' ) {
        res.end();
    }
    else {
        next();
    }
}

//======================================================

var app = connect()
  .use(connect.query())
  .use(connect.json())
  .use( cors )
  .use( service )

//======================================================

http.createServer(app).listen(80);

//======================================================

function service( req, res ) {
//    console.log(req._parsedUrl.pathname)
    res.setHeader( 'Content-Type', 'application/json; charset=UTF-8' );
    
    switch( req._parsedUrl.pathname ) {
        case '/find': 
            queryFind( req, res ); 
            break;
            
        default: 
            res.end('{"result":"Unknown script: '+req._parsedUrl.pathname+'"}');
            break;
    }
    
//    res.end('{"result":"OK","entity1":"'+req.body.entity+'"}');
    //res.end('{"result":"OK","entity1":"'+req.body.entity+'"}');
}

//======================================================

function queryFind( req, res ) {

    var connection = mysql.createConnection({ host: '127.0.0.1', port:9306, user: 'root', password:''});

    connection.connect( function(err){
        connection.query( "SELECT id FROM image2mem WHERE match('@f2 Тумаркин');", function(error, rows, b) {
            if (error) { throw error; }
            connection.end();
            var out = {}
            out.ids = []
            for( k in rows ) {
                //console.log(rows[k].id);
                out.ids.push( rows[k].id );
            }
            res.end( JSON.stringify( out ) );
            //res.end();
        })
    });
    //res.end();
}

//======================================================
/*
  _parsedUrl.pathname
  query{}
*/
