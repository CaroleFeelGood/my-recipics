import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
class U_Form_signup extends Component {
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
  //   document.querySelector('.focusOnLoad').focus();
  // };

  inputChange = e => {
    let stateUpdate = {};
    stateUpdate[e.target.name] = e.target.value;
    this.setState(stateUpdate);
  };

  submit = async e => {
    e.preventDefault();
    if (this.state.email !== '' && this.state.password !== '' && this.state.firstName !== '' && this.state.lastName !== '') {
      let data = new FormData();
      data.append('email', this.state.email);
      data.append('password', this.state.password);
      data.append('firstName', this.state.firstName);
      data.append('lastName', this.state.lastName);

      let response = JSON.parse(await (await fetch('/signup', { method: 'post', body: data })).text());

      if (response.success) {
        console.log('================================================ SIGNUP RESPONSE');
        console.log(JSON.stringify(response));
        this.props.dispatch({
          type: 'user-loggedin',
          content: {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userInitials: response.userInitials
          }
        });
      } else {
        alert('Signup FAILED: ' + response.error);
      }
    }
  };

  loginClick = () => {
    // this.props.dispatch({ type: "modal-open", body: <Form_login /> });
  };

  render = () => {
    if (this.props.logged) return <Redirect to="/" />;
    return (
      <div className="formBox">
        <div className="box registerBox">
          <span className="reg_bg"></span>

          <h2 className="logTitre">REGISTER</h2>
          <form onSubmit={this.submit} className="form">
            <div className="f_row">
              <label>Email</label>
              <input type="text" className="input-field" name="email" required="" value={this.state.email} onChange={this.inputChange} />
              <u></u>
            </div>
            <div className="f_row">
              <label>Password</label>
              <input type="password" className="input-field" name="password" required="" value={this.state.password} onChange={this.inputChange} />
              <u></u>
            </div>
            <div className="f_row">
              <label>First Name</label>
              <input type="text" className="input-field" name="firstName" required="" value={this.state.firstName} onChange={this.inputChange} />
              <u></u>
            </div>
            <div className="f_row last">
              <label>Last Name</label>
              <input type="text" className="input-field" name="lastName" required="" value={this.state.lastName} onChange={this.inputChange} />
              <u></u>
            </div>
            {/* <input type="text" name="email" placeholder="email" className="focusOnLoad" value={this.state.email} onChange={this.inputChange} /> */}
            {/* <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.inputChange} /> */}
            {/* <input type="text" name="firstName" placeholder="First name" value={this.state.firstName} onChange={this.inputChange} /> */}
            {/* <input type="text" name="lastName" placeholder="Last name" value={this.state.lastName} onChange={this.inputChange} /> */}
            <button className="btn-large">
              <span>SIGN UP</span>
              <u></u>
            </button>
            <div className="f_link">
              <Link className="resetTag" to="/login">
                Back to log in
              </Link>
            </div>
            {/* <button className="fct">SIGN UP</button> */}
            {/* <Link className="feakLink" to="/login">
              Back to log in
            </Link> */}
          </form>
        </div>
      </div>
    );
  };
}

let stp = state => {
  return { logged: state.logged };
};
let Form_signup = connect(stp)(U_Form_signup);
export default Form_signup;
