var React = require('react');
var SessionStore = require('../stores/sessionStore');
var AuthActions = require('../actions/authActions');

var Login = React.createClass({
  getInitialState: function() {
    return {
      isLoggedIn: this.props.isLoggedIn,
      username: "",
      password: ""
    };
  },
  handleInputChanges: function(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  },
  handleSubmits: function(e){
  e.preventDefault();
  var type = e.target.name;
  var request;
  switch(type) {
    case "signup":
      request = "signup";
      break;
    case "login":
      request = "login";
      break;
  }


  var sessionParams =
    {user: {
            username: this.state.username,
            password: this.state.password
          }
    };

    AuthActions[request](sessionParams);
},
  render: function(){
    return (
      <div className="login-form">
        <form>
          <h1>sign up or log in</h1>
          <div>
            <label>Username</label><br />
            <input type="text"
                    className="login-text-input"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInputChanges}/>
          </div>
          <div>
            <label>Password</label><br />
            <input type="password"
                    className="login-text-input"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChanges}/>
          </div>
            <input type="submit"
                    value="Sign Up"
                    name="signup"
                    onClick={this.handleSubmits} />
            <input type="submit"
                    value="Log In"
                    name="login"
                    onClick={this.handleSubmits} />

        </form>
        <div className="errorHandler">
        </div>
      </div>
    );
  }
});

module.exports = Login;
