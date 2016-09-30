angular.module('start.character', ['start.characters'])

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

	.controller('CharacterCtrl', function($scope, CharactersService, $stateParams, $ionicPopup) {

		$scope.activeCharacter = CharactersService.getActiveCharacter();
	});