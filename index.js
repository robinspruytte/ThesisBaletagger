var express = require('express');

var bodyParser = require("body-parser");

var app = express();

var mysql = require('mysql');

var portnumber = 1337

var port = process.env.PORT || portnumber;

var con = mysql.createConnection({
  host: "cnhbaletaggerserver.mysql.database.azure.com",
  user: "CNHIndustrial@cnhbaletaggerserver",
  password: "CNH1industrial",
  database: "baletagger",
  ssl: true
});

app.use(bodyParser.json({
    extended: false
}));

app.post('*', function (request, response) {
    var jsonString = request.body;
	console.log(jsonString.Bale_ID);
		
	var sql = "INSERT INTO baletagger_table (Bale_ID, Machine_ID, GPS_longitude, GPS_lattitude, Bale_length) " +
		"VALUES ('" + jsonString.Bale_ID + "', '" + jsonString.Machine_ID + "', " + jsonString.GPS_longitude + 
		", " + jsonString.GPS_lattitude + ", " +  jsonString.Bale_length + ")";
	/*var sql = "TRUNCATE TABLE baletagger_table";*/
	console.log(sql)
		
	con.query(sql, function (err, result) {
		
	if (err) {
		response.status(500).send("Unable to write data to database\n" + err);
	}
	else {
	console.log("1 record inserted");
	response.send("Entry inserted");
	}
	
	});
});

app.listen(port, function () {
    console.log("Started on PORT" + portnumber);
})









