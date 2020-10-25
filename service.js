const request = require('request');
const fs = require('fs');
const dotenv = require('dotenv');
const { Console } = require('console');
dotenv.config();
const LOCALJSON = process.env.LOCALJSON;
var response=[];

function getPincode(val,callback){
    var URL=val;
    if(LOCALJSON=="true"){
        request(URL, {json:true}, (err, res, body) => {
            if(err){
                console.log(err);
            }
            return callback(body);
        });
    }else{ 
        let rawdata = fs.readFileSync('assets/json/location.json');
        return callback(JSON.parse(rawdata)); 
    }
}
module.exports.getPincode = getPincode;


function getCurrentConditions(val,callback){
    var URL=val;
    if(LOCALJSON=="true"){ 
        request(URL, {json:true}, (err, res, body) => {
            if(err){
                console.log(err);
            }
            return callback(body);
        });
    }else{  
        let rawdata = fs.readFileSync('assets/json/currentconditions.json');
        return callback(JSON.parse(rawdata)); 
    }
}
module.exports.getCurrentConditions = getCurrentConditions;