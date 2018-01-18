import React, { Component } from 'react'

class ImageItems extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentWillMount() {
  }

  render() {

    var photoIds = this.props.photoIds //[1,2,3,4,5,6,7,8]
    var links = this.props.links
    const imageItems = photoIds.map((number) =>
      <div key={number} className="pure-u-1-8 pure-u-md-1-8">
        <img src={links[number-1]} alt="sample" className="pure-img"/>
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
