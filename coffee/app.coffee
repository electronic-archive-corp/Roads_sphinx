http = require("http")
connect = require("connect")
url = require("url")
mysql = require("mysql")

#======================================================

cors = (req, res, next) ->
    res.setHeader "Access-Control-Allow-Credenditals", "true"
    res.setHeader "Access-Control-Allow-Headers", "content-type,x-requested-with"
    res.setHeader "Access-Control-Allow-Methods", "GET, POST, PUT"
    res.setHeader "Access-Control-Allow-Origin", "*"
    if req.method is "OPTIONS"
        res.end()
    else
        next()
    return

#======================================================

service = (req, res) ->
    res.setHeader "Content-Type", "application/json; charset=UTF-8"
    u = url.parse(req.url)
    switch u.pathname
        when "/find"
            queryFind req, res
        else
            res.end "{\"result\":\"Unknown script: " + u.pathname + "\"}"

#======================================================

queryFind = (req, res) ->

    console.log req.body.f2

    connection = mysql.createConnection(
        host: "memorial04.cloudapp.net"
        port: 9306
        user: "root"
        password: ""
    )

    connection.connect (err) ->
        connection.query makeSql(req.body), (error, rows, b) ->
            throw error    if error
            connection.end()
            
            out = {}
            out.ids = []
            for k of rows
                out.ids.push rows[k].id
            res.end JSON.stringify(out)
            return

        return

    return

#======================================================

makeSql = ( json ) ->
    q = ''
    for fname,fvalue of json
        q += "@"+fname+" "+fvalue+" "
    console.log "SELECT id FROM image2mem WHERE match('"+q+"');"
    return "SELECT id FROM image2mem WHERE match('"+q+"');"
    #return "SELECT id FROM image2mem WHERE match('@f2 Тумаркин');"

#======================================================

app = connect().use(connect.query()).use(connect.json()).use(cors).use(service)

http.createServer(app).listen 81

#======================================================
