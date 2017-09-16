app.controller("communicationCtrl", function($scope) {

	$scope.send_message = function()
	{
		if($scope.name == "" || $scope.mail == "" || $scope.message == "" )
		     { alert('תמלא את כל השדות ! '); }
	    else 
		{
			var data = { name: $scope.name,
					mail: $scope.mail,
					message: $scope.message};
        	$http.post("connection", data).then(function(response) {
				alert('! הודעה שלך נשלחה'); 
			 });
		}	
	};

});