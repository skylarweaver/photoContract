import React, { Component } from 'react'

class MyAccount extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="pure-u-1-1 account" >
        <h1>Account</h1>
        <h3 className="name">{this.props.name}</h3>
        <p className="pubKey">Address: {this.props.pubKey}</p>
        <p className="holdings">Balance: {this.props.holdings} ETH</p>
      </div>
    );
  }
}

export default MyAccount 
