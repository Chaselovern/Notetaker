var express = require('express');
const { fstat } = require('fs');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path');
var db = require('./db/db.json');



app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))
  });

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
  });

app.get('/api/notes', function(req, res){
    console.log('server pulled from db');
    res.json(db);

});

app.post('/api/notes', function(res, req){
    db.push(req.body);
    pullDB();
});

function pullDB(){
    fs.writeFile('/db/db.json', JSON.stringify(db, '\t'), err =>{
        if (err) throw err;
        return true;
    });
}
  


  
app.listen(port);
console.log('Server started at http://localhost:' + port);