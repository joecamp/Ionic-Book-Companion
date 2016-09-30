angular.module('start.characters', [])

	.config(function ($stateProvider, $ionicConfigProvider) {
  	$ionicConfigProvider.navBar.alignTitle('center');

	 	$stateProvider

		.state('app.characters', {
			url: "/characters", 
			cache: false,
			views: {
				'menuContent' :{
					templateUrl: "templates/characters.html",
					controller: "CharactersCtrl"
				}
			}
		})
	})

 	.factory('CharactersService', function() {
 		var activeCharacter;

 		var setActiveCharacter = function(character) {
 			activeCharacter = character;
 		};
 		var getActiveCharacter = function(character) {
 			return activeCharacter;
 		};
 		var newCharacter = function(name, age) {
 			return {
 				name: name,
 				age: age
 			}
 		}

    return {
    	newCharacter: newCharacter,
      setActiveCharacter: setActiveCharacter,
      getActiveCharacter: getActiveCharacter
    };
  })

	.controller('CharactersCtrl', function($scope, CharactersService, $stateParams, $ionicModal, $ionicPopup) {
		
		$scope.tempChar = {
      name: '',
      age: '',
    }

		$scope.activeCharacter;

		$ionicModal.fromTemplateUrl('templates/createCharacterModal.html', {
    scope: $scope,
    backdropClickToClose: false
    }).then(function(modal) {
      $scope.modal = modal;
      });

    $scope.openCharacterModal = function() {
      $scope.modal.show();
    };

    $scope.closeCharacterModal = function() {
      $scope.modal.hide();
    };

		$scope.addCharacterToActiveBook = function() {
			var sameCharName = false;
      for(i = 0; i < $scope.activeBook.characters.length; i++) {
        if($scope.tempChar.name.toLowerCase() == $scope.activeBook.characters[i].name.toLowerCase()) {
          sameCharName = true;
        }
      }
      if($scope.tempChar.name && !sameCharName) {
        var newChar = CharactersService.newCharacter($scope.tempChar.name, $scope.tempChar.age);
        $scope.activeBook.characters.push(newChar);
        $scope.cleanTempChar();
        $scope.closeCharacterModal();
      }
      if(sameCharName) {
        var sameNamePopup = $ionicPopup.alert({
          title: 'Cannot use the same name as a previous character.',
          okType: 'button-royal'
        });
      }
		};

		$scope.setActiveCharacter = function(character) {
			CharactersService.setActiveCharacter(character);
		};

		$scope.cleanTempChar = function() {
			$scope.tempChar.name = '';
      $scope.tempChar.age = '';
		};
	});