import React, { Component } from 'react'

class AddPhotoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: '',
      urlValue: '',
      descriptionValue: '',
      dateValue: '',
      locationValue: '',
      priceValue: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    console.log(this.state.nameValue);
    console.log(this.state.urlValue);
    console.log(this.state.descriptionValue);
    console.log(this.state.dateValue);
    console.log(this.state.locationValue);
    console.log(this.state.priceValue);
    event.preventDefault();
    this.props.addPhoto(
      this.state.nameValue,
      this.state.urlValue,
      this.state.descriptionValue,
      this.state.dateValue,
      this.state.locationValue,
      this.state.priceValue
    );
  }

  render() {
    return (
      <form className="pure-u-1-2" onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input className="pure-u-1-1" type="text" name="nameValue" value={this.state.nameValue} onChange={this.handleChange} />
        </label>
        <label>
          Photo URL:
          <input className="pure-u-1-1" type="text" name="urlValue" value={this.state.urlValue} onChange={this.handleChange} />
        </label>
        <label>
          Description:
          <input className="pure-u-1-1" type="text" name="descriptionValue" value={this.state.descriptionValue} onChange={this.handleChange} />
        </label>
        <label>
          Date:
          <input className="pure-u-1-1" type="text" name="dateValue" value={this.state.dateValue} onChange={this.handleChange} />
        </label>
        <label>
          Location:
          <input className="pure-u-1-1" type="text" name="locationValue" value={this.state.locationValue} onChange={this.handleChange} />
        </label>
        <label>
          Price:
          <input className="pure-u-1-1" type="number" name="priceValue" value={this.state.priceValue} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Upload" />
      </form>
    );
  }
}

export default AddPhotoForm 
