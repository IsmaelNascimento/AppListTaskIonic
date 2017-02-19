angular.module('starter.controllers', [])

.controller('ProductController', function($scope, $ionicModal, $ionicPopup, $localStorage) {
  var ProductsDefault = [
    { name: 'BookReggae', value: 1, store: true },
    { name: 'BookRock', value: 2, store: true },
    { name: 'BookHipHop', value: 3, store: true }
  ];

  $ionicModal.fromTemplateUrl('templates/addProduct.html', {
    scope: $scope
  }).then(function(modalAddProduct){
    $scope.modalAddProduct = modalAddProduct;
  });

  $scope.AddProduct = function(Product) {
    if(!ValidateFormProduct(Product)){
      return;
    }

    $scope.products.push({name: Product.name, value: Product.value, store: Product.store});
    $scope.modalAddProduct.hide();

    Product.name = "";
    Product.value = "";
    Product.store = false;
  };

  $scope.Product = {name: "", value: "", store: false};

  $scope.EditProduct = function(AddProduct){
    $scope.editProduct = true;
    $scope.Product.name = AddProduct.name;
    $scope.Product.value = AddProduct.value;
    $scope.Product.store = AddProduct.store;
    auxEditProduct = AddProduct;
    $scope.modalAddProduct.show();
  };

  $scope.editProduct = false;

  $scope.OpenModalAddProduct = function(){
    $scope.editProduct = false;
    $scope.Product.name = "";
    $scope.Product.value = "";
    $scope.Product.store = false;
    $scope.modalAddProduct.show();
  };

  var auxEditProduct;

  $scope.SaveEditProduct = function(Product){
    if(!ValidateFormProduct(Product)){
      return;
    }
    
    auxEditProduct.name = Product.name;
    auxEditProduct.value = Product.value;
    auxEditProduct.store = Product.store;
    $scope.modalAddProduct.hide();
  };

  $scope.DeleteProduct = function(Product){
    for(var index in $scope.products){
      var productAux = $scope.products[index];

      if(Product === productAux){
        $scope.products.splice(index, 1);
      }
    }
  };

  $scope.deleteAllProduct = false;

  $scope.DeleteAllProduct = function(){

  };

  var ValidateFormProduct = function(Product){
    var textError = "";
    var hasError = false;

    if(Product.name === ""){
      hasError = true;
      textError += "<p>Name invalid</p>";
    }

    if(Product.value === ""){
      hasError = true;
      textError += "<p>Value invalid<p>";
    }

    if(hasError){
      var alertPopup = $ionicPopup.alert({
        title: "Error",
        template: textError
      });
      return false;
    }else{
      return true;
    } 
  };

  $scope.localData = $localStorage;

  var Init = function(){
    if(!$scope.localData.products){
      $scope.localData.products = ProductsDefault;
      $scope.products = $scope.localData.products;
    }else{
      $scope.products = $scope.localData.products;
    }
  };

  Init();

})