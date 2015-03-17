<mediummain>
    <mediumsidebar videos={ opts.videos } />
    <main>
        <div class='row'>
            <div class="col s12">
                <mediumbanner />
                <channelselector />
                <channelcards items={ opts.items } />
            </div>
        </div>
    </main>
    
    selectsub(e) {
        console.log('selectsub called from mediummain');
        opts.videomode = true;
        opts.videodata = e;
        riot.update();
    }
    
    opts.videos = [];

</mediummain>

<mediumsidebar>
    <ul class='side-nav fixed'>
        <li class='logo'>
            <h4 class='center indigo-text accent-2'>medium <i class='mdi-av-video-collection'></i></h4>
        </li>
        <li each={ opts.videos }>
            <sidebarcard data={ this } />
        </li>
    </div>

    </ul>

    this.on('update', function(){
        console.log('sidebar updated');
        // console.debug(opts.videos)
    });

</mediumsidebar>

<sidebarcard>
    <img class='responsive-img z-depth-3' src={ opts.data.oembedthumb }>

    this.on('update', function(){
        console.log('sidebarcard updated');
        // console.debug(opts);
    });
</sidebarcard>

<mediumbanner>
    <div hide={ parent.opts.videomode } class='section no-pad-bot' id='index-banner'>
        <div class='container'>
            <h1 class='header center orange-text'> medium <i class='mdi-av-video-collection'></i></h1>
            <div class='row center'>      
                <h5 class='header col s12 light'> ...channel your videos! </h5>
            </div>
            <div class='row center'>      
                <a id='start-button' class='btn-large waves-effect waves-light orange'> create a channel </a>
            </div>
        </div>
    </div>

    var parent = this.parent;


</mediumbanner>

<videocard>    
    <div class='videocard col s12 m4 l2'>
            // <a class='dropdown-button' data-activates='dropdown{ opts.data.uuid }'>
                
                <img class='videoimg responsive-img' src={ opts.data.oembedthumb }>
                

                <div class='video-controls'>
                    <a href='#' class="btn-floating btn-small waves-effect waves-black orange grey-text text-darken-4 accent-3" onclick={ playvideo }>
                        <i class="mdi-av-play-arrow"></i>
                    </a>
                    <a href='#' class="btn-floating btn-small waves-effect waves-orange blue grey-text text-darken-4 darken-2">
                        <i class="mdi-content-add"></i>
                    </a>
                    <a href='#modal{ opts.data.uuid }' class="modal-trigger btn-floating btn-small waves-effect waves-orange green grey-text text-darken-4 accent-2">
                        <i class="mdi-action-info"></i>
                    </a>
                </div>

                <div id='modal{ opts.data.uuid }' class='modal center'>
                    <h5>{ opts.data.title }</h5>
                    <img class='responsive-img' src={opts.data.oembedthumb}>
                    <p>{ opts.data.description }</p>
                    <div class="action-bar">
                        <a href="#" class="waves-effect waves-green btn-flat modal-action modal-close">Close</a>
                    </div>
                </div>

            // </a>
        
    </div>

    // <div id='dropdown{ opts.data.uuid }' class='dropdown-content'>
    //     { opts.data.title }

    //     <a class="btn-floating waves-effect waves-light orange accent-3" onclick={ playvideo }>
    //         <i class="mdi-av-play-arrow"></i>
    //     </a>
    // </div>
        // <div class='card-content'>
        // { title.length > 40 ? title.substring(0,40) + '...' : title }
        // <p class="flow-text"> { title } </p>
        // </div>              
    // </div>

    var parent = this.parent;

    this.on('update', function(){
        console.log('video:');
        console.debug(this);
    })

    playvideo(e) {
        console.log('playvideo called from videocard')
        // console.debug(e.item.opts.data);
        parent.parent.playvideo(e.item.opts.data);
        // console.debug(parent.parent.parent);
        parent.parent.parent.opts.videos.push(e.item.opts.data);
        riot.update();
    }
    
</videocard>

<channelselector>
    <div show={ parent.opts.videomode } class='section'>
        <div class='container'>      
            // <div class='row center'>
            //     <h2 class='header col s12 light'> { videodata.title } </h2>
            // </div>
            <div class='row center'>
                <div show={ showplayer } class='video-container' id='video-container'>
                    <video id="videoPlayer" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" style='position: initial;'></video>
                </div>
            </div>      
            <div class='row'>
                <div hide={ channelselected } class='col s12 m10 offset-m1'>
                    <div class='col s12 l6' each={ channels }>
                        <div class='card-panel grey lighten-5 z-depth-1 channelcard valign-wrapper' onclick={ parent.selectchannel }>
                            <div class='icon-block valign'>
                                <h4 class='center light-blue-text'> { name } </h4> 
                                <h6 class='center'>{ path }</h6>
                                <p class='light'>{ desc }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class='row'>
            <div show={ channelselected } class='col s12 m10 offset-m1'>
                <videocard each={ videos } data={ this } />
            </div>
        </div>
    </div>
    var parent = this.parent;
    var videodata = parent.opts.videodata;
    var me = this;

    this.videos = [];
    this.initialized = false;

    this.videoparams = JSON.stringify();

    this.on('update', function(){
        // console.log('channelselector updated');
        this.videodata = parent.opts.videodata;
        this.channels = this.videodata.channels;
    });

    selectchannel(e) {
        console.log('selectchannel called');
        this.videodata.title = e.item.name;
    
        $.ajax({
               type: 'POST',
                url: '/api/scrapereddit/' + e.item.name,
            success: function(data) { 
                $.each(data.videos, function(i,v){ videoObserver.trigger('add', v); });

               //  $('.dropdown-button').dropdown({
               //      inDuration: 300,
               //     outDuration: 225,
               // constrain_width: true,
               //           hover: false,
               //       alignment: 'left',
               //          gutter: 0,
               //  });

                // $('.materialboxed').materialbox();
                $('.modal-trigger').leanModal();
            } 
        });
    
        this.channelselected = true;
    
        this.update();
    }

    this.on('initplayer', function(e){
        console.log('initplayer called');
        // console.debug(e);
        if (this.player) { this.player.src(e.url).ready(function(){ this.play(); }); }
        else { this.player = videojs('videoPlayer',{ techOrder: ['youtube'], src: e.url }, function(){ this.play(); }).ready(function(){ this.play(); }); } });


    playvideo(e) {
        console.log('playvideo called');
        this.showplayer = true;    
        this.update();
        this.trigger('initplayer', e); 
    }

    function VideoObserver() {
        console.log('VideoObserver initialized');
        riot.observable(this)
        this.on('add', function(v) {
            console.log('video added');
            me.videos.push(v);
            me.update();
        });
    }

    var videoObserver = new VideoObserver();

</channelselector>


<channelcards>
    <div hide={ parent.opts.videomode } class='container'>
        <div class='section'>
            <div class='row'>
                <div class='col s12 m4' each={ items }>
                    <div class='card-panel grey lighten-5 z-depth-1' onclick={ parent.selectsub }>
                        <div class='icon-block'>
                            <h2 class='center light-blue-text'> <i class={ icon }></i></h2>
                            <h5 class='center'>{ title }</h5>
                            <p class='light'>{ content }</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    </div>

  
    var parent = this.parent;
    this.items = opts.items;

    selectsub(e) { 
        console.log('selectsub called from channelcards');
        parent.selectsub(e.item); 
    }
</channelcards>