app.controller("usersCtrl", function($scope, $http, $window) {
	$scope.updateList = function () {
		var username = $window.sessionStorage.user;
	    var list = document.getElementById("list");
	    list.innerHTML = '<caption > רשימת המשתמשים</caption><tr id ="titles"><th>שם</th><th>שם משתמש</th><th>סוג</th></tr>';
	    $http.get("usersjson").then(function(response)  {
	        var users = response.data;
			var currentType = $window.sessionStorage.type;
		  	if (currentType == 'director')
	  		{
				var tr_titles = document.getElementById("titles");
				var td_pwd = document.createElement('td');
			    tr_titles.appendChild(td_pwd);
			    var tit_tdText = document.createTextNode("סיסמה");
			    td_pwd.appendChild(tit_tdText);
				var td_firm = document.createElement('td');
			    tr_titles.appendChild(td_firm);
			    tit_tdText = document.createTextNode("מזהה סניף");
			    td_firm.appendChild(tit_tdText);
				var actionsPanel = document.getElementById("actions");
				var butDel = $('<button type="button" ng-click="delUser()" id="del"  class="btn btn-danger"> מחק</button>');
				butDel.appendTo(actionsPanel);
				var butModif = $('<button type="button" ng-click="modUser()" id="mod" class="btn btn-warning"> עדכן</button>');
				butModif.appendTo(actionsPanel);
	  		}
      		users.forEach(function(user, index) {
		        if (currentType == 'director')
				{
				    var tr = document.createElement('tr');
	                tr.setAttribute("data-index", "" + index);
	                list.appendChild(tr);
				    var td = document.createElement('td');
				    tr.appendChild(td);
				    var tdText = document.createTextNode(user.name);
				    td.appendChild(tdText);
				    var td1 = document.createElement('td');
				    tr.appendChild(td1);
				    tdText = document.createTextNode(user.username);
				    td1.appendChild(tdText);
					var td3= document.createElement('td');
					tr.appendChild(td3);
					var tdText = document.createTextNode(user.type);
					td3.appendChild(tdText);
					var td2= document.createElement('td');
					tr.appendChild(td2);
					var tdText = document.createTextNode(user.password);
					td2.appendChild(tdText);
					var td4= document.createElement('td');
					tr.appendChild(td4);
					var tdText = document.createTextNode(user.firmId);
					td4.appendChild(tdText);
			    }
				else  // currentType == employee
				{
				   	if (user.type == 'client')
				   	{
					   	var tr = document.createElement('tr');
		                tr.setAttribute("data-index", "" + index);
		                list.appendChild(tr);
					    var td = document.createElement('td');
					    tr.appendChild(td);
					    var tdText = document.createTextNode(user.name);
					    td.appendChild(tdText);
					    var td1 = document.createElement('td');
					    tr.appendChild(td1);
					    tdText = document.createTextNode(user.username);
					    td1.appendChild(tdText);
						var td3= document.createElement('td');
						tr.appendChild(td3);
						var tdText = document.createTextNode(user.type);
						td3.appendChild(tdText);
				   	}		
				}
	        });
		  
	    });
	};

	$scope.addUser = function () {
		var data = {
            usr: $scope.usr,
            usrname: $scope.usrname,
            type: $scope.type,
            password: $scope.password,
            firmId: $scope.firmId
        };
		$http.post("addUser", data).then(
		function(response){
	    	$scope.updateList();
	  	},
	  	function(response){
	     	alert('! לא מלאת נכון ,אולי הוספת רווח');
	    });
	};

	$scope.delUser = function(){
		var data = {
            usr: $scope.usr,
            usrname: $scope.usrname,
            type: $scope.type,
            password: $scope.password,
            firmId: $scope.firmId
        };
		$http.post("delUser", data).then(
		function(response){
	    	$scope.updateList();
	  	},
	  	function(response){
	     	alert('! לא מלאת נכון ,אולי הוספת רווח');
	    });
	}

	$scope.modUser = function()
	{
		var data = {
            usr: $scope.usr,
            usrname: $scope.usrname,
            type: $scope.type,
            password: $scope.password,
            firmId: $scope.firmId
        };
		$http.post("modUser", data).then(
		function(response){
	    	$scope.updateList();
	  	},
	  	function(response){
	     	alert('! לא מלאת נכון ,אולי הוספת רווח');
	    });
	}
});
