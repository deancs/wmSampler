/*
Controller for Winemate Classes (styles)

*/

var wmClassesMVC = angular.module('wmClassesMVC', ['ui','zippyModule'])
	.directive('contenteditable', function() {
	  return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
		  // view -> model
		  elm.bind('blur', function() {
			scope.$apply(function() {
			  ctrl.$setViewValue(elm.html());
			});
		  });

		  // model -> view
		  ctrl.$render = function(value) {
			elm.html(value);
		  };

		  // load init value from DOM
		  ctrl.$setViewValue(elm.html());
		}
	  };
	});


wmClassesMVC.controller( 'wmClassesCtrl', function wmClassesCtrl($scope, $http,$location, wmStylesStorage, filterFilter) {
  
	var wmStyles = $scope.wmStyles = angular.copy(wmStylesStorage.get());

	$scope.wmBorder = null;
	$scope.master= null;
	$scope.msg = '';
	$scope.myTemplate = "dialog.html";
	$scope.wmStyle = wmStyles[0].name;
	//$scope.msg = $scope.wmStyles[0].name;
	$scope.version = 'v2.3';
		$scope.title = 'Lorem Ipsum';
  	$scope.text = 'Neque porro quisquam est qui dolorem ipsum quia dolor...';



	$scope.$watch('wmStyles', function() {
		$scope.entryCount = wmStyles.length;
		$scope.newStyle = $scope.wmStyle;
		wmStylesStorage.put(wmStyles);
	  }, true);
	  
	$scope.update = function(user) {
		$scope.master= angular.copy(user);
	};

	$scope.reset = function() {
		$scope.user = angular.copy($scope.master);
	};

	$scope.fetch = function() {

		$scope.code = null;
		$scope.response = null;

		$http({method: 'GET', url: './data/wmClasses.json'}).
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
	 if ( !$scope.newStyle.length ) {
		  return;
		}

		wmStyles.push({
		  name: $scope.newStyle,
		  idx: $scope.newIdx
		});

		$scope.newStyle = '';
	};   
	 
	$scope.save = function() {

		wmStylesStorage.put(wmStyles);

	};

	$scope.load = function() {

		wmStyles = angular.copy(wmStylesStorage.get());

	};

	$scope.edit = function() {
	
			wmStyles.forEach(function(aStyle,idx) {
			if (aStyle.name === $scope.wmStyle) {
				wmStyles[idx].name = $scope.newStyle;
				wmStyles[idx].idx = $scope.newIdx;
				$scope.msg = 'edited:' + $scope.wmStyle;
			};
		});		
	};

	$scope.delete = function() {
		
		wmStyles.forEach(function(aStyle,idx) {
			if (aStyle.name === $scope.wmStyle) {
				wmStyles.splice(idx,1);
				$scope.msg = 'deleted:' + $scope.wmStyle;
			};
		});		
	};

	$scope.border = function() {
		if (!$scope.wmBorder) {
			$('.wmEditable').addClass('wmBorder');
			$scope.wmBorder = true;
		}
		else {
			$('.wmEditable').removeClass('wmBorder');
			$scope.wmBorder = false;
		}		
	};



});

angular.module('zippyModule', [])
  .directive('zippy', function(){
    return {
      restrict: 'C',
      // This HTML will replace the zippy directive.
      replace: true,
      transclude: true,
      scope: { title:'@zippyTitle' },
      templateUrl: 'zippyTemplate.html',
      // The linking function will add behavior to the template
      link: function(scope, element, attrs) {
            // Title element
        var title = angular.element(element.children()[0]),
            // Opened / closed state
            opened = true;
 
        // Clicking on title should open/close the zippy
        title.bind('click', toggle);
 
        // Toggle the closed/opened state
        function toggle() {
          opened = !opened;
          element.removeClass(opened ? 'closed' : 'opened');
          element.addClass(opened ? 'opened' : 'closed');
        }
 
        // initialize the zippy
        toggle();
      }
    }
  });

