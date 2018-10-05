import React, { Component } from 'react';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
    }
  }

  doSubmit(e) {
    e.preventDefault();
    const email = this.state.email;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        email: email,
        firstName: firstName,
        lastName: lastName,
      })
    })
    .then(r => r.json())
    .then(resp => {
      if (resp.status == 'OK') {
        // this.props.history.push('/signup/success/');
      } else {
        this.props.error(resp);
        // this.props.history.push('/signup/error')
      }
    })
    .catch(err => {
      console.log(err);
      this.props.error(err.message);
    });
  }

  render() {
    return (
      <form className='tsblue-form'>
        <input type='text' name='firstName' placeholder='First Name' required autoFocus value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value })} />
        <input type='text' name='lastName' placeholder='Last Name' required value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value })} />
        <input type='email' name='email' placeholder='Email' required value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
        <button type='submit' className='btn tsblue' onClick={(e) => this.doSubmit(e)}>Sign Up!</button>
      </form>
    );
  }
}

export default SignupForm;