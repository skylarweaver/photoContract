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
import AddPhotoForm from './components/AddPhotoForm';



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      totalPhotos: 0,
      pubKey: 0x0,
      ethBalance: 0,
      web3: null
    };

    this.addPhoto = this.addPhoto.bind(this);

    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
      console.log("Contract Instantiated")
    })
    .catch(() => {
      console.log('Error finding web3.')
    })

  }

  componentWillMount() {
    // only server-side rendered function here
    // this runs before everything else, i believe
    // cannot make state calls here
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    // Init contract to pull all existing photos and cache that data
    const contract = require('truffle-contract')
    const PhotoCon = contract(PhotoContract)
    PhotoCon.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on PhotoContract.
    var PhotoContractInstance

    // 

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      PhotoCon.deployed().then((instance) => {
        PhotoContractInstance = instance

        this.setState({ 
          pubKey: accounts[0]
        })

        return PhotoContractInstance.getNumberOfPhotos({from: accounts[0]})
      }).then((numPhotosResult) => {
        // Update state with the result.
        this.setState({ totalPhotos: numPhotosResult.c[0] })
        return this.state.web3.eth.getBalance(accounts[0], (err, balance) => {
          if (err === null) {
            this.setState({ ethBalance: this.state.web3.fromWei(balance, "ether").toNumber() });
          }
        })
      })
    })
  }

  // Should be working but i suspect not responding due to metamask not working. need to restart
  addPhoto(name, url, description, date, location, price) {
    // Collect data through form and pass to this function
      // var name = "Photo name";
      // var url = "www.google.com";
      // var description = "test description";
      // var date = "1/17/2018";
      // var location = "Washington, DC";
      // var price = 50;

    // use inited contract to add photo
    const contract = require('truffle-contract')
    const PhotoCon = contract(PhotoContract)

    PhotoCon.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on PhotoContractInstance.
    var PhotoContractInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      PhotoCon.deployed().then((instance) => {
        PhotoContractInstance = instance
        return PhotoContractInstance.addPhoto(name, url, description, date, location, price, {from: accounts[0]})
      }).then((result) => {
        // Needed to use => notation b/c function brings new this variable and loses state
        this.setState({totalPhotos: this.state.totalPhotos + 1});
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
    var pubKey = this.state.pubKey
    var holdings = this.state.ethBalance

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
              <p>Upload a photo to the Blockchain</p>
              <p>There are currently {this.state.totalPhotos} photos uploaded</p>

            </div>

            <div className="pure-u-1-1">
              <button onClick={this.addPhoto}>
                Add Photo
              </button>
            </div>
            <AddPhotoForm addPhoto={this.addPhoto}/>

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
