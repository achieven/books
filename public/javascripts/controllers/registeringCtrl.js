app.controller("registeringCtrl", function($scope, $http, $window) {
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


	 $scope.choosingPic = function() {
	    $(".inputfile").click();
	 };

	 $scope.displayName = function(input) {
	 	  filename = input.value;
	 	  if(input.value =="") 
	 	  	  $(".thefile").text("אין קובץ נבחר");
	 	  else {
		  	  filename = filename.substring(filename.lastIndexOf('\\')+1); // Windows path
		  	  filename = filename.substring(filename.lastIndexOf('/')+1); // Linux path
		      $(".thefile").text(filename);
		  }
	 };
	 

	 $scope.addUser = function () {
		var data = {
            name: $scope.name,
            username: $scope.username,
            type: "תלמיד",
            password: $scope.password,
            picture: $scope.picture
        };
		$http.post("addUser", data).then(
		function(response){
			$window.location = '/';
	  	},
	  	function(response){
	     	alert('! לא מלאת נכון ,אולי הוספת רווח');
	    });
	};
			
});