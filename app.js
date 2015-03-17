var express        = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler   = require('errorhandler'),
    morgan         = require('morgan'),
    // _              = require('lodash'),
    routes         = require('./routes'),
    api            = require('./routes/api'),
    http           = require('http'),
    path           = require('path');

var app = module.exports = express();
    // router = express.Router();

// app.set( 'port', process.env.PORT || 8000);
app.set( 'views', __dirname + '/views');
app.set( 'view engine', 'jade');

app.use( morgan('dev') );
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );
app.use( methodOverride()  );
app.use( express.static(path.join(__dirname, 'public')) );

var env = process.env.NODE_ENV || 'development';

if (env === 'development') { app.use(errorHandler()); }
if (env === 'production')  { /* TODO */ }

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

app.get('/api/thumb/:url', api.thumb);
app.post('/api/scrapereddit/:sub', api.scrapereddit);

app.listen(8000);
// http.createServer(app).listen(app.get('port'), function () { console.log('Express server listening on port ' + app.get('port')); });
