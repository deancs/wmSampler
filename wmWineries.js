/*
Controller for Winemate Parameter Wineries

*/


var wmWineriesCtrl = function wmWineriesCtrl($scope, $http,$location, wmParamStorage,filterFilter) {

$scope.wmPopupActionCancel = 0;
var wmPopupActionCancel = 0;
var wmPopupActionAdd = 1;
var wmPopupActionEdit = 2;
var wmPopupActionDelete = 3;
  
	$scope.wmWineries = wmWineries;

	$scope.$watch('wmWineries', function() {
	    wmParamStorage.put('wmWineries',wmWineries);
	}, true);
	 

	$scope.openPopup = function() {
		$scope.popup=true;
		$scope.wmWineries.wmNew = null;
		$scope.wmWineries.wmNew = $scope.wmWineries.wmCurrent;
	} 

	$scope.closePopup = function(wmAction) {

		switch(wmAction)
			{
			case wmPopupActionAdd:
				if (!$scope.add()) $scope.popup=false;
			  	break;

			case wmPopupActionEdit:
				if (!$scope.edit()) $scope.popup=false;				
			  	break;

			case wmPopupActionDelete:
				$scope.delete();
				$scope.popup=false;				
			  break;
			case wmPopupActionCancel:
				$scope.popup=false;

			  break;

			}

	}

	$scope.fetch = function() {

		$scope.code = null;
		$scope.response = null;

		$http({method: 'GET', url: './data/wmWineries.json'}).
			  success(function(data, status) {
				$scope.status = status;
				$scope.wmWineries = angular.copy(data);
				wmWineries = $scope.wmWineries;
			  }).
			  error(function(data, status) {
				$scope.data = data || "Request failed";
				$scope.status = status;
			});
	};

	$scope.add = function () {
	 if ( !wmWineries.wmNew.text ) {
	 	  alert('Name Required');
		  return true;
		}


		//establish next available id
		tmp = 0;
		wmWineries.data.forEach(function(aStyle,idx) {
			if (aStyle.id >= tmp) tmp = aStyle.id;
		});
		tmp++;


		wmWineries.data.push({
		  id: tmp,
		  text: $scope.wmWineries.wmNew.text,
		  idx: $scope.wmWineries.wmNew.idx
		});

		$scope.newStyle = '';
		return false;
	};   
	 
	$scope.edit = function() {
	
		if ( !wmWineries.wmNew.text ) {
	 	  alert('Name Required');
		  return true;
		}

		tmp = 0;
		wmWineries.data.forEach(function(aStyle,idx,tmp) {
			if ((aStyle.text === wmWineries.wmNew.text) && tmp) {
				wmWineries.data[idx].text = wmWineries.wmNew.text;
				wmWineries.data[idx].idx = wmWineries.wmNew.idx;
				$scope.msg = 'edit-done';
				tmp++;
			}
		});
		return false;
	};

	$scope.delete = function() {
		
		tmp = 0;
		wmWineries.data.forEach(function(aStyle,idx,tmp) {
			if ((aStyle.text === wmWineries.wmCurrent.text) && tmp) {
				wmWineries.data.splice(idx,1);
				$scope.msg = 'delete-done';
				tmp++;
			};
		});		
	};
};


/* Scratchpad

	$scope.save = function() {

		wmParamStorage.put('wmWineries',wmWineries);

	};

	$scope.load = function() {

		wmWineries = angular.copy(wmParamStorage.get('wmWineries'));

	};



*/