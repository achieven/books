app.controller("aboutCtrl", function($scope, $http, $window) {
	$scope.initialisation = function() {
		
	    if($window.sessionStorage.user=="undefined") {
	    	$scope.butlogin = 'להתחבר';
	    }
        else
        {
        	$scope.butlogin = "להתנתק";
	        $scope.username = $window.sessionStorage.user;
			$scope.type = $window.sessionStorage.type;
        }
	};


	$scope.login_f = function() {
	        var data = {
            user: $scope.username,
            pwd: $scope.password
        };
		$http.post("connection",data).then(
	       	function(response){
	       		if(response.data.authsuccess) {
	         		$scope.name = response.data.name;
	         		$scope.type = response.data.type;
	         		$scope.butlogin = "להתנתק";
	         		$window.sessionStorage.user = $scope.user;
	       			$window.sessionStorage.type = $scope.type;
	         		angular.element(document.querySelector('#butClose')).triggerHandler('click');

	         		
	         	}
	         	else {
	         		alert('טעיתם בהכנסת פרטי המשתמש !')
	         	}
	       	}, 
	       	function(response){
	         	alert('טעיתם בהכנסת פרטי המשתמש !')
	       	}
    	);
	};
	
	$scope.login_out = function() {
	      if($window.sessionStorage.user != 'undefined') //login out
	      { 
	      	$window.sessionStorage.removeItem(user);
	      	$window.sessionStorage.removeItem(type);
	       	$scope.username=null;
	       	$scope.name=null;
	       	$scope.type=null;
		   	$scope.butlogin = "להתחבר";
         }
	 }
			
});