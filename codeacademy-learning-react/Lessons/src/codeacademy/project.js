import React from 'react';
import ReactDOM from 'react-dom';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: 'swordfish',
      authorized: false,
    };
    this.authorize = this.authorize.bind(this);
  }

  authorize(e) {
    const password = e.target.querySelector('input[type="password"]')
      .value;
    const auth = password == this.state.password;
    this.setState({
      authorized: auth,
    });
  }

  render() {
    const login = (
      <form action="#" onSubmit={this.authorize}>
        <input type="password" placeholder="Password" />{' '}
        <input type="submit" />{' '}
      </form>
    );
    let contactDetails;
    if (this.state.authorized) {
      contactDetails = (
        <div id="authorization">
          <h1>Contact</h1>
          <ul>
            <li>client@example.com</li>
            <li>555.555.5555</li>
          </ul>
        </div>
      );
    } else {
      contactDetails = (
        <div id="authorization">
          <h1>Contact</h1>Enter the Password{login}
        </div>
      );
    }
    return contactDetails;
  }
}

export default Contact;
