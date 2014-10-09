/**
 * New node file
 */
var http = require('http');
var request = require("request");
var timerjob = require("timer-jobs");


var oldversion = "3.7.1";
var producturl = "";


var jquery = require('../public/js/jquery-1.11.1.min');
var getform = function(req , res){
	res.render("base.ejs",{},function(err,result){
		if(!err){
			res.end(result);
		}else{
			res.end("an error has occured");
		}
	})
};

var timer = new timerjob({interval:3000},function(done){
	
	request(producturl, function(error, response, body) {
		processBody(body);
		
	});
	done();
})

var submiturl = function(req , res){
	var url = req.param('url');
	producturl = url;
	timer.start();
		
}

function processBody(body){
	
	if(body.indexOf("version") > -1){
		var index = body.indexOf("version");
		var versionline = body.substring(index , index+25);
		var numbers = versionline.match(/\d+/g).map(Number);
		var Nversion = "";
		
		for(var i=0; i< numbers.length ; i++){
			Nversion += numbers[i]+".";
		}
		
		if(oldversion != Nversion){
			console.log("version changed"+"\n new version is " + Nversion+ " while old was "+ oldversion);
		
			oldversion = Nversion;
		}else{
			console.log("version is same");
		}
		
	}
}


exports.getform= getform ; 
exports.submiturl = submiturl;