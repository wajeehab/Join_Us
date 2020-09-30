var express = require('express'); 
var app = express();
var mysql = require ('mysql');
var bodyparser = require("body-parser"); 

app.set("view engine", "ejs"); 
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'join_us'
});

var connection1 = mysql.createConnection({multipleStatements: true});

app.get("/", function(req, res){
	var q = 'SELECT COUNT(*) as count FROM users';
	 connection.query(q, function (error, results) {
 	if (error) throw error;
	var count= results[0].count;
	 res.render("home", {count:count});
	});
});
	
app.post('/register', function(req, res){
	var userDetails = req.body
	 var sql = 'INSERT INTO users SET ?';
	connection.query(sql, userDetails, function(error, result){
		 if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"Error"
    })
		 }
		else {
		res.redirect("/");
		}
	}); 
	
});

app.listen(3000, function(){
	console.log("Server running");
}); 

		   