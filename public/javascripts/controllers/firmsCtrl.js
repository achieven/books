app.controller("firmsCtrl", function($scope, $http) {
  $scope.updateList = function(){
      var list = document.getElementById("list");
      list.innerHTML = "<caption> רשימת סניפים פעילים</caption><tr><th>מספר מזהה</th><th>כתובת</th><th>עיר</th></tr>"; 
      $http.get("firmsjson").then(function(response) {
      	firms=response.data;
      	firms.forEach(function(firm, index) {
		  	if(firm.activity == 'yes')
            { 
            	var tr = document.createElement('tr');
	            tr.setAttribute("data-index", "" + index);
	            list.appendChild(tr);
				var td = document.createElement('td');
				tr.appendChild(td);
				var tdText = document.createTextNode(firm.id);
				td.appendChild(tdText);
				var td1 = document.createElement('td');
				tr.appendChild(td1);
				var tdText = document.createTextNode(firm.address);
				td1.appendChild(tdText);
				var td2 = document.createElement('td');
				tr.appendChild(td2);
				var tdText = document.createTextNode(firm.city);
				td2.appendChild(tdText);
			}
        });
    });
  }
});