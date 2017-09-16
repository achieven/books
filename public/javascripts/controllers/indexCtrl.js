app.controller("indexCtrl", function($scope, $http, $window) {
	$scope.initialisation = function() {
		
	    if(!$window.sessionStorage.user) {
	    	$scope.butlogin = 'להתחבר';
			$scope.IsLogin = true;
	    }
        else
        {
        	$scope.butlogin = "להתנתק";
	        $scope.username = $window.sessionStorage.user;
			$scope.type = $window.sessionStorage.type;
			$scope.IsLogin = false;
        }
	};


	$scope.login_f = function() {
		var data = {
            user: $scope.username,
            pwd: $scope.password
        };
		$http.post("connection",data).then(
	       	function(response){
				debugger;
	       		if(response.data.authsuccess) {
	         		$scope.name = response.data.name;
	         		$scope.type = response.data.type;
	         		$window.sessionStorage.user = response.data.username;
					$window.sessionStorage._id = response.data._id;
					$window.sessionStorage.type = $scope.type;
					$scope.butlogin = "להתנתק";
					$scope.IsLogin = false;
					angular.element(document.querySelector('#butClose')).click();
					$window.location.reload();
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
			  $window.sessionStorage.removeItem('user');
			  $window.sessionStorage.removeItem('type');
			  $scope.username=null;
			  $scope.name=null;
			  $scope.type=null;
			  $scope.butlogin = "להתחבר";
			  $window.location.reload();
         }
	 }

});