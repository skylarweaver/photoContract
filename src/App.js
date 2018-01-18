// Front-end Libraries
import React, { Component } from 'react'

// blockchain imports
import PhotoContract from '../build/contracts/PhotoContract.json'
import getWeb3 from './utils/getWeb3'

// Import CSS
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

// Import Components
import ImageItems from './components/ImageItems';
import MyAccount from './components/MyAccount';



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      photoIds: 0,
      web3: null
    };

    this.addPhoto = this.addPhoto.bind(this);

  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    // const contract = require('truffle-contract')
    // const simpleStorage = contract(SimpleStorageContract)
    // simpleStorage.setProvider(this.state.web3.currentProvider)

    // // Declaring this for later so we can chain functions on SimpleStorage.
    // var simpleStorageInstance

    // // Get accounts.
    // this.state.web3.eth.getAccounts((error, accounts) => {
    //   simpleStorage.deployed().then((instance) => {
    //     simpleStorageInstance = instance

    //     // Stores a given value, 5 by default.
    //     return simpleStorageInstance.set(5, {from: accounts[0]})
    //   }).then((result) => {
    //     // Get the value from the contract to prove it worked.
    //     return simpleStorageInstance.get.call(accounts[0])
    //   }).then((result) => {
    //     // Update state with the result.
    //     return this.setState({ storageValue: result.c[0] })
    //   })
    // })

    // Init contract to pull all existing photos and cache that data
    const contract = require('truffle-contract')
    const PhotoContract = contract(PhotoContract)
    PhotoContract.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var PhotoContractInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      PhotoContract.deployed().then((instance) => {
        PhotoContractInstance = instance

        return PhotoContractInstance.getPhotosListed({from: accounts[0]})
      }).then((result) => {
        // Update state with the result.
        return this.setState({ photoIds: result })
      })
    })
  }

  // Should be working but i suspect not responding due to metamask not working. need to restart
  addPhoto() {
    // Collect data through form and pass to this function
    var name = "Photo name";
    var url = "www.google.com";
    var description = "test description";
    var date = "1/17/2018";
    var location = "Washington, DC";
    var price = 50;

    // use inited contract to add photo
    const contract = require('truffle-contract')
    const PhotoContract = contract(PhotoContract)
    PhotoContract.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var PhotoContractInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      PhotoContract.deployed().then((instance) => {
        PhotoContractInstance = instance
        return PhotoContractInstance.addPhoto(name, url, description, date, location, price, {from: accounts[0]})
      });
      // Can optionally collect data from receipt of transaction like how we do in testing
      // Might want to collect hash id so we can show that transaction was successful. 
    })
  }

  render() {

    // Do some pre-render logic here
    var photoIds = [1,2,3,4,5,6,7,8]
    var links = ['http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200']
    var name = "Skylar Weaver"
    var pubKey = "0xkljasdhfkjashdfjkhasdfkjlhwiuqeryuqweryuewiqyr"
    var holdings = 500

    // Possibly make web3 calls all at beginning and cache photo data here. Then pass through to component as props for displaying.

    // Return rendered HTML
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Photo Contract</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <MyAccount name={name} pubKey={pubKey} holdings={holdings}/>
              <p>The stored value is: {this.state.storageValue}</p>
            </div>

            <button onClick={this.addPhoto}>
              Add Photo
            </button>

            <div className="pure-u-1-1 title">
              <h1>Photos</h1>
            </div>
            <div className="pure-u-1-2 tab1">
              <h4>Community</h4>
            </div>
            <div className="pure-u-1-2 tab2">
              <h4>Personal</h4>
            </div>

            <ImageItems photoIds={photoIds} links={links}/>

            <ImageItems photoIds={photoIds} links={links}/>

          </div>
        </main>
      </div>
    );
  }
}

export default App
