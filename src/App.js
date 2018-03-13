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
      web3: null,
      photos: [],
      showPersonal: false
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

    // Get accounts, then get pub key and holdings for accounts
    this.state.web3.eth.getAccounts((error, accounts) => {
      PhotoCon.deployed().then((instance) => {
        PhotoContractInstance = instance

        // After gathering accounts set public key from accounts
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
    // Listen for events (like when a photo is added)
    PhotoCon.deployed().then((instance) => {
      this.listenToEvents(PhotoCon);
    });

    // Load all previously uploaded photos
    this.reloadPhotos();
  }

  // Listen for events raised from the contract
  listenToEvents(PhotoCon) {
    console.log("listening to events");
    console.log(PhotoCon);

    PhotoCon.deployed().then((instance) => {
      instance.addedPhotoEvent({}, {fromBlock: 0,toBlock: 'latest'}).watch((error, event) => {
        console.log("Photo Uploaded:");
        console.log(event);
        this.reloadPhotos(PhotoCon);
      })
    });
  }

  addPhoto(name, url, description, date, location, price) {
    // Collect data through form and pass to this function
    // Use inited contract to add photo
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

  // Update state with photos array. Call as callback after photos reloaded
  displayPhotos(photos){
    this.setState({photos: photos});
    console.log("These are the photo titles: \n" + photos);
    console.log(photos[0]["id"].toNumber());
  }

  // Reload photos anyting an uploadPhoto event has been triggered
  reloadPhotos(PhotoCon) {
    // Declaring this for later so we can chain functions on PhotoContractInstance.
    var PhotoContractInstance

      PhotoCon.deployed().then((instance) => {
        PhotoContractInstance = instance
        return PhotoContractInstance.getPhotosListed();
      }).then((photoIds) => {
        // Needed to use => notation b/c function brings new this variable and loses state
        // loop through each photo and store photo data locally
        var photos = [];
        var idsProcessed = 0;

        photoIds.forEach( (photoId, index) => {
          PhotoContractInstance.photos(photoId.toNumber()).then((photo) => {
            idsProcessed++;
            var photoData = {
              "id" : photo[0],
              "name" : photo[1],
              "url" : photo[2],
              "owner" : photo[3],
              "description" : photo[4],
              "date" : photo[5],
              "location" : photo[6],
              "price" : photo[7]
            }
            // var photoData = photo[1];
            photos.push(photoData);
            // TODO setting this every loop right now b/c of delay. 
            if (idsProcessed === this.state.totalPhotos){
              this.displayPhotos(photos);
            };
          });
        });
      });
      // Can optionally collect data from receipt of transaction like how we do in testing
      // Might want to collect hash id so we can show that transaction was successful. 
  }

  render() {

    // Do some pre-render logic here
    var links = ['http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200', 'http://via.placeholder.com/200x200']
    var name = "Skylar Weaver";
    var holdings = this.state.ethBalance;

    // Possibly make web3 calls all at beginning and cache photo data here. Then pass through to component as props for displaying.

    // Return rendered HTML
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Photo Contract</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-2-3">
              <div className="pure-u-1-1 title">
                <h1>Photos</h1>
                <p>There are currently {this.state.totalPhotos} photos uploaded</p>
              </div>
              <div className="pure-u-1-2 tab1" onClick={ () => { this.setState({ showPersonal: false }) }}>
                <h4>Community</h4>
              </div>
              <div className="pure-u-1-2 tab2" onClick={ () => { this.setState({ showPersonal: true }) }}>
                <h4>Personal</h4>
              </div>

              <ImageItems showPersonal={this.state.showPersonal} pubKey={this.state.pubKey} photos={this.state.photos} links={links}/>
            </div>
            <div className="pure-u-1-3">
              <MyAccount name={name} pubKey={this.state.pubKey} holdings={holdings}/>
              <AddPhotoForm  addPhoto={this.addPhoto}/>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
