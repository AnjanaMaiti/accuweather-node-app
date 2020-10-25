const express = require('express');
const app = express();
const url = require('url') ;
const ejs = require('ejs');
app.set("view engine", "ejs");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const fs = require('fs');
var service = require('./service');
const alert = require('alert');
app.use(express.urlencoded({ extended:false }));
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;
const APPKEY = process.env.APPKEY;

var response=[];
var response1=[];



app.listen(PORT);

//defining routes
app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'Anjana', flag: false,locationData: response })
})
app.post('/', async (req, res) => {
    var hostname = req.headers.host; // hostname = 'localhost:8080'
    var pathname = url.parse(req.url).pathname; // pathname = '/MyApp'
    var baseUrl = 'http://' + hostname + pathname;
    try{
        var timestamp = Date.now().toString();
        var pincode = req.body.pincode;
         
        var URL='http://dataservice.accuweather.com/locations/v1/search?apikey='+APPKEY+'&q='+pincode+'&language=en-us';
    
        service.getPincode(URL,function(resp){
            console.log(resp);
            // res.write(resp);
            // res.end();
            if(resp.hasOwnProperty('Code')){
                alert(resp.Message);
                res.redirect('/')
            }else{
                res.render('index.ejs',{
                    name: 'Kumar',
                    flag: true,
                    data: resp
                });
            }
        });
    }catch(e){
        console.log(e);
        console.log('error! plz try again');
        res.redirect('/')
    }
   
})
app.get('/location/:area?:key?', (req, res) => {
    console.dir(req.query.key);
    try{
        var URL="http://dataservice.accuweather.com/currentconditions/v1/"+req.query.key+"?apikey="+APPKEY+"&language=en-us&details=true";

        service.getCurrentConditions(URL,function(resp){
            // res.write(resp);
            // res.end();
            if(resp.hasOwnProperty('Code')){
                alert(resp.Message);
            }else{
                res.render('location.ejs',{
                    key: req.query.key,
                    area: req.query.area,
                    data: resp[0]
                });
            }
        });
    }catch(e){
        console.log(e);
        console.log('error! plz try again');
        res.redirect('/')
    } 
})




