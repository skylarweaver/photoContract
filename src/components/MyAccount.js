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
      <div className="pure-u-1-3 account" >
        <h3 className="name">Name: {this.props.name}</h3>
        <p className="pubKey">Public Key: {this.props.pubKey}</p>
        <p className="holdings">Holdings: {this.props.holdings} ETH</p>
      </div>
    );
  }
}

export default MyAccount 
