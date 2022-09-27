/*********************************************************************************
 *  WEB322 – Assignment 02
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
 *  No part *  of this assignment has been copied manually or electronically from any other source
 *  (including 3rd party web sites) or distributed to other students.
 *
 *  Name: NONTHACHAI PLODTHONG Student ID: 152487211 Date: 27/09/2022
 *
 *  Online (Heroku) Link: https://gentle-waters-38058.herokuapp.com/
 *
 ********************************************************************************/


const express = require("express");
const dataService = require("./data-service");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public/css'));

// call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.get("/", function (req, res) {
    res.sendFile("/views/home.html", {root: __dirname});
});

app.get("/about", function (req, res) {
    res.sendFile("/views/about.html", {root: __dirname});
});
app.get("/employees", employeeHandler);
app.get("/managers", managersHandler) ;
app.get("/departments", departmentHandler);

// setup http server to listen on HTTP_PORT
//var errorCode = "error cannot listen";
function employeeHandler (req,res){
    dataService.getAllEmployees().then(function (dataFile){
        res.jsonp(dataFile);
    }).catch(() =>{
        res.status(404).jsonp({error: 'ERROR DUDE!'})
    })
}
function managersHandler (req,res){
    dataService.getManagers().then(function (dataFile){
        res.jsonp(dataFile);
    }).catch(() =>{
        res.status(404).jsonp({error: 'Error'})
    })
}
function departmentHandler(req,res){
    dataService.getDepartments().then(function (dataFile){
        res.jsonp(dataFile);
    }).catch(()=>{
        res.status(404).jsonp({error: 'Error get department'});
    })
}
dataService.initialize().then(() => {
    //start the server
    app.listen(HTTP_PORT, onHttpStart);
}).catch(errorCode => {
    /*output the error to the console */
    console.log(errorCode);
})
