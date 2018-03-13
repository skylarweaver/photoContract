pragma solidity ^0.4.2;

import "./Owned.sol";

/**
 * The PhotoContract contract allows uploading of photo metadata to the blockchain
 */
contract PhotoContract is Owned {

	// Init Photo struct
	struct Photo{
	  uint id;
	  string name;
	  string url;
	  address owner;
	  string description;
	  string date;
	  string location;
	  uint256 price;
	}

	// State variables
	mapping(uint => Photo) public photos;
	uint photoCounter;

	// Events

	event addedPhotoEvent(
	  uint indexed _id,
	  address _owner,
	  string _name,
	  string _url,
	  string _description,
	  string _date,
	  string _location,
	  uint256 _price
	);

	// Functions

	// add a photo
	function addPhoto(string _name, string _url, string _description, string _date, string _location, uint256 _price) public {
	  // a new photo
	  photoCounter++;

	  // store this article
	  photos[photoCounter] = Photo(
	       photoCounter,
	       _name,
	       _url,
	       msg.sender,
	       _description,
	       _date,
	       _location,
	       _price
	  );

	  // trigger the event
	  addedPhotoEvent(photoCounter, msg.sender, _name, _url, _description, _date, _location, _price);
	}


	// fetch the number of photos in the contract
	function getNumberOfPhotos() public constant returns (uint) {
	  return photoCounter;
	}

	// fetch and returns all photo IDs on site
	// This is a dumb function. Photos array already exists so don't need function for that
	// Also, photocounter is a public variable (I believe), and that's all this function returns right now
	// Can possibly use this later to get photos uploaded by specific userss
	function getPhotosListed() public constant returns (uint[]) {
	  // we check whether there is at least one article
	  if(photoCounter == 0) {
	    return new uint[](0);
	  }

	  // prepare intermediary array
	  uint[] memory photoIds = new uint[](photoCounter);

	  uint numberOfPhotosListed = 0; 
	  // iterate over articles
	  for (uint i = 1; i <= photoCounter; i++) {
	      photoIds[numberOfPhotosListed] = photos[i].id;
	      numberOfPhotosListed++; 
	  }

	  // copy the photoIds array into the smaller forSale array
	  // uint[] memory forSale = new uint[](numberOfArticlesForSale);
	  // for (uint j = 0; j < numberOfArticlesForSale; j++) {
	  //   forSale[j] = photoIds[j];
	  // }
	  return (photoIds);
	}


	// kill the smart contract only if you're the owner
	function kill() onlyOwner public{
	  selfdestruct(owner);
	}
}
