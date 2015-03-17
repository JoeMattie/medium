var React = require('react'),
      mui = require('material-ui');

var Videos = React.createClass({ 
  getInitialState: function() {
    return {
      data: [],
      subreddit: Videos
    };
  },
  componentDidMount: function() {
    $.ajax({
      url: '/api/scrapereddit/' + this.props.subreddit,
      type: 'POST',
      dataType: 'json',
      success: function(data) {
        this.setState({data: data.videos});
        console.debug(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.subreddit, status, err.toString());
      }.bind(this)
    });
  },
  render: function(){ 
    var vids = this.state.data.map(function (video) {
      return (
        <div title={video.title}>
          {video.title}
        </div>
      );
    });    
    return (
      <div className="videos">
        {vids}
      </div>
    );
  }
});

var menuItems = [
   { payload: '1', text: 'Never' },
   { payload: '2', text: 'Every Night' },
   { payload: '3', text: 'Weeknights' },
   { payload: '4', text: 'Weekends' },
   { payload: '5', text: 'Weekly' },
];

var Main = React.createClass({

  render: function() {

    return (
      <div className="example-page">

        <mui.Toolbar>
          <mui.ToolbarGroup float="left">
            <h1>medium</h1>
            // <mui.FlatButton label="medium" primary={true} />            
          </mui.ToolbarGroup>
        </mui.Toolbar>
        <h1>medium <mui.Icon icon="av-album" /></h1>
        <h4>...channel your videos!</h4>
        <mui.DropDownMenu menuItems={menuItems} />
        <mui.RaisedButton label="Super Secret Password" primary={true} onTouchTap={this._handleTouchTap} />
        <Videos subreddit="Videos" />
      </div>
    );
  },

  _handleTouchTap: function() {
    alert('1-2-3-4-5');
  }
  
});

module.exports = Main;