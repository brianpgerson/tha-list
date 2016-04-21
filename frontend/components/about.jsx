var React = require('react');

var About = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _handleMainClick: function() {
    this.context.router.push("/");
  },

  render: function(){
    return (
      <div id="about">
      <h3>About</h3>
      <p>Tha List is a project by me, <a href="http://www.briangerson.me" target="_blank" className="text-link">Brian Gerson</a>.</p>
      <p>My girlfriend Ryan and I are both explorers by nature. When we were first getting to know each other, we'd constantly find new places to go and things to do. It just seemed to happen naturally, and some of my favorite spots in San Francisco are places we discovered together.</p>
      <p>Whenever we heard about a new spot, the mantra was "Add it to the list!" - but there was no list, and ideas would sometimes fall by the wayside. So for Ryan's birthday, I wanted to build Tha List, and dedicate it to her and all the things I can't wait for us to do together.</p>
      <p>So, happy birthday, Ryan - hope you like your present. Oh, and pick something on the list (I have some guesses for what it'll be) - it's on me.</p>
      <p className="text-link" onClick={this._handleMainClick}>Back to Tha List!</p>
      </div>
    );
  }
});

module.exports = About;
