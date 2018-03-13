import React, { Component } from 'react'

class ImageItems extends Component {
  constructor(props) {
    super(props)

    this.state = {
      photoIds: this.props.photoIds,
    }
  }

  componentWillMount() {
    // this.filterPhotosToDisplay();
  }

  // function Greeting(props) {
  //   const isLoggedIn = props.isLoggedIn;
  //   if (isLoggedIn) {
  //     return <UserGreeting />;
  //   }
  //   return <GuestGreeting />;
  // }

  filterPhotosToDisplay() {


    // else display all photos taken by community
  }

  render() {

    var links = this.props.links
    var photosToDisplay = [];
    // Filter photos based on Community or Personal depending on tab selected
    if (this.props.showPersonal === true) {
      photosToDisplay = this.props.photos.filter(photo => photo["owner"] === this.props.pubKey)
    }
    else{
      console.log("Show Personal: " + this.props.showPersonal);
      photosToDisplay = this.props.photos;
    }

    const imageItems = photosToDisplay.map((photo) =>
      <div key={photo["id"]} className="pure-u-1-8 pure-u-md-1-8">
        <img src={links[1]} alt="sample" className="pure-img"/>
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
