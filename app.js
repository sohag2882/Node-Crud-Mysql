//Basic Module that we need
var http=require('http');
var path=require('path');
var express=require('express');
var bodyParser=require('body-parser');
var app=express();

var morgan=require('morgan');

var person=require('./routes/person');

//For database connection
var connection=require('express-myconnection');
var mysql=require('mysql');

//All environment
app.set('port', process.env.PORT||3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');


//All middleware
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//Mysql Database Connection
app.use(
    connection(mysql,{
            host:'localhost',
            user:'root',
            password:'',
            port:3306,
            database:'customer'
        },'pool')
);

//All Route
app.get('/', person.list);
app.post('/', person.save);
app.get('/edit/:id',person.edit);
app.post('/edit/:id',person.update);
app.get('/delete/:id',person.delete);







http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});