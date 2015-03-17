
// var videoList = $('#thumbnails');
// var thumbTemplate = $('#thumb')
// var videos = [];
// var subreddit;
// var after;
// var before;

// function init_video() {
// 	console.log('in video.js')

// 	var video = $('<video/>', {
// 					'id': 'videoPlayer',
// 		   	     'class': 'video-js vjs-default-skin',
// 		 	   'preload': 'auto',
// 		 	'data-index': -1,
// 	  		'data-setup': JSON.stringify(
// 	  					{ 'techOrder': ['youtube'],'src': '' })})
// 				// .prop('width', 853)
// 				.prop( 'height', 480)
// 				.prop('controls', '!')
// 			.appendTo($('.video-container')); 
// }
// // var player = videojs('videoPlayer').controls(false).ready(function(){
// // 	this.on("ended", next)});

// function injectVideo(v, i) { 	
// 	player.src(v).play().controls(true);
// 	$('.nowplaying').removeClass('nowplaying');
// 	$('#thumb_'+i+' img').addClass('nowplaying');
// 	}

// function next(){	
// 	if(videos.length > 0 && video.data().index != videos.length-1){ 
// 		injectVideo(videos[++video.data().index].url, video.data().index); }	
// 	else { more(true); } }


// function prev(){
// 	if(videos.length > 0 && video.data().index > 0)
// 		injectVideo(videos[--video.data().index].url, video.data().index); }

// function appendVadideoThumb(v, i) {	
// 	console.log(v.url.split('=')[1]);
// 	var element = thumbTemplate.clone().removeClass('hidden');
// 	element.prop('id','thumb_' + i);
// 	element.prop('data-index', i);
// 	var thumb = element.find('img');
// 	var desc = element.find('.vtitle')
// 	thumb.prop('src', '/api/thumb/' + encodeURIComponent('http://img.youtube.com/vi/' + v.url.substring(v.url.length,v.url.length-11) + '/0.jpg'));
// 	desc.text(v.title);
// 	element.appendTo(videoList);	
// 	element.click(function(){
// 		console.debug($(this));
// 		console.debug(v);
// 		video.data().index = i;
// 		injectVideo(v.url,i);
// 	});
// }

// function more(playnext){
// 	console.log('more');
// 	if(subreddit && videos.length > 0) {
// 		console.log('searching');
// 		$.ajax({
// 			type: 'POST',
// 	        contentType: 'application/json',
// 	        url: '/api/scrapereddit/' + subreddit,						
// 	        data: JSON.stringify({after: after}),
// 	        success: function(data) {
// 	        	 after = data.after; 
// 				before = data.before;
// 	            $.each(data.videos, function(i,v){             	
// 	        		videos.push(v);
// 	        		appendVideoThumb(v, videos.indexOf(v)); 
// 	            });
// 	            if(playnext) next();
// 	        }
// 	    });
// 	}
// }
		
// $('#search').click(function(e){
// 	// e.preventDefault();
// 	$('#thumbnails').children().not($('.hidden')).remove();
// 	subreddit = $('#subreddit').val() !== '' ? $('#subreddit').val() : 'Videos';	
// 	$.ajax({
// 		type: 'POST',
// 		url: '/api/scrapereddit/' + subreddit,
// 		success: function(data) {
// 			 after = data.after;
// 			before = data.before;
//             $.each(data.videos, function(i,v){             	
//         		videos.push(v);
//         		appendVideoThumb(v, videos.indexOf(v)); 
//             });
//             $('#results').removeClass('hidden');
//             $('.subreddit').text('watching /r/' + subreddit);
//             $('.collapsible-body').slideUp({ duration: 350, easing: "easeOutQuart", queue: false});
// 		}
// 	});
// });

// $('.next').click(next);

// $('.previous').click(prev);

// $('#more').click(function(){ more(false); });