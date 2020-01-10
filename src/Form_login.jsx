import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

class U_Form_login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    };
  }

  // componentDidMount = () => {
  //   // document.querySelector('.focusOnLoad').focus();
  // };

  submit = async e => {
    e.preventDefault();

    if (this.state.email !== '' && this.state.password !== '') {
      let data = new FormData();
      data.append('email', this.state.email);
      data.append('password', this.state.password);

      let response = JSON.parse(await (await fetch('/login', { method: 'post', body: data })).text());

      if (response.success) {
        console.log('================================================ LOGIN  RESPONSE');
        console.log(JSON.stringify(response));

        // this.props.dispatch({ type: "modal-close" });
        this.props.dispatch({
          type: 'user-loggedin',
          content: {
            firstName: response.firstName,
            lastName: response.lastName,
            userInitials: response.userInitials
          }
        });
      } else {
        alert('Login FAILED: ' + response.error);
      }
    }
  };

  inputChange = e => {
    let stateUpdate = {};
    stateUpdate[e.target.name] = e.target.value;
    this.setState(stateUpdate);
  };

  signupClick = () => {
    // this.props.dispatch({ type: "modal-open", body: <Form_signup /> });
  };

  render = () => {
    if (this.props.logged) return <Redirect to="/" />;
    return (
      <div className="formBox">
        <div className="box loginBox">
          <h2 className="logTitre">LOGIN</h2>
          <form onSubmit={this.submit} className="form">
            <div className="f_row">
              <label>Username</label>
              <input type="text" className="input-field" name="email" required="" value={this.state.email} onChange={this.inputChange} />
              <u></u>
            </div>
            <div className="f_row last">
              <label>Password</label>
              <input type="password" name="password" className="input-field" required="" value={this.state.password} onChange={this.inputChange} />
              <u></u>
            </div>
            {/* <input type="text" name="email" placeholder="email" className="focusOnLoad" value={this.state.email} onChange={this.inputChange} /> */}
            {/* <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.inputChange} /> */}
            <button className="btn">
              <span>GO</span>
              <u></u>
            </button>
            {/* <button className="fct">LOG IN</button> */}
            <div className="f_link">
              <Link className="resetTag" to="/signup">
                Open an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  };
}

let stp = state => {
  return {
    logged: state.logged
  };
};
let Form_login = connect(stp)(U_Form_login);
export default Form_login;
