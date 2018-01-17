// Contract to be tested
var PhotoContract = artifacts.require("./PhotoContract.sol");


// Test suite
contract('PhotoContract', function(accounts) {
  var photoContractInstance;
  var owner = accounts[1];
  var owner2 = accounts[2];
  var photoName1 = "Photo 1";
  var photoUrl1 = "www.google.com"
  var photoDescription1 = "Description for Photo 1";
  var photoDate1 = "1/17/2018"
  var photoLocation1 = "Washington, DC"
  var photoPrice1 = 10;
  var photoName2 = "Photo 2";
  var photoUrl2 = "www.google.com"
  var photoDescription2 = "Description for Photo 2";
  var photoDate2 = "1/17/2018"
  var photoLocation2 = "Washington, DC"
  var photoPrice2 = 20;

  var watcher;
  // var sellerBalanceBeforeBuy, sellerBalanceAfterBuy;
  // var buyerBalanceBeforeBuy, buyerBalanceAfterBuy;

  // Test case: check initial values
  it("should be initialized with empty values", function() {
    return PhotoContract.deployed().then(function(instance) {
      photoContractInstance = instance;
      return photoContractInstance.getNumberOfPhotos();
    }).then(function(data) {
      assert.equal(data, 0x0, "number of photos must be zero");
      return photoContractInstance.getPhotosListed();
    }).then(function(data){
      assert.equal(data.length, 0, "photos listed should be empty");
    });
  });

  // Test case: list a first photo
  it("should let us list a first photo", function() {
    return PhotoContract.deployed().then(function(instance) {
      photoContractInstance = instance;
      return photoContractInstance.addPhoto(photoName1, photoUrl1, photoDescription1, photoDate1, photoLocation1, web3.toWei(photoPrice1, "ether"), {
        from: owner
      });
    }).then(function(receipt) {
      //check EVENT to make sure event is accurate
      assert.equal(receipt.logs.length, 1, "should have received one event");
      assert.equal(receipt.logs[0].event, "addedPhotoEvent", "event name should be addedPhotoEvent");
      assert.equal(receipt.logs[0].args._id.toNumber(), 1, "id must be 1");
      assert.equal(receipt.logs[0].args._owner, owner, "owner must be " + owner);
      assert.equal(receipt.logs[0].args._name, photoName1, "photo name must be " + photoName1);
      assert.equal(receipt.logs[0].args._url, photoUrl1, "photo url must be " + photoUrl1);
      assert.equal(receipt.logs[0].args._description, photoDescription1, "photo desc must be " + photoDescription1);
      assert.equal(receipt.logs[0].args._date, photoDate1, "photo date must be " + photoDate1);
      assert.equal(receipt.logs[0].args._location, photoLocation1, "photo location must be " + photoLocation1);
      assert.equal(receipt.logs[0].args._price.toNumber(), web3.toWei(photoPrice1, "ether"), "photo price must be " + web3.toWei(photoPrice1, "ether"));

      return photoContractInstance.getNumberOfPhotos();
    }).then(function(data) {
      assert.equal(data, 1, "number of photos must be one");

      return photoContractInstance.getPhotosListed();
    }).then(function(data) {
      assert.equal(data.length, 1, "there must now be 1 photo list");
      photoId = data[0].toNumber();
      assert.equal(photoId, 1, "photo id must be 1");

      return photoContractInstance.photos(photoId);
    }).then(function(data) {
      assert.equal(data[0].toNumber(), 1, "photo id must be 1");
      assert.equal(data[1], photoName1, "photo name must be " + photoName1);
      assert.equal(data[2], photoUrl1, "photo url must be " + photoUrl1);
      assert.equal(data[3], owner, "owner must be " + owner);
      assert.equal(data[4], photoDescription1, "photo description must be " + photoDescription1);
      assert.equal(data[5], photoDate1, "photo date must be " + photoDate1);
      assert.equal(data[6], photoLocation1, "photo location must be " + photoLocation1);
      assert.equal(data[7].toNumber(), web3.toWei(photoPrice1, "ether"), "photo price must be " + web3.toWei(photoPrice1, "ether"));
    });
  });

  // Test case: list a second photo
    it("should let us list a second photo", function() {
      return PhotoContract.deployed().then(function(instance) {
        photoContractInstance = instance;
        return photoContractInstance.addPhoto(photoName2, photoUrl2, photoDescription2, photoDate2, photoLocation2, web3.toWei(photoPrice2, "ether"), {
          from: owner2
        });
      }).then(function(receipt) {
        //check event
        assert.equal(receipt.logs.length, 1, "should have received one event");
        assert.equal(receipt.logs[0].event, "addedPhotoEvent", "event name should be addedPhotoEvent");
        assert.equal(receipt.logs[0].args._id.toNumber(), 2, "id must be 2");
        assert.equal(receipt.logs[0].args._owner, owner2, "owner must be " + owner2);
        assert.equal(receipt.logs[0].args._name, photoName2, "photo name must be " + photoName2);
        assert.equal(receipt.logs[0].args._url, photoUrl2, "photo url must be " + photoUrl2);
        assert.equal(receipt.logs[0].args._description, photoDescription2, "photo desc must be " + photoDescription2);
        assert.equal(receipt.logs[0].args._date, photoDate2, "photo date must be " + photoDate2);
        assert.equal(receipt.logs[0].args._location, photoLocation2, "photo location must be " + photoLocation2);
        assert.equal(receipt.logs[0].args._price.toNumber(), web3.toWei(photoPrice2, "ether"), "photo price must be " + web3.toWei(photoPrice2, "ether"));

        return photoContractInstance.getNumberOfPhotos();
      }).then(function(data) {
        assert.equal(data, 2, "number of photos must be two");

        return photoContractInstance.getPhotosListed();
      }).then(function(data) {
        assert.equal(data.length, 2, "there must now be 2 photo list");
        photoId = data[1].toNumber();
        assert.equal(photoId, 2, "photo id must be 2");

        return photoContractInstance.photos(photoId);
      }).then(function(data) {
        assert.equal(data[0].toNumber(), 2, "photo id must be 2");
        assert.equal(data[1], photoName2, "photo name must be " + photoName2);
        assert.equal(data[2], photoUrl2, "photo url must be " + photoUrl2);
        assert.equal(data[3], owner2, "owner must be " + owner2);
        assert.equal(data[4], photoDescription2, "photo description must be " + photoDescription2);
        assert.equal(data[5], photoDate2, "photo date must be " + photoDate2);
        assert.equal(data[6], photoLocation2, "photo location must be " + photoLocation2);
        assert.equal(data[7].toNumber(), web3.toWei(photoPrice2, "ether"), "photo price must be " + web3.toWei(photoPrice2, "ether"));
      });
    });



  // Test case: buy the first article
  // it("should let us buy the first article", function() {
  //   return ChainList.deployed().then(function(instance) {
  //     chainListInstance = instance;
  //     articleId = 1;

  //     // record balances of seller and buyer before the buy
  //     sellerBalanceBeforeBuy = web3.fromWei(web3.eth.getBalance(seller), "ether").toNumber();
  //     buyerBalanceBeforeBuy = web3.fromWei(web3.eth.getBalance(buyer), "ether").toNumber();

  //     return chainListInstance.buyArticle(articleId, {
  //       from: buyer,
  //       value: web3.toWei(articlePrice1, "ether")
  //     });
  //   }).then(function(receipt) {
  //     assert.equal(receipt.logs.length, 1, "one event should have been triggered");
  //     assert.equal(receipt.logs[0].event, "buyArticleEvent", "event should be buyArticleEvent");
  //     assert.equal(receipt.logs[0].args._id.toNumber(), articleId, "articleId must be " + articleId);
  //     assert.equal(receipt.logs[0].args._seller, seller, "event seller must be " + seller);
  //     assert.equal(receipt.logs[0].args._buyer, buyer, "event buyer must be " + buyer);
  //     assert.equal(receipt.logs[0].args._name, articleName1, "event article name must be " + articleName1);
  //     assert.equal(receipt.logs[0].args._price.toNumber(), web3.toWei(articlePrice1, "ether"), "event article price must be " + web3.toWei(articlePrice1, "ether"));

  //     // record balances of buyer and seller after the buy
  //     sellerBalanceAfterBuy = web3.fromWei(web3.eth.getBalance(seller), "ether").toNumber();
  //     buyerBalanceAfterBuy = web3.fromWei(web3.eth.getBalance(buyer), "ether").toNumber();

  //     //check the effect of buy on balances of buyer and seller, accounting for gas
  //     assert(sellerBalanceAfterBuy == sellerBalanceBeforeBuy + articlePrice1, "seller should have earned " + articlePrice1 + " ETH");
  //     assert(buyerBalanceAfterBuy <= buyerBalanceBeforeBuy - articlePrice1, "buyer should have spent " + articlePrice1 + " ETH");

  //     return chainListInstance.articles(articleId);
  //   }).then(function(data) {
  //     assert.equal(data[0].toNumber(), 1, "article id must be 1");
  //     assert.equal(data[1], seller, "seller must be " + seller);
  //     assert.equal(data[2], buyer, "buyer must be " + buyer);
  //     assert.equal(data[3], articleName1, "article name must be " + articleName1);
  //     assert.equal(data[4], articleDescription1, "article description must be " + articleDescription1);
  //     assert.equal(data[5].toNumber(), web3.toWei(articlePrice1, "ether"), "article price must be " + web3.toWei(articlePrice1, "ether"));

  //     return chainListInstance.getArticlesForSale();
  //   }).then(function(data) {
  //     assert(data.length, 1, "there should now be only one article left for sale");
  //   });
  // });
});
