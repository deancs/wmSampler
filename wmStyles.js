/*
Controller for Winemate Classes (styles)

*/
//$("#st1").on("change", function(e) { alert(e.val); })
//$("#st1").select2('val',{'text':'Red','id':1});


var wmStyleCtrl = function wmClassesCtrl($scope, $http,$location, wmParamStorage,filterFilter) {

$scope.wmPopupActionCancel = 0;
var wmPopupActionCancel = 0;
var wmPopupActionAdd = 1;
var wmPopupActionEdit = 2;
var wmPopupActionDelete = 3;
  
	$scope.wmStyles = wmStyles;

	$scope.$watch('wmStyles', function() {
	    wmParamStorage.put('wmStyles',wmStyles);
	}, true);
	

	$scope.openPopup = function() {
		$scope.popup=true;
		$scope.wmStyles.wmNew = null;
		$scope.wmStyles.wmNew = $scope.wmStyles.wmCurrent;
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

		$http({method: 'GET', url: './data/wmStyles.json'}).
			  success(function(data, status) {
				$scope.status = status;
				$scope.wmStyles = angular.copy(data);
				wmStyles = $scope.wmStyles;
			  }).
			  error(function(data, status) {
				$scope.data = data || "Request failed";
				$scope.status = status;
			});
	};

	$scope.add = function () {

	 if ( !wmStyles.wmNew.text ) {
	 	  alert('Name Required');
		  return true;
		}


		//establish next available id
		tmp = 0;
		wmStyles.data.forEach(function(aStyle,idx) {
			if (aStyle.id >= tmp) tmp = aStyle.id;
		});
		tmp++;


		wmStyles.data.push({
		  id: tmp,
		  text: $scope.wmStyles.wmNew.text,
		  idx: $scope.wmStyles.wmNew.idx
		});

		$scope.newStyle = '';
		return false;
	};   
	 
	$scope.edit = function() {
	
		if ( !wmStyles.wmNew.text ) {
	 	  alert('Name Required');
		  return true;
		}

		tmp = 0;
		wmStyles.data.forEach(function(aStyle,idx,tmp) {
			if ((aStyle.text === wmStyles.wmNew.text) && tmp) {
				wmStyles.data[idx].text = wmStyles.wmNew.text;
				wmStyles.data[idx].idx = wmStyles.wmNew.idx;
				$scope.msg = 'edit-done';
				tmp++;
			}
		});
		return false;
	};

	$scope.delete = function() {
		
		tmp = 0;
		wmStyles.data.forEach(function(aStyle,idx,tmp) {
			if ((aStyle.text === wmStyles.wmCurrent.text) && tmp) {
				wmStyles.data.splice(idx,1);
				$scope.msg = 'delete-done';
				tmp++;
			};
		});		
	};
};


/* Scratchpad

	$scope.save = function() {

		wmParamStorage.put('wmStyles',wmStyles);

	};

	$scope.load = function() {

		wmStyles = angular.copy(wmParamStorage.get('wmStyles'));

	};



*/