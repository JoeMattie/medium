(function () {

	var React          = require('react'),
	    injectTEP      = require("react-tap-event-plugin");

	var Main = require('./components/main.jsx');

	window.React = React;
	injectTEP();

	React.render(<Main />, document.getElementById('reactBody'));
})();
