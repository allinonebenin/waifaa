angular.module('app.controllers', [])
  
.controller('accueilCtrl', ['$scope', '$stateParams', '$ionicScrollDelegate', '$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams, $ionicScrollDelegate, $location) {

    
}])
   
.controller('wAIFAACtrl', ['$scope', '$stateParams', '$ionicScrollDelegate', '$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams, $ionicScrollDelegate, $location) {



}])
   
.controller('menuCtrl', ['$scope', '$stateParams', '$ionicSideMenuDelegate', '$window', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams,  $ionicSideMenuDelegate, $window,$state ) {
    $scope.toggleLeftSideMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
      
      
      /////log out function
      
    $scope.logout = function() {
        window.localStorage.removeItem('user'); // delete user id from the local storage
        window.localStorage.removeItem('phone'); // delete user phone number from the local storage
        $state.go('menu.login',{},{location:"replace",reload:true}); // go to login page
    }
      
      
     // open dashboard page
    $scope.opendash = function(){
           //if there is an active user, show details 
        if(typeof window.localStorage.getItem("user") != 'object'){
            $state.go('menu.dashboard',{},{location:"replace",reload:true});

        }
            //if there is no active user, send to login page 
        else
            $state.go('menu.login',{},{location:"replace",reload:true});
    }
      
      
      //open login
    $scope.openlogin = function(){
           //if there is an active user, deconnect him
        if(typeof window.localStorage.getItem("user") != 'object'){
            window.localStorage.removeItem('user'); // delete user id from the local storage
            window.localStorage.removeItem('phone'); // delete user phone number from the local storage
			$state.go('menu.login',{},{location:"replace",reload:true});
        }
        //if there is no active user, send to login page 
        else
            $state.go('menu.login',{},{location:"replace",reload:true});
    }
      
      
      //open souscription page
	$scope.opensouscrire = function(){
           //if there is an active user, deconnect him
        if(typeof window.localStorage.getItem("user") != 'object'){
            window.localStorage.removeItem('user'); // delete user id from the local storage
            window.localStorage.removeItem('phone'); // delete user phone number from the local storage
			$state.go('menu.souscrire',{},{location:"replace",reload:true});

        }
                    //if there is no active user, send to souscription page 
        else
            $state.go('menu.login',{},{location:"replace",reload:true});
    }
       
}])
   
.controller('contactCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams) {
   


}])
   
.controller('fAQCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams) {
    $scope.showAnsOne= false;
    $scope.showAnsTwo = false;
    $scope.showAnsThree= false;
    //show card 1 and hide the other
    $scope.showCardOne = function() {
       $scope.showAnsOne= true;
       $scope.showAnsTwo = false;
       $scope.showAnsThree = false;
    };
    //show card 2 and hide the other
    $scope.showCardTwo = function() {
       $scope.showAnsOne= false;
       $scope.showAnsTwo = true;
       $scope.showAnsThree = false;
    };
    //show card 3 and hide the other
    $scope.showCardThree = function() {
       $scope.showAnsOne= false;
       $scope.showAnsTwo = false;
       $scope.showAnsThree = true;
    };
}])
   
.controller('intro_sliderCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$ionicModal', '$timeout', '$ionicPopup', '$http', '$state', '$ionicHistory', '$rootScope', '$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function

// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams, $ionicModal,$timeout,$ionicPopup,$http,$state,$ionicHistory, $rootScope, $window) {
    $scope.loginData={};
    $scope.error="";
    $scope.succes="";
    
    $scope.doLogin=function(){
         
    var user=escapeHtml($scope.loginData.username);
    var passwd=escapeHtml($scope.loginData.password);
    var url="http://www.allinone-benin.com/zbabaedjou/waifaa/api/users/login.php";
	var checkActiveUrl="http://www.allinone-benin.com/zbabaedjou/waifaa/api/users/check_active.php";
    $scope.showClearText = true;
    
    if($scope.showPasswordIsChecked===true){
        $scope.showHideText= false;
        $scope.showClearText = true;
    }
    else{
        $scope.showHideText= true;
        $scope.showClearText = false;
    }
	
    if(user && passwd){// if inputs are not empty
		$http.post(url, {username : user, passwds : passwd })//send login and password to the server for verification
		.then(function (res){ // if connection works properly
			console.log(res.data);
            if(isNaN(parseInt(res.data))===false){//  verify if the output valu is a number (isNaN means "is NOT a Number"), that means that the login works
                console.log(parseInt(res.data));
                
				//$rootScope.user=res.data;
                window.localStorage.setItem("user", parseInt(res.data)); //store the user id in local
                window.localStorage.setItem("phone", user); //store the user phone number in local
                $scope.loginData.username=''; // set inputs to ''
				$scope.loginData.password='';				
				
				//////////check if the account is validate
				console.log(user);
				$http.post(checkActiveUrl, {username : user }) // send the user phone number
					.then(function (res){ //ifte connectioin works
						console.log(res.data);
						if(res.data==="yes"){ // if the output is yes that means that the account is activated
							$state.go('menu.dashboard',{},{location:"replace",reload:true});			
						
						}
						else if(res.data==="no"){ // if the output is no that means that the account is not activated
							$state.go('menu.validation',{},{location:"replace",reload:true});
						}
						else{  // another output means that the account should have an issue
							$ionicPopup.alert({
										title:'Attention',
										template:'Il semblerait qu\'il y ait un petit soucis avec votre compte. veuillez svp contacter l\'administrateur.' }) 
						}

					})
					.catch(function(err) { // if the connection doesn't work
							$scope.succes="";
							$scope.error="Veuillez vérifier votre connexion internet svp.";
							});
						
								
				
				
			}
			else{ //if teh login doesn't work
                $scope.succes="";
                $scope.error="Login ou mot de passe invalid.";
				
            }

        })
		.catch(function(err) {  // if the connection doesn't work
                $scope.succes="";
                $scope.error="Veuillez vérifier votre connexion internet svp.";
                });
			
		}
		
      else{ // if inputs are empty
            $scope.succes="";
            $scope.error="Veuillez svp remplir tous les champs.";
           
      }

    }
    
    function escapeHtml(text) {
        return text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
}


}])
   
.controller('modifierMotDePasseCtrl', ['$scope', '$stateParams', '$ionicModal', '$timeout', '$ionicPopup', '$http', '$state', '$ionicHistory', '$rootScope', '$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function

// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams, $ionicModal,$timeout,$ionicPopup,$http,$state,$ionicHistory, $rootScope, $window) {
    $scope.error="";
    $scope.succes="";
    $scope.loginData={};
    $scope.change=function(){
        var phone=window.localStorage.getItem("phone");
        var passwd=escapeHtml($scope.loginData.passwor);
        var newpasswd=escapeHtml($scope.loginData.newpassword);
        var renewpasswd=escapeHtml($scope.loginData.renewpassword);
        var url="http://www.allinone-benin.com/zbabaedjou/waifaa/api/users/modifier_password.php";
       
        
    
        if(passwd && newpasswd && renewpasswd){ // if variables exist
            if(newpasswd === renewpasswd){ // if the two new password are teh same
                // send data to the server
                $http.post(url, {password : passwd, newpassword : newpasswd, username : phone })
                .then(function (res){
    			console.log(res.data);
                if(res.data=="true"){// if the password is modified succefully
                    $scope.succes="Mot de passe modifié avec succès!";
                    $scope.error="";
		    window.localStorage.removeItem('user'); // delete user id from the local storage
		    window.localStorage.removeItem('phone'); // delete user phone number from the local storage
		    $state.go('menu.login',{},{location:"replace",reload:true}); // go to login page

                }
                else if(res.data=="actualfalse"){ // if the actual password doesn't match
                    $scope.succes="";
                    $scope.error="L'actuel mot de passe n'est pas valide!";
                    
    				
                }
    
            })
    		.catch(function(err) { 
                    $scope.succes="";
                    $scope.error="Veuillez vérifier votre connexion internet svp!";
                    
                   
                    });
    			
            }
            else{ // if the two new passords are differents
                $scope.succes="";
                $scope.error="Les mots de passes sont différents!";

    		}
                
        }
    		
    		
          else{
                $scope.succes="";
                $scope.error="Veuillez svp remplir tous les champs!";
                
               
          }
    
        }
    
    function escapeHtml(text) {
        return text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
}

   
}])
   
.controller('souscrireCtrl', ['$scope', '$stateParams', '$ionicModal', '$timeout', '$ionicPopup', '$http', '$state', '$ionicHistory', '$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function

// TIP: Access Route Parameters for your page via $stateParams.parameterName
 

function ($scope, $stateParams, $ionicModal,$timeout,$ionicPopup,$http,$state,$ionicHistory,$window) {
    $scope.error="";
    $scope.succes="";
    
     $scope.loginData={};
    $scope.doSouscrire=function(){
        // get data from forms
        var fname=escapeHtml($scope.loginData.fname);
        var lname=escapeHtml($scope.loginData.lname);
        var phone=escapeHtml($scope.loginData.phone);
        var email=escapeHtml($scope.loginData.email);
        var adresse=escapeHtml($scope.loginData.adresse);
        var passwd=escapeHtml($scope.loginData.password);
        var newpasswd=escapeHtml($scope.loginData.newpassword);

        var url="http://www.allinone-benin.com/zbabaedjou/waifaa/api/users/signup.php";

        if(fname && lname && phone && email && adresse && passwd && newpasswd){ // if all form are filled
            if(passwd == newpasswd){ // if password and new password are same
                //send data in the http.post method
                $http.post(url, {fnames : fname, lnames : lname, phones : phone, emails : email, adresses : adresse, passwds : passwd  })
                .then(function (res){
                    console.log(res.data);
                    if(res.data== "true"){// if user is created succefull clear forms and go to login page
						window.localStorage.setItem("email", email); //store email in locale storage to send validation code.
						
					//////////////////clear inputs
                        $scope.loginData.fname='';
                        $scope.loginData.lname='';
                        $scope.loginData.phone='';
                        $scope.loginData.email='';
                        $scope.loginData.adresse='';
                        $scope.loginData.password='';
                        $scope.loginData.newpassword='';
                        $scope.succes="Votre compte a été créé avec succès.";
                        $scope.error="";
                        $state.go('menu.login',{},{location:"replace",reload:true});
                    }
                    
                    else if(res.data== "used"){  //if phone number is already used, tell the user that the phone number is not available
                        $scope.succes="";
                        $scope.error="Le numéro de téléphone existe déjà.";
                       
                    }
				
                   
                })
                
                .catch(function(err) { //if the http.post doesn't work, tell the user to check his connection
                    $scope.succes="";
                    $scope.error="Veuillez vérifier votre connexion internet svp.";
                   
                });
            }
            else{ //if password and new password don't match
                $scope.succes="";
                $scope.error="Les mots de passes ne correspondent pas.";
               
                
            }
		}
		
        else{ // if all form are not filled show this message
            $scope.succes="";
            $scope.error="Veuillez svp remplir tous les champs.";
           
          
        }

    }
    
     function escapeHtml(text) {
        return text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
}

}])
   
.controller('dashboardCtrl', ['$scope', '$stateParams', '$rootScope', '$http', '$state', '$window', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName


function ($scope, $stateParams, $rootScope,$http,$state,$window,$ionicPopup ) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
    }); 
    // check if there is an login user
    //if there is an active user, show details 
         var userId=window.localStorage.getItem("user"); //get user id
        var url="http://www.allinone-benin.com/zbabaedjou/waifaa/api/users/active_memberships.php";
        $scope.noSouscription = false; 
        $scope.yesSouscription = false;
        console.log(userId);
        $http.post(url, {id : userId })
        .then(function (res){
            console.log(res.data);
            if(res.data=="no"){// if user have no an active membership show no souscription 
                $scope.noSouscription = true;
                $scope.yesSouscription = false;
            }
            else{ // if user have an active membership show souscription name
                $scope.souscription=res.data;
                $scope.yesSouscription = true;
                $scope.noSouscription = false;
                $scope.active_name;
            }
    
        }) // if http.post doesn't work, show error
        .catch(function(err) { 
            $ionicPopup.alert({
                title:'Erreur',
                template:'Veuillez vérifier votre connexion internet svp.' })
        });
    
		$scope.startAdvantages=function(){
            $state.go('menu.mutuelle',{},{location:"replace",reload:true});

		};
		$scope.profil=function(){
            $state.go('menu.modifierProfile',{},{location:"replace",reload:true});

		};
		
       
		
     
}])
   
.controller('membershipsCtrl', ['$scope', '$stateParams', '$rootScope', '$http', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName


function ($scope, $stateParams,$rootScope,$http,$state) {
    var url="http://www.allinone-benin.com/zbabaedjou/waifaa/api/users/memberships.php";
        //retreive data from server
		$http.post(url)
		.then(function (res){
			console.log(res.data);
		
                $scope.memberships=res.data;
               
        })
		.catch(function(err) { 
                $ionicPopup.alert({
                title:'Erreur',
                template:'Veuillez vérifier votre connexion internet svp.' })
                });
                
         $scope.getdetails = function(name){
                  $rootScope.currentItem = name;
                  //$scope.modal.show();
                   $state.go('menu.mutuelle',{},{location:"replace",reload:true});

                };
		

}])
   
.controller('avantagesCtrl', ['$scope', '$stateParams', '$rootScope', '$http', '$state', '$window', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName


function ($scope, $stateParams, $rootScope,$http,$state,$window,$ionicHistory) {
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        }); 
        // if information aren't already available, go to the database
         var userId=window.localStorage.getItem("user"); //get user id
        var url="http://www.allinone-benin.com/zbabaedjou/waifaa/api/users/memberships_description.php";
   
        console.log(userId);
		$http.post(url, {id : userId })
		.then(function (res){
			console.log(res.data);//get datat from database
			
			window.localStorage.setItem("titleSouscription", res.data.title);
			window.localStorage.setItem("decriptionSouscription",res.data.description);
			window.localStorage.setItem("priceSouscription", res.data.price);
			$scope.title= window.localStorage.getItem("titleSouscription");
            $scope.description= window.localStorage.getItem("decriptionSouscription");
            $scope.price= window.localStorage.getItem("priceSouscription");

			
        })
		.catch(function(err) { 
                $ionicPopup.alert({
                title:'Erreur',
                template:'Veuillez vérifier votre connexion internet svp.' })
                });
                
        $scope.goBack = function () {
            $ionicHistory.removeBackView();
            $ionicHistory.goBack();
        }
        
			 
    }])
   
.controller('mutuelleCtrl', ['$scope', '$stateParams', '$rootScope', '$http', '$state', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName


function ($scope, $stateParams, $rootScope,$http,$state, $ionicHistory ) {
  
   var itemname=$rootScope.currentItem;
    var url="http://www.allinone-benin.com/zbabaedjou/waifaa/api/users/memberships_item.php";
        
        console.log(itemname);
            $scope.title="";
			$scope.description="";
			$scope.price="";
			$rootScope.price="";
			
			// retreive data from the server and show them is the view
		$http.post(url, {title : itemname })
		.then(function (res){
			console.log(res.data);
			$scope.title=res.data.title;
			$scope.description=res.data.description;
			$scope.price=res.data.price;
			$rootScope.price=res.data.price;
        })
		.catch(function(err) { 
                $ionicPopup.alert({
                title:'Erreur',
                template:'Veuillez vérifier votre connexion internet svp.' })
                });
           
     $scope.goBack = function () {
			$ionicHistory.goBack();
			$scope.title="";
			$scope.description="";
			$scope.price="";
			$rootScope.price="";
        }
}])
   
.controller('paiementCtrl', ['$scope', '$stateParams', '$rootScope', '$http', '$state', '$ionicPopup', '$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $rootScope,$http, $state,$ionicPopup, $window ) {
    // This function should take thhe phone nummber, check if it exists then, if yes, it will send a mail to the admin to inform him that someone wants to subscribe
    var urli="http://www.allinone-benin.com/zbabaedjou/waifaa/api/users/check_phonenumber.php";
    $scope.showPopup = function() {
        $scope.data = {};
        $scope.price= $rootScope.price;
        $scope.title= $rootScope.currentItem;
		//console.log($scope.title);
        $scope.phone= window.localStorage.getItem("phone");
      // Custom popup. 
      var myPopup = $ionicPopup.show({
		  
         template: '<input type = "text" ng-model = "data.model" style= "color: black !important;">',
         title: 'Paiement',
         subTitle: 'Quelle méthode de paiement utilisez-vous. Entrez:\n \'MTN \' pour mobile monney. \n \'Moov \' pour moov monney  ',
         scope: $scope,
         buttons: [
            { text: 'Cancel',
                type: 'button-stable button-small button-outline home'}, {
               text: '<b>Payer</b>',
               type: 'button-balanced button-small button-outline home',
               onTap: function(e) {
						
                  if (!$scope.data.model) { // if the user doesn't enter anything
                     //don't allow the user to close unless he enters model...
                     e.preventDefault();
                     
                  } else if( $scope.data.model.toLowerCase() =="mtn" || $scope.data.model.toLowerCase() =="moov" ){ //if he enter "mtn" or "moov"
                      
                      
                    if(typeof window.localStorage.getItem("user") !== 'object'){ // if there is an active user
                                //console.log($scope.data.model);
                                //console.log($scope.title);
                                $http.post('http://www.allinone-benin.com/zbabaedjou/waifaa/api/users/sendmail.php', {mailTo : 'babaedjouziadath@gmail.com', msg: 'Bonjour\n Le client avec le numéro de téléphone '+$scope.phone+' voudrait s\'inscrire à la mutuelle '+$scope.title+'\n En attente  de confirmation par paiement sur '+$scope.data.model  })
                                .then(function successCallback(response) {
								//	console.log(response);
                                    if(response.data==="send"){
                                        $ionicPopup.alert({
                                        title:'Succès',
                                        template:'La requète à bien été envoyée. Veuillez svp effectuer le paiement pour validation' })
                                    }
                                    else{
                                        $ionicPopup.alert({
                                        title:'Echec',
                                        template:'Veuillez svp reprendre le processus.' }) 
                                    }
                                }, function errorCallback(response) {
                                        $ionicPopup.alert({
                                        title:'Echec',
                                        template:'Veuillez vérifier votre connexion internet svp.' })
                                        });
                                
                            }
                            else{ // if there is no active user
                                $state.go('menu.editerProfile',{},{location:"replace",reload:true});

                            }
                    
                    
                }
                
                else{//if the user entered a value different from mtn and moov
                    $ionicPopup.alert({
                        title:'Erreur',
                        template:'Veuillez svp entrer un réponse correcte.' })
                }
                  }
               }
            
         ]
      });  
   };
		

}])
   
.controller('profilCtrl', ['$scope', '$stateParams', '$http', '$window', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName


function ($scope, $stateParams, $http,$window, $ionicPopup) {
    
    var url="http://www.allinone-benin.com/zbabaedjou/waifaa/api/users/user_details.php";
		var userId=window.localStorage.getItem("user"); //get user id
		console.log(userId); 
        //initialize variable 
            $scope.nom="Vide";
			$scope.prenom="Vide";
			$scope.tel="Vide";
			$scope.email="Vide";
			$scope.address="Vide";
			$scope.state="Vide";
			$scope.country="Vide";
			
		$http.post(url, {id : userId }) // go to the url to retrieve user data
		.then(function (res){
			console.log(res.data);
			if(res.data.lname!=="")// if  last name is not empty
                $scope.nom=res.data.lname;
                
            if(res.data.fname!=="") // if  first name is not empty
                $scope.prenom=res.data.fname;
                
            if(res.data.username!=="") // if   username is not empty
                $scope.tel=res.data.username;
                
            if(res.data.email!=="") // if   email is not empty
                $scope.email=res.data.email;
                
            if(res.data.address!=="") // if address is not empty
                $scope.address=res.data.address;
                
            if(res.data.state!=="") // if  state is not empty
                $scope.state=res.data.state;
                
            if(res.data.country!=="") // if  country is not empty
                $scope.country=res.data.country;
        })
		.catch(function(err) { 
                $ionicPopup.alert({
                title:'Erreur',
                template:'Veuillez vérifier votre connexion internet svp.' })
                });
                
        $scope.edit=function(){ // open edit profile page
            $state.go('menu.editerProfile',{},{location:"replace",reload:true});

		};
		
		function escapeHtml(text) {
        return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
		}

}])
   
.controller('modifierProfileCtrl', ['$scope', '$stateParams', '$http', '$window', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName


function ($scope, $stateParams, $http, $window, $ionicPopup) {
    $scope.loginData={};
 		
        /*var fname=escapeHtml($scope.loginData.fname);
        var lname=escapeHtml($scope.loginData.lname);
        var phone=escapeHtml($scope.loginData.phone);
        var email=escapeHtml($scope.loginData.email);
        var adresse=escapeHtml($scope.loginData.address);
        var states=escapeHtml($scope.loginData.state);
        var countr=escapeHtml($scope.loginData.country);*/
		        
        var url="http://www.allinone-benin.com/zbabaedjou/waifaa/api/users/user_details.php";
		var userId=window.localStorage.getItem("user"); //get user id
 		console.log(userId);    
   //console.log("userId");
        //initialize variable 
            $scope.nom="";
			$scope.prenom="";
			$scope.tel="";
			$scope.email=""; 
			$scope.address="";
			$scope.state="";  
			$scope.country="";
			
		$http.post(url, {id : userId }) // go to the url to retrieve user data
		.then(function (res){
			console.log(res.data);
			if(res.data.lname!=="")// if  last name is not empty
                $scope.nom=res.data.lname;
                
            if(res.data.fname!=="") // if  first name is not empty
                $scope.prenom=res.data.fname;
                
            if(res.data.username!=="") // if   username is not empty
                $scope.tel=res.data.username;
                
            if(res.data.email!=="") // if   email is not empty
                $scope.email=res.data.email;
                
            if(res.data.address!=="") // if address is not empty
                $scope.address=res.data.address;
                
            if(res.data.state!=="") // if  state is not empty
                $scope.state=res.data.state;
                
            if(res.data.country!=="") // if  country is not empty
                $scope.country=res.data.country;
        })
		.catch(function(err) { 
                $ionicPopup.alert({
                title:'Erreur',
                template:'Veuillez vérifier votre connexion internet svp.' })
                });
                
        $scope.edit_profile=function(){ // open edit profile page

			var fname=$scope.loginData.fname;
			var lname=$scope.loginData.lname;
			var phone=$scope.loginData.phone;
			var email=$scope.loginData.email;
			var adresse=$scope.loginData.address;
			var state=$scope.loginData.state;
			var countr=$scope.loginData.country;
                var update_url="http://www.allinone-benin.com/zbabaedjou/waifaa/api/users/edit_profil.php";
			if(typeof lname=="undefined")// if  last name is not empty
                lname=$scope.nom;
                
            if(typeof fname=="undefined") // if  first name is not empty
                fname=$scope.prenom;
                
            if(typeof phone=="undefined") // if   username is not empty
                phone=$scope.tel;
                
            if( typeof email=="undefined") // if   email is not empty
                email=$scope.email;
                
            if(typeof adresse=="undefined") // if address is not empty
                adresse=$scope.address;
                
            if(typeof state=="undefined") // if  state is not empty
               state=$scope.state;
                
            if(typeof countr=="undefined") // if  country is not empty
                countr=$scope.country;
				
            $http.post(update_url, {fnames : fname, lnames : lname, phones : phone, emails : email, adresses : adresse, states : state, country : countr })
				.then(function (res){
                    if(res.data== "true"){// if update works perfectly, show popup 
                        
                        $ionicPopup.alert({
                            title:'Succès',
                            template:'Modification effectué avec succès.' }) 
                        $state.go('menu.profil',{},{location:"replace",reload:true});

                       
                    }
                    
                    else if(res.data== "false"){  //if phone number is already used, tell the user that the phone number is not available
                        $ionicPopup.alert({
                            title:'Echec',
                            template:'Veuiller svp réessayer.' }) 
                    }
                    
                   
                })
                
                .catch(function(err) { //if the http.post doesn't work, tell the user to check his connection
                    $ionicPopup.alert({
                        title:'Erreur',
                        template:'Veuillez vérifier votre connexion internet svp.' })
                    
                });
				

		};
	function escapeHtml(text) {
        return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
	}
}])
   
.controller('validationCtrl', ['$scope', '$stateParams', '$ionicPopup', '$http', '$timeout', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup, $http,$timeout,$state) {

   $scope.validation={};
 
		console.log(typeof window.localStorage.getItem("code"));
		console.log(window.localStorage.getItem("code"));
    if(typeof window.localStorage.getItem("code") != 'string'){ // generate and send code if not existe
        sendcode();
		
		$timeout(function(){window.localStorage.removeItem("code");}, 1440000);        

    }

	$scope.soumettre=function(){ // sublit form
		$scope.userCode=$scope.validation.code;
		// compare enter data to code.
		console.log("user");
		console.log($scope.userCode);
		console.log(window.localStorage.getItem("code"));
		///////compare code send by mail and the code entries by the user
	   if($scope.userCode===window.localStorage.getItem("code")){  //if codes match
				var userId=window.localStorage.getItem("user"); //get user id
				var url="http://www.allinone-benin.com/zbabaedjou/waifaa/api/users/activate_account.php";
   
				console.log(userId);
		
				//change acive status on the server
				$http.post(url, {id : userId })
				.then(function (res){
                    if(res.data== "true"){// if change works perfectly, show popup 
                        
                        $ionicPopup.alert({
							title:'Félicitation',
							template:'Votre compte a été activé avec succes' })
						$state.go('menu.dashboard',{},{location:"replace",reload:true});                       
                    }
                    
                    else if(res.data== "false"){  //change doesn't work 
                        $ionicPopup.alert({
                            title:'Echec',
                            template:'Veuiller svp réessayer.' }) 
                    }
                    
                   
                })
                
				
				
                .catch(function(err) { //if the http.post doesn't work, tell the user to check his connection
                    $ionicPopup.alert({
                        title:'Erreur',
                        template:'Veuillez vérifier votre connexion internet svp.' })
                    
                });
				
			
			
			

	   }
	   else{ //if codes don't match
			$ionicPopup.alert({
				title:'Echec',
				template:'Ce code n\'est pas valide veuillez svp réessayer' })
	   }
		  
		
	}
	function escapeHtml(text) {
			return text
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");
	}
	$scope.sendcodeAgain=function(){
		sendcode();
	}
	 function sendcode(){
		console.log("eya");
		var code= makeid();
		var email= window.localStorage.getItem("email");
		console.log(window.localStorage.getItem("email"));
		window.localStorage.setItem("code", code); 
		console.log(code);
		console.log(window.localStorage.getItem("code"));
		$http.post('http://www.allinone-benin.com/zbabaedjou/waifaa/api/users/sendmail.php', {mailTo : email, msg: 'Bonjour\n Votre code  est: '+ code+'\n Attention ce code expire dans 1 heure.' })
		.then(function successCallback(response) {
										console.log(response.data);
										if(response.data=="send"){
											$ionicPopup.alert({
											title:'Succès',
											template:'Code envoyé avec succès.' }) 
										}
									}, function errorCallback(response) {
											$ionicPopup.alert({
											title:'Echec',
											template:'Veuillez vérifier votre connexion internet svp.' })
											});
			return true;
		};


	////////Function to generate a random string
	function makeid(){
		var texte = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var date = new Date();

		for (var i = 0; i < 5; i++)
			texte += possible.charAt(Math.floor(Math.random() * possible.length));
			
		return texte;

	}


}])
   
.controller('motDePasseOubliCtrl', ['$scope', '$stateParams', '$ionicPopup', '$http', '$timeout', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup, $http,$timeout,$state) {

   $scope.passwords={};
 
	$scope.valider=function(){ // sublit form
		var phone=$scope.passwords.phone;
		var mail=$scope.passwords.email;
		// compare enter data to code.
		
		///////compare code send by mail and the code entries by the user
		var url="http://www.allinone-benin.com/zbabaedjou/waifaa/api/users/forget_password.php";
		var code= makeid();
		
				//change acive status on the server
				$http.post(url, {username : phone, email: mail, newpassword: code})
				.then(function (res){
                    if(res.data== "true"){// if change works perfectly, show popup 
                        $http.post('http://www.allinone-benin.com/zbabaedjou/waifaa/api/users/sendmail.php', {mailTo : mail, msg: 'Bonjour\n Votre mot de passe a été modifié sous votre demande. Le nouveau mot de passe est: '+ code+'\n Prière le modifié aussitot connecté.' })
						.then(function successCallback(response) {
										console.log(response.data);
										if(response.data=="send"){
											$ionicPopup.alert({
											title:'Succès',
											template:'Un mail vous à été envoyé.' }) 
										}
									}, function errorCallback(response) {
											$ionicPopup.alert({
											title:'Echec',
											template:'Veuillez vérifier votre connexion internet svp.' })
											});
		                        $ionicPopup.alert({
							title:'Félicitation',
							template:'Votre compte a été activé avec succes' })
						$state.go('menu.login',{},{location:"replace",reload:true});                       
                    }
                    
                    else if(res.data== "false"){  //change doesn't work 
                        $ionicPopup.alert({
                            title:'Echec',
                            template:'Veuiller svp réessayer.' }) 
                    }
					else if(res.data== "don't matched"){  //change doesn't work 
                        $ionicPopup.alert({
                            title:'Echec',
                            template:'Le numéro de téléphone et l\'email n\'appartiennent pas au même compte .' }) 
                    }
                    
                   
                })
                
				
				
                .catch(function(err) { //if the http.post doesn't work, tell the user to check his connection
                    $ionicPopup.alert({
                        title:'Erreur',
                        template:'Veuillez vérifier votre connexion internet svp.' })
                    
                });
				
			
		
	}
	function escapeHtml(text) {
			return text
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");
	}
	$scope.sendcodeAgain=function(){
		sendcode();
	}
	 
	////////Function to generate a random string
	function makeid(){
		var texte = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var date = new Date();

		for (var i = 0; i < 5; i++)
			texte += possible.charAt(Math.floor(Math.random() * possible.length));
			
		return texte;

	}


}])
 
