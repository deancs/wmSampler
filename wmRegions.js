/*
Controller for Winemate Parameter Regions

*/


var wmRegionsCtrl = function wmRegionsCtrl($scope, $http,$location, wmParamStorage,filterFilter) {

$scope.wmPopupActionCancel = 0;
var wmPopupActionCancel = 0;
var wmPopupActionAdd = 1;
var wmPopupActionEdit = 2;
var wmPopupActionDelete = 3;
  
	$scope.wmRegions = wmRegions;

	$scope.$watch('wmRegions', function() {
	    wmParamStorage.put('wmRegions',wmRegions);
	}, true);
	 

	$scope.openPopup = function() {
		$scope.popup=true;
		$scope.wmRegions.wmNew = null;
		$scope.wmRegions.wmNew = $scope.wmRegions.wmCurrent;
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

		$http({method: 'GET', url: './data/wmRegions.json'}).
			  success(function(data, status) {
				$scope.status = status;
				$scope.wmRegions = angular.copy(data);
				wmRegions = $scope.wmRegions;
			  }).
			  error(function(data, status) {
				$scope.data = data || "Request failed";
				$scope.status = status;
			});
	};

	$scope.add = function () {

	 if ( !wmRegions.wmNew.text ) {
	 	  alert('Name Required');
		  return true;
		}


		//establish next available id
		tmp = 0;
		wmRegions.data.forEach(function(aStyle,idx) {
			if (aStyle.id >= tmp) tmp = aStyle.id;
		});
		tmp++;


		wmRegions.data.push({
		  id: tmp,
		  text: $scope.wmRegions.wmNew.text,
		  idx: $scope.wmRegions.wmNew.idx
		});

		$scope.newStyle = '';
		return false;
	};   
	 
	$scope.edit = function() {
	
		if ( !wmRegions.wmNew.text ) {
	 	  alert('Name Required');
		  return true;
		}

		tmp = 0;
		wmRegions.data.forEach(function(aStyle,idx,tmp) {
			if ((aStyle.text === wmRegions.wmNew.text) && tmp) {
				wmRegions.data[idx].text = wmRegions.wmNew.text;
				wmRegions.data[idx].idx = wmRegions.wmNew.idx;
				$scope.msg = 'edit-done';
				tmp++;
			}
		});
		return false;
	};

	$scope.delete = function() {
		
		tmp = 0;
		wmRegions.data.forEach(function(aStyle,idx,tmp) {
			if ((aStyle.text === wmRegions.wmCurrent.text) && tmp) {
				wmRegions.data.splice(idx,1);
				$scope.msg = 'delete-done';
				tmp++;
			};
		});		
	};
};


/* Scratchpad

	$scope.save = function() {

		wmParamStorage.put('wmRegions',wmRegions);

	};

	$scope.load = function() {

		wmRegions = angular.copy(wmParamStorage.get('wmRegions'));

	};



*/