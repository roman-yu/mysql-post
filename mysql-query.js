var http = require('http');
var url = require('url');
var mysql = require('mysql');

var formidable = require('formidable');

var qs = require('querystring');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Hello world from express\n');
});

app.post('/', function(request, response) {

	var email = request.body.user.email;
	var username = request.body.user.username;
	var firstname = request.body.user.firstname;
	var lastname = request.body.user.lastname;

	// console.log('email: ' + email);
	// console.log('username: ' + username);
 //    console.log('firstname: ' + firstname);
 //    console.log('lastname: ' + lastname);

    var post  = {email: email, username: username, firstname: firstname, lastname: lastname};

	var connection = mysql.createConnection({
        host: 'localhost',
        user: 'tester',
        password: 'tester',
        database: 'test'
    });
    connection.connect();

    var query = connection.query('INSERT INTO Account SET ?', post, function(err, result) {

        if (err != undefined) {

        } else {
            response.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            response.end('Update database successfully!\n');
        }

    });
    connection.end();

});

app.listen(1337);

console.log('Server running at http://127.0.0.1:1337/');



// http.createServer(function(request, response) {

//     if (request.method == 'POST') {

//         var form = new formidable.IncomingForm();

//         form.parse(request, function(err, fields, files) {
//             response.writeHead(200, {
//                 'content-type': 'text/plain'
//             });
//             response.write('received upload:\n\n');
//             response.end(util.inspect({
//                 fields: fields,
//                 files: files
//             }));
//         });

//         var result = "";
//         request.setEncoding("utf8");
//         request.on("data", function(data) {
//             console.log("data: " + data);
//             result += data;

//             // Too much POST data, kill the connection!
//             if (result.length > 1e6)
//                 request.connection.destroy();
//         });
//         request.on("end", function() {
//             var post = qs.parse(result);

//             console.log("body: " + post);

//             response.writeHead(200, {
//                 'Content-Type': 'text/plain'
//             });
//             response.end('Post request succeed!\n');
//         });
//     }

//     if (request.method == 'GET') {
//         response.writeHead(200, {
//             'Content-Type': 'text/plain'
//         });
//         response.end('Hello World\n');
//     }

//     var connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'tester',
//         password: 'tester',
//         database: 'test'
//     });

//     connection.connect();

//     connection.query('SELECT * from Account', function(err, rows, fields) {
//         if (err) throw err;

//         console.log('The first username is: ', rows[0].username);
//     });

//     connection.end();

// }).listen(1337, '127.0.0.1');

// console.log('Server running at http://127.0.0.1:1337/');
