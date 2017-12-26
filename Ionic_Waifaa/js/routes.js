angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('menu.accueil', {
    url: '/accueil',
    views: {
      'side-menu21': {
        templateUrl: 'templates/accueil.html',
        controller: 'accueilCtrl'
      }
    }
  })

  .state('menu.wAIFAA', {
    url: '/decouverte',
    views: {
      'side-menu21': {
        templateUrl: 'templates/wAIFAA.html',
        controller: 'wAIFAACtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.contact', {
    url: '/contact',
    views: {
      'side-menu21': {
        templateUrl: 'templates/contact.html',
        controller: 'contactCtrl'
      }
    }
  })

  .state('menu.fAQ', {
    url: '/faq',
    views: {
      'side-menu21': {
        templateUrl: 'templates/fAQ.html',
        controller: 'fAQCtrl'
      }
    }
  })

  .state('intro_slider', {
    url: '/page18',
    templateUrl: 'templates/intro_slider.html',
    controller: 'intro_sliderCtrl'
  })

  .state('menu.login', {
    url: '/login',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('menu.modifierMotDePasse', {
    url: '/changepassword',
    views: {
      'side-menu21': {
        templateUrl: 'templates/modifierMotDePasse.html',
        controller: 'modifierMotDePasseCtrl'
      }
    }
  })

  .state('menu.souscrire', {
    url: '/souscrire',
    views: {
      'side-menu21': {
        templateUrl: 'templates/souscrire.html',
        controller: 'souscrireCtrl'
      }
    }
  })

  .state('menu.dashboard', {
    url: '/dashboard',
    views: {
      'side-menu21': {
        templateUrl: 'templates/dashboard.html',
        controller: 'dashboardCtrl'
      }
    }
  })

  .state('menu.memberships', {
    url: '/memberships',
    views: {
      'side-menu21': {
        templateUrl: 'templates/memberships.html',
        controller: 'membershipsCtrl'
      }
    }
  })

  .state('menu.avantages', {
    url: '/avantages',
    views: {
      'side-menu21': {
        templateUrl: 'templates/avantages.html',
        controller: 'avantagesCtrl'
      }
    }
  })

  .state('menu.mutuelle', {
    url: '/mutuelle',
    views: {
      'side-menu21': {
        templateUrl: 'templates/mutuelle.html',
        controller: 'mutuelleCtrl'
      }
    }
  })

  .state('menu.paiement', {
    url: '/paiement',
    views: {
      'side-menu21': {
        templateUrl: 'templates/paiement.html',
        controller: 'paiementCtrl'
      }
    }
  })

  .state('menu.profil', {
    url: '/profil',
    views: {
      'side-menu21': {
        templateUrl: 'templates/profil.html',
        controller: 'profilCtrl'
      }
    }
  })

  .state('menu.modifierProfile', {
    url: '/editProfil',
    views: {
      'side-menu21': {
        templateUrl: 'templates/modifierProfile.html',
        controller: 'modifierProfileCtrl'
      }
    }
  })

  .state('menu.validation', {
    url: '/validation',
    views: {
      'side-menu21': {
        templateUrl: 'templates/validation.html',
        controller: 'validationCtrl'
      }
    }
  })

  .state('menu.motDePasseOubli', {
    url: '/motDePasseOubli',
    views: {
      'side-menu21': {
        templateUrl: 'templates/motDePasseOubli.html',
        controller: 'motDePasseOubliCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/accueil')


});