// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('start', ['ionic', 'start.characters', 'start.character'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .factory('Books', function() {
    return {
      newBook: function(title, author) {
        return {
          title: title,
          author: author,
          characters: []
        }
      }
    }
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.navBar.alignTitle('center');

    $stateProvider

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
      })

    $urlRouterProvider.otherwise('/app/characters');

  })

  .controller('AppCtrl', function ($scope, Books, $ionicModal, $ionicPopup) {

    $scope.exampleBook1 = {
      title: 'The Dark Tower',
      author: 'Stephen King',
      characters: [
      { name: 'Roland' },
      { name: 'The Man in Black' }
      ]
    }

    $scope.exampleBook2 = {
      title: "Harry Potter and the Sorcerer's Stone",
      author: 'JK Rowling',
      characters: [
      { name: 'Harry' },
      { name: 'Ron' }, 
      { name: 'Hermione' }
      ]
    }

    $scope.tempBook = {
      title: '',
      author: '',
      characters: []
    }

    $scope.books = [$scope.exampleBook1, $scope.exampleBook2];
    $scope.activeBook = $scope.books[0];
    $scope.showDelete = false;

    $ionicModal.fromTemplateUrl('templates/createBookModal.html', {
    scope: $scope,
    backdropClickToClose: false
    }).then(function(modal) {
      $scope.modal = modal;
      });

    $scope.openBookModal = function() {
      $scope.modal.show();
    };

    $scope.closeBookModal = function() {
      $scope.modal.hide();
    };

    $scope.createBook = function() {
      var sameBookName = false;
      for(i = 0; i < $scope.books.length; i++) {
        if($scope.tempBook.title.toLowerCase() == $scope.books[i].title.toLowerCase()) {
          sameBookName = true;
        }
      }
      if($scope.tempBook.title && !sameBookName) {
        var newBook = Books.newBook($scope.tempBook.title, $scope.tempBook.author);
        $scope.books.push(newBook);
        $scope.cleanTempBook();
        $scope.closeBookModal();
      }
      if(sameBookName) {
        var sameNamePopup = $ionicPopup.alert({
          title: 'Cannot use the same name as a previous book.',
          okType: 'button-royal'
        });
      }
    };

    $scope.deleteBook = function(book) {
      for(i = 0; i < $scope.books.length; i++) {
        if(book.title == $scope.books[i].title) {
          // Confirm book deletion
          $scope.confirmBookDeletion(i, book.title);
        }
      }
    };

    $scope.confirmBookDeletion = function(position, bookTitle) {
      var confirmDeletionPopup = $ionicPopup.show({
        title: 'Delete ' + bookTitle + '?',
        template: 'This action cannot be reversed.',
        scope: $scope,
        buttons: [
        { text: 'Cancel',
          type: 'button-dark'
        },
        { text: 'Delete',
          type: 'button-assertive',
          onTap: function(e) {
            $scope.books.splice(position, 1);
            $scope.activeBook = $scope.books[0];
          }}
        ]
      });
    };

    $scope.setActiveBook = function(book) {
      $scope.activeBook = book;
    };

    $scope.cleanTempBook = function() {
      $scope.tempBook.title = '';
      $scope.tempBook.author = '';
    };

  });