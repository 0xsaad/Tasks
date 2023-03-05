var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Singer = require('./models/index.js')
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/Crud",{ useUnifiedTopology: true, useNewUrlParser: true });
var connection = mongoose.connection;

connection.once('open', function(){
console.log("connection successfully....");
});
app.set('view engine','ejs');

app.get('/', function(req,res){
res.render('insert');
});

app.post('/insert', function(req,res){
     var singer = new Singer({
        name:req.body.name
     })
     singer.save(()=>{
        res.send("<h1>Data Send</h1>")
     })
});

app.get('/show',function(req, res){
    Singer.find({},function(err,result){
        res.render('show',{singers:result});
    })
});

app.get('/delete/:id', async function(req, res){
await Singer.findByIdAndDelete(req.params.id);
res.redirect('/show');
});

app.get('/edit/:id', function(req,res){
    Singer.findById(req.params.id,function(err,result){
        res.render('edit',{singers:result});
    })
});

app.post('/update/:id', async function(req, res){
    await Singer.findByIdAndDelete(req.params.id,req.body);
    res.redirect('/show');
    });

var server = app.listen(3000,function(){
console.log("Port 3000")
}); 