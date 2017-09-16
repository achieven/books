app.controller("flowersCtrl", function($scope,$http, $window) {
	$scope.myInterval = 3000;

	$scope.updateList = function() {
     var myCarousel = document.getElementById("myCarousel");
      $http.get("flowersjson").then(function(response) {
      	$scope.flowers = response.data;
      		
      });
	  var currentType = $window.sessionStorage.type;
	  if (currentType == 'provider')
		 { 
		    $('<h2>הוספת פרח</h2>').appendTo('.addingFlower');
			$('<form id="uploadForm" enctype="multipart/form-data" action="http://127.0.0.1:8001/addFlower" method="post">  </form>').appendTo('.addingFlower');
		    $('<div class="form-group" ><label for="name">: שם</label><input type="text" class="form-control" id="name" name="name" style="width:40%;"></div>').appendTo('#uploadForm');
		  
		    $('<div class="form-group" > <label for="color">: צבע</label> <input type="text" class="form-control" id="color" name="color" style="width:30%; position:relative; left:10%;"> </div>').appendTo('#uploadForm');
		      
		    $('<div class="form-group" > <label for="price">: מחיר</label> <input type="text" class="form-control" id="price" name="price" style="width:20%;position:relative; left:20%;"> </div>').appendTo('#uploadForm');
			$('<input type="file" class="inputfile" id="inpFile" name="file"/> <p id="thefile"> </p> <button type="button" ng-click="choosingPic()" id="choosePic" class="btn btn-primary" > בחר תמונה</button> <br/> <br/>').appendTo('#uploadForm');
			$(' <input type="submit" id="add" class="btn btn-primary" value="הוסף" > </input>').appendTo('#uploadForm');	
		 }
		 else 
		 {     
		     
			// $('.itemsL').css({'left': "50%"});
		     $('#contai').css({'position' : 'relative', "left" : "30%" });
		 }
    }

    $scope.choosingPic = function() {
	    $(".inputfile").click();
		/* var txt = "";
		var x =  document.getElementById('inpFile');
		if ('files' in x) {
		if (x.files.length != 0) {
        
        for (var i = 0; i < x.files.length; i++) {
            var file = x.files[i];
            if ('name' in file) {
                txt += file.name;
				
            }
               }  
           }
         	document.getElementById("choosePic").innerHTML = txt;
         }
		 else
		 {
		    document.getElementById("choosePic").innerHTML = "בחר תמונה";
		 }
		 */
	}
});