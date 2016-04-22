var React = require('react');

var Footer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _handleAboutClick: function() {
    this.context.router.push("about");
  },

  render: function(){
    return (
      <footer>
        <a className="text-link" onClick={this._handleAboutClick}>About</a>
        <a className="text-link" href="http://www.briangerson.me" target="_blank">Portfolio</a>
        <a className="text-link" href="http://www.github.com/brianpgerson/tha-list" target="_blank">GitHub</a>
      </footer>
    );
  }
});

module.exports = Footer;
