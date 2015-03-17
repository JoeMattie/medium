var gm             = require('gm'),
    rereddit       = require('rereddit'),
    // db             = require('riak-js')({api:'http'}),
    im             = gm.subClass({ imageMagick: true });

var fs = require('fs');
var util = require('util');

var resizeX = 320, 
    resizeY = 240;

function parseVideos(vidlist, subreddit) { 
    videos = [];
    vidlist.children.forEach(function(video, i) {
        switch(video.data.domain){
            case    'youtu.be':
            case 'youtube.com':
                if (video.data.media) {
                    thumb = video.data.media.oembed.thumbnail_url;
                    description = video.data.media.oembed.description;
                }
                else {
                    thumb = 'http://img.youtube.com/vi/' + video.data.url.substring(video.data.url.length,video.data.url.length-11) + '/0.jpg';
                    description = '';
                }
                var thisv = {   url: video.data.url,
                               uuid: video.data.name,
                         redditlink: video.data.permalink,
                        redditscore: video.data.score,
                        redditthumb: video.data.thumbnail,
                        oembedthumb: thumb,
                               date: video.data.created_utc,
                               nsfw: video.data.over_18,
                           thumbsrc: 'http://img.youtube.com/vi/' + video.data.url.substring(video.data.url.length,video.data.url.length-11) + '/0.jpg',                           
                              title: video.data.title,
                        description: description,
                            created: video.data.created_utc };
                videos.push(thisv);
                console.log(util.inspect(thisv));
                break;
            default:
                console.log('domain ' + video.data.domain + ' not supported');
        }           
    });
    return({       sub: subreddit,
                videos: videos, 
                before: vidlist.before, 
                 after: vidlist.after   }); }

exports.thumb = function(req, res) {        
            im(req.params.url)
                .trim()
                .resize(resizeX, resizeY + ">")
                .gravity('Center')
                .extent(resizeX, resizeY)
                .stream('png', function (err, stdout) {
                    if (err) return next(err);
                    res.setHeader('Expires', new Date(Date.now() + 250));
                    res.setHeader('Content-Type', 'image/png');
                    stdout.pipe(res); } ); };

exports.scrapereddit = function(req, res) {            
            console.log('scraping: ' + req.params.sub);
            // console.log(req.body);
            if(req.body.after){
                rereddit.read(req.params.sub).limit(25).after(req.body.after)
                    .end(function(err, posts) {
                        // console.log('b: ' + posts.data.before);
                        // console.log('a: ' + posts.data.after);
                        res.json(parseVideos(posts.data)); }); }
            else{
                rereddit.read(req.params.sub).limit(25)
                    .end(function(err, posts) {
                        // console.log('b: ' + posts.data.before);
                        // console.log('a: ' + posts.data.after);
                        res.json(parseVideos(posts.data, req.params.sub)); }); } };
