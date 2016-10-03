angular.module('start.character', ['ngStorage', 'start.characters'])

  .config(function ($stateProvider, $ionicConfigProvider) {
  	$ionicConfigProvider.navBar.alignTitle('center');

	  $stateProvider

		.state('app.character', {
			url: "/character", 
			cache: false,
			views: {
				'menuContent' :{
					templateUrl: "templates/character.html",
					controller: "CharacterCtrl"
				}
			}
		})
	})

	.controller('CharacterCtrl', function($scope, CharactersService, $localStorage, $state, $ionicPopup, $ionicModal) {

		$scope.activeCharacter = CharactersService.getActiveCharacter();
		$scope.activeCharacter = $localStorage.activeCharacter; 

		$ionicModal.fromTemplateUrl('templates/editCharacterModal.html', {
    scope: $scope,
    backdropClickToClose: false
    }).then(function(modal) {
      $scope.modal = modal;
      });

    $scope.openEditCharModal = function() {
      $scope.modal.show();
      $scope.editChar = CharactersService.newCharacter($scope.activeCharacter);
    };

    $scope.closeEditCharModal = function() {
      $scope.modal.hide();
    };

    $scope.editCharacter = function() {
    	var position;
      for(i = 0; i < $scope.activeBook.characters.length; i++) {
        if($scope.activeCharacter.name == $scope.activeBook.characters[i].name) {
          position = i;
        }
      }
    	$scope.activeBook.characters[position] = $scope.editChar;
    	$scope.activeCharacter = $scope.editChar;
    	$scope.closeEditCharModal();
    }

    $scope.deleteActiveCharacter = function() {
    	var position;
      for(i = 0; i < $scope.activeBook.characters.length; i++) {
        if($scope.activeCharacter.name == $scope.activeBook.characters[i].name) {
          position = i;
        }
      }
      var confirmDeletionPopup = $ionicPopup.show({
      	title: 'Delete this character?',
      	template: 'This action cannot be reversed.',
      	scope: $scope,
      	buttons: [
      	{ text: 'Cancel',
      		type: 'button-dark'
      	},
      	{ text: 'Delete',
      		type: 'button-assertive',
      		onTap: function(e) {
      			$scope.activeBook.characters.splice(position, 1);
      			$scope.closeEditCharModal();
      			$state.go('app.characters');
      		}
      	}]
      })
    };
  });