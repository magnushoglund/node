var fs   = require('fs');
var http = require('http');
var url  = require('url');

var peopleDictionary = {}; 																		//defines and empty object

fs.readdir('e:/magnus/node/csv_data', function(err, files) { 	//read the directory

	files.forEach( function (fileName) {        								//go through all files in directory
		fs.readFile('e:/magnus/node/csv_data/' + 
		fileName, 'utf-8', function( err, data){ 									//read

			var names = data.split(',');     	//separating string in the file based on comas
			names.forEach( function (name) { 	//execute code for each name
				name = name.trim();            	//remove spaces and line breaks
				if (peopleDictionary[name]){   	//check if name is already in the dictionary
					peopleDictionary[name]++;    	//increment if name is already present
				}else{
					peopleDictionary[name] = 1;  	//new name found set counter to 1
				}
			});

		});
	});
});

http.createServer(function (req, res) {

	var parsedUrl = url.parse(req.url, parseQueryString=true);
	
	if (parsedUrl.query.userName) {

		//let us trim to remove spaces just in case
		//also put everything lower case just like when we handled our csv file
		var name = parsedUrl.query.userName.trim().toLowerCase(); 

		if (peopleDictionary[name]) {  				//check if name is in the dictionary
			res.end(name + ' has attended ' + 
			peopleDictionary[name] + ' times');
		}else{
			res.end(name + ' never attended :(');
		}

	}else{
		var page =
		'<!DOCTYPE html>'+
		'<form>' +
		'<input id=userName name=userName placeholder="enter name" required>'+
		'<button type=submit>Do it!</button>'+
		'</form>';  
    
		res.end(page);
	}

}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');
