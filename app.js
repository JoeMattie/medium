var bodyParser    = require('body-parser'),
    rereddit      = require('rereddit'),
    express       = require('express'),
    db            = require('riak-js')({api:'http'}),
    _             = require('lodash'),
    util          = require('util'),
    gm            = require('gm'),
    im            = gm.subClass({ imageMagick: true });

var resizeX = 320, 
    resizeY = 180;

var app           = express(),
    router        = express.Router();

function parseVideos(vidlist, subreddit) { 
    videos = [];
    vidlist.children.forEach(function(video, i) {
        switch(video.data.domain){
            case    'youtu.be':
            case 'youtube.com':
                console.log(video.data);
                videos.push({   url: video.data.url,
                              title: video.data.title,
                               name: video.data.name,
                            created: video.data.created_utc });
                break;
            default:
                console.log('domain ' + video.data.domain + ' not supported');
        }           
    });
    console.log(videos);
    return({       sub: subreddit,
                videos: videos, 
                before: vidlist.before, 
                 after: vidlist.after   }); }


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'jade');

router.get('/', function(req, res) { res.json({ message: 'The API Works!' }); });

router.route('/scrapereddit/:sub')
        .post(function(req,res,next)
        {            
            console.log('scraping: ' + req.params.sub);
            console.log(req.body);
            if(req.body.after){
                rereddit.read(req.params.sub).limit(5).after(req.body.after)
                    .end(function(err, posts) {
                        console.log('b: ' + posts.data.before);
                        console.log('a: ' + posts.data.after);
                        res.json(parseVideos(posts.data)); }); }
            else{
                rereddit.read(req.params.sub).limit(5)
                    .end(function(err, posts) {
                        console.log('b: ' + posts.data.before);
                        console.log('a: ' + posts.data.after);
                        res.json(parseVideos(posts.data, req.params.sub)); }); } });

router.route('/thumb')
        .get(function(req, res, next) {
            im(req.query.url)
                .resize(resizeX,resizeY, '^')
                .gravity('Center')
                .crop(resizeX,resizeY)
                .stream('png', function (err, stdout) {
                    if (err) return next(err);
                    res.setHeader('Expires', new Date(Date.now() + 250));
                    res.setHeader('Content-Type', 'image/png');
                    stdout.pipe(res); } ); } );        

app.use('/api',    router);
app.use('/stat', express.static(__dirname + '/stat'));
app.get('/', function(req,res){ res.render('index')});
app.listen(3000);