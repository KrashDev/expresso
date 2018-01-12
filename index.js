//imports express module
var express = require('express');

var app = express();

// this disables information about our server for security reasons
app.disable('x-powered-by');

// define HTML MainElement.layout as our default layout
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);

// makes sure that the html we defined in our views dir is oging to be transported into the main handlebars layout
app.set('view engine', 'handlebars');


// MORE IMPORTS HERE


// defines port is runnig on port 3000
app.set('port', process.env.PORT || 3000);

// this is going to allow us to access that public directory and reference the images folder to import logo
app.use(express.static(__dirname + '/public'));


// MIDDLEWARE
// its going to recieve a req and response object and a next function
// it sits in the middle and performs a function

app.use(function(req, res, next){
    console.log('looking for URL : ' +req.url);
    next();
});

app.use(function(req, res){
    res.type('text/html');
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});


// this is our first ROUTE, saying that our main or home page is at /, like localhost:3000/
app.get('/', function(req, res) {
        res.render('home');
});

app.get('/about', function(req, res) {
    res.render('about');
});

app.get('/contact', function(req, res) {
    res.render('contact');
});

// request objects passed inside to represent an http request
// response object that represents what express sends back whenever it gets a response
// paths match up certain actions with certain urls


// tell our web application to listen on port3000 for any instructions in regardds to what information to push out
app.listen(app.get('port'), function(){
    console.log('Express started press Ctrl-C to terminate');
});

