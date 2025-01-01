//create webserver
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var qs = require('querystring');

//create server
http.createServer(function(req, res) {
    var uri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(), uri);
    var method = req.method;

    //if method is POST
    if (method === 'POST') {
        var body = '';
        req.on('data', function(data) {
            body += data;
        });

        req.on('end', function() {
            var POST = qs.parse(body);
            var comment = POST['comment'];
            console.log(comment);
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end('You sent the comment: ' + comment);
        });
    }

    //if method is GET
    if (method === 'GET') {
        fs.readFile(filename, 'binary', function(err, file) {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/html'
                });
                res.end('File not found\n');
                return;
            }

            res.writeHead(200);
            res.write(file, 'binary');
            res.end();
        });
    }
}).listen(8080);

console.log('Server running at http://')

