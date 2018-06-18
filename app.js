const express = require('express');
const jwt = require('jsonwebtoken');
var path = require("path");
const app = express();
var fs = require('fs');
const bodyParser = require("body-parser");
// app.use(express.bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'html');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res)
{

    res.sendFile(path.resolve('./index.html'));
});

	app.post('/api/posts', verifyToken, (req, res) => {  
		console.log(("token"));
	  jwt.verify(req.token, 'secretkey', (err, authData) => {
	    if(err) {
	      res.sendStatus(403);
	    } else {
        //res.writeHead(200, {'Content-Type': 'text/html'});

      
          if(err){
            res.send("fail in server side"+err);
          }else{
            // fs.readFile('post.html', function(err, data) {
          // res.writeHead(200, {'Content-Type': 'text/html'});
          // res.write(data);
          // res.end();
          res.sendFile( __dirname+'/post.html');
          // }
        // });
      // return;
      }
    }
	  });
	});

app.post('/login', (req, res) => {
  // Mock user
  // console.log(req);
var username = req.body.username;
var password = req.body.password;
console.log(username);

console.log(password)
  const user = {
   
    username: username,
    email: password
  }

  jwt.sign({user}, 'secretkey', { expiresIn: '70000s' }, (err, token) => {
    console.log(token)
    
    // res.redirect('http://localhost:5000/api/posts');
    
    res.json(token);
  });

});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    // console.log(req.token);
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

app.listen(5000, () => console.log('Server started on port 5000'));