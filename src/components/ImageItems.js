import React, { Component } from 'react'

class ImageItems extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentWillMount() {

  }

  // instantiateContract() {
  //   /*
  //    * SMART CONTRACT EXAMPLE
  //    *
  //    * Normally these functions would be called in the context of a
  //    * state management library, but for convenience I've placed them here.
  //    */

  //   const contract = require('truffle-contract')
  //   const simpleStorage = contract(SimpleStorageContract)
  //   simpleStorage.setProvider(this.state.web3.currentProvider)

  //   // Declaring this for later so we can chain functions on SimpleStorage.
  //   var simpleStorageInstance

  //   // Get accounts.
  //   this.state.web3.eth.getAccounts((error, accounts) => {
  //     simpleStorage.deployed().then((instance) => {
  //       simpleStorageInstance = instance

  //       // Stores a given value, 5 by default.
  //       return simpleStorageInstance.set(5, {from: accounts[0]})
  //     }).then((result) => {
  //       // Get the value from the contract to prove it worked.
  //       return simpleStorageInstance.get.call(accounts[0])
  //     }).then((result) => {
  //       // Update state with the result.
  //       return this.setState({ storageValue: result.c[0] })
  //     })
  //   })
  // }

  render() {

    var photoIds = this.props.photoIds //[1,2,3,4,5,6,7,8]
    var links = ['http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200']
    const imageItems = photoIds.map((number) =>
      <div key={number} className="pure-u-1-8 pure-u-md-1-8">
        <img src={links[number-1]} className="pure-img"/>
      </div>
    );

    return (
      <div>
        {imageItems}
      </div>
    );
  }
}

export default ImageItems 
