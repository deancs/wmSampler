/*
Controller for Winemate Parameter Varieties

*/


var wmVarietiesCtrl = function wmVarietiesCtrl($scope, $http,$location, wmParamStorage,filterFilter) {

var wmPopupActionCancel = 0;
var wmPopupActionAdd = 1;
var wmPopupActionEdit = 2;
var wmPopupActionDelete = 3;
  
	$scope.wmVarieties = wmVarieties;

	$scope.$watch('wmVarieties', function() {
	    wmParamStorage.put('wmVarieties',wmVarieties);
	}, true);
	 

	$scope.openPopup = function() {
		$scope.popup=true;
		$scope.wmVarieties.wmNew = null;
		$scope.wmVarieties.wmNew = $scope.wmVarieties.wmCurrent;
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

	$scope.delete_variety = function(idx) {
		alert(idx);
	}
	
	//add variety to new Wine
	$scope.addVariety = function() {

		if (wmWines.wmNew.variety == null) {

			wmWines.wmNew.variety = [];
		}

		wmWines.wmNew.variety.push(null);

	}
	$scope.fetch = function() {

		$scope.code = null;
		$scope.response = null;

		$http({method: 'GET', url: './data/wmVarieties.json'}).
			  success(function(data, status) {
				$scope.status = status;
				$scope.wmVarieties = angular.copy(data);
				wmVarieties = $scope.wmVarieties;
			  }).
			  error(function(data, status) {
				$scope.data = data || "Request failed";
				$scope.status = status;
			});
	};

	$scope.add = function () {

	 if ( !wmVarieties.wmNew.text ) {
	 	  alert('Name Required');
		  return true;
		}


		//establish next available id
		tmp = 0;
		wmVarieties.data.forEach(function(aStyle,idx) {
			if (aStyle.id >= tmp) tmp = aStyle.id;
		});
		tmp++;


		wmVarieties.data.push({
		  id: tmp,
		  text: $scope.wmVarieties.wmNew.text,
		  idx: $scope.wmVarieties.wmNew.idx
		});

		$scope.newStyle = '';
		return false;
	};   
	 
	$scope.edit = function() {
	
		if ( !wmVarieties.wmNew.text ) {
	 	  alert('Name Required');
		  return true;
		}

		tmp = 0;
		wmVarieties.data.forEach(function(aStyle,idx,tmp) {
			if ((aStyle.text === wmVarieties.wmNew.text) && tmp) {
				wmVarieties.data[idx].text = wmVarieties.wmNew.text;
				wmVarieties.data[idx].idx = wmVarieties.wmNew.idx;
				$scope.msg = 'edit-done';
				tmp++;
			}
		});
		return false;
	};

	$scope.delete = function() {
		
		tmp = 0;
		wmVarieties.data.forEach(function(aStyle,idx,tmp) {
			if ((aStyle.text === wmVarieties.wmCurrent.text) && tmp) {
				wmVarieties.data.splice(idx,1);
				$scope.msg = 'delete-done';
				tmp++;
			};
		});		
	};
};


/* Scratchpad

	$scope.save = function() {

		wmParamStorage.put('wmVarieties',wmVarieties);

	};

	$scope.load = function() {

		wmVarieties = angular.copy(wmParamStorage.get('wmVarieties'));

	};



*/