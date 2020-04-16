// Implementations of node using expres

var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
app.use(bodyParser.urlencoded({ extended: true })); 
var http = require('http');
var mysql = require('mysql');
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Database connection
var con = mysql.createConnection({
  host: "localhost",
  user: "******",
  password: "*****",
  database: "*******"
});
con.connect(function(err) {
  if (err) throw err;
  });


// Fetching details from database and creating an end point using get method
app.get('/details',function(req,res){
  con.query("select * from details",function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

// use of post method to Insert data in database
app.post('/teacher_details1',function(req,res){
  con.query('INSERT INTO details (tname,tcontact,tproject,availability) VALUES ("ris",9876,"gff","no")',function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

// put method to update data in database
app.put('/teacher_details2',function(req,res){
  con.query('update details set tname=? where tcontact=?' ,["Har","9835"] ,function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});


// Username and password authentication
app.post('/details', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  // login authentication from database
  con.query("SELECT * FROM data where `uname`= '"+username+"' AND pwd = '"+password+"' ", function (err, result, fields) {
    if (err) throw err;
    if(result.length>0){
    	console.log("logged in");
    	
      res.redirect('##');
    }
    else{
    	console.log("incorrect password");
    }
  });
});

// use of ejs to render html page.
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.get('/mentors',function(req,res)
{
   con.query("SELECT * FROM details", function (err, result, fields) {
              var sn = JSON.stringify(result);
              var ab = result[0].tname;
              var s = result[0].tproject;
              var x = result[0].availability;
              console.log(ab);
              console.log(s);
              // index is the ejs file referred over here.
              res.render('index', {obj: ab,obj1:s,obj2:x});
 
});
 });




// Server listening on port 8000
  	app.listen(8000, function() {
  console.log('Server running at http://127.0.0.1:8000/');
});