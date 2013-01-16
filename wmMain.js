/*
Master/Root Controller for Winemate 

*/

var wmMain = angular.module('wmMain', ['ui','zippyModule','contentEditableModule'])
var wmStyles;
var wmWineries;
var wmVarieties;
var wmRegions;
var wmWines;
var wmPopupActionCancel = 0;
var wmPopupActionAdd = 1;
var wmPopupActionEdit = 2;
var wmPopupActionDelete = 3;
var myList = {"data":[]};
var myScroll;

wmMain.controller( 'wmMainCtrl', function wmMainCtrl($scope, $http,$location, wmParamStorage, filterFilter) {
  
  $scope.version = 'v2.4';
  $scope.wmDatasetVersion = '1';

  //load parameter data
  $scope.wmStyles = wmStyles = angular.copy(wmParamStorage.get('wmStyles'));
  $scope.wmWineries = wmWineries = angular.copy(wmParamStorage.get('wmWineries'));
  $scope.wmVarieties = wmVarieties = angular.copy(wmParamStorage.get('wmVarieties'));
  $scope.wmRegions = wmRegions = angular.copy(wmParamStorage.get('wmRegions'));


  $scope.wmWines = wmWines = angular.copy(wmParamStorage.get('wmWines'));

  $scope.myList = myList;

  if (wmWines==null){
    wmWines={};
    wmWines.wmNew={};
    wmWines.wmCurrent={};
    wmWines.data=[];
  }

    
    if (wmStyles==null) {
      alert('Parameter data is invalid. Goto Dashboard and reload');
    }

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

angular.module('contentEditableModule', [])
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


function wmGetObjectIndexById(ObjArr,requiredID) {
  for(var i=0;i<ObjArr.length;i++) {
    if (ObjArr[i].id==requiredID) {
      return i;
    }    
  }
  return null;
};

function wmSwitchView(tabName) {
      $('#navTabs a[href="'+tabName+'"]').tab('show');  
}
