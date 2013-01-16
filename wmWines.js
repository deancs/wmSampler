/*
Controller for Winemate Wines

*/
//var currentWine;
var wmWinesCtrl = function wmWinesCtrl($scope, $http,$location, wmParamStorage,filterFilter) {

$scope.wmPopupActionCancel = 0;
//var wmPopupActionCancel = 0;
//var wmPopupActionAdd = 1;
//var wmPopupActionEdit = 2;
//var wmPopupActionDelete = 3;
  
	$scope.wmWines = wmWines;
	$scope.tmpCnt = 0;
	$scope.tmpStatus = 0;

 	//initalise wmWine if null, required on first launch

	if (wmWines.data!=null) {
    	wmWines.wmCurrent = angular.copy(wmWines.data[0]);
    }

	$scope.$watch('wmWines', function() {
	    wmParamStorage.put('wmWines',wmWines);
	}, true);

	//wine list item was selected
    $scope.itemSelected = function(id) {
      var i = wmGetObjectIndexById(wmWines.data,id)
      wmWines.wmCurrent = angular.copy(wmWines.data[i]);
    }

	$scope.btnNew = function() {
		wmWines.wmNew = null;
		wmSwitchView('#tabAddWine')
	}

	$scope.btnEdit = function() {
		wmWines.wmNew = wmWines.wmCurrent;
		wmSwitchView('#tabAddWine')		
	}

	$scope.btnCancel = function(){
		wmSwitchView('#tabViewWine')
	}

	$scope.btnReset = function() {
    	wmWines.wmNew = null;
    }

    $scope.btnDelete = function(id) {
    	$scope.delete(id);
    }

	$scope.btnDone = function() {

		//if id is set then update current wine, otherwise add-new
		if (wmWines.wmNew.id) {
      		var i = wmGetObjectIndexById(wmWines.data,wmWines.wmNew.id)
      		wmWines.data[i] = angular.copy(wmWines.wmNew);
      	} else {
			$scope.add();
      	}
		wmSwitchView('#tabViewWine')
	}
	

	$scope.fetch = function() {

		$scope.code = null;
		$scope.response = null;

		$http({method: 'GET', url: '/data/wmWines.json'}).
			  success(function(data, status) {
				$scope.status = status;
				$scope.wmWines = angular.copy(data);
				wmWines = $scope.wmWines;
			  }).
			  error(function(data, status) {
			  	alert('err');
				$scope.data = data || "Request failed";
				$scope.status = status;
			});
	};

	$scope.add = function () {

	 if ( !wmWines.wmNew.title ) {
	 	  alert('Name Required');
		  return true;
		}


		//establish next available id
		tmp = 0;
		if (wmWines.data!=null) {
			wmWines.data.forEach(function(aStyle,idx) {
				if (aStyle.id >= tmp) tmp = aStyle.id;
			});
		}
		tmp++;

		wmWines.wmNew.id = tmp;
		wmWines.data.push(wmWines.wmNew);

		return false;
	};   
	 
	$scope.drop = function() {
		$scope.initalise();
		$scope.wmWines = wmWines;
		wmParamStorage.drop('wmWines')
	}

	$scope.delete = function(id) {		
		var i = wmGetObjectIndexById(wmWines.data,id)
		wmWines.data.splice(i,1);
	};

	$scope.initalise = function() {
		wmWines={};
		wmWines.wmNew={};
		wmWines.wmCurrent={};
		wmWines.data=[];
	}

	$scope.generateWines = function(cnt) {

		var maxVarieties = wmVarieties.data.length;
		var maxStyles = wmStyles.data.length;
		var maxWineries = wmWineries.data.length;

		for (i=0;i<cnt;i++) {

			wmWines.wmNew = {};

			wmWines.wmNew.title = 'Wine '+i;

			wmWines.wmNew.style = wmStyles.data[Math.floor(Math.random() * maxStyles) + 1];
			wmWines.wmNew.winery = wmWineries.data[Math.floor(Math.random() * maxWineries) + 1];
			wmWines.wmNew.variety = wmVarieties.data[Math.floor(Math.random() * maxVarieties) + 1];

			$scope.add();
		}
		$scope.tmpStatus = 'complete.';

	}
};
