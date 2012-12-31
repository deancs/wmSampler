'use strict';

/**
 * Services that persists and retrieves data from localStorage.
 */
wmClassesMVC.factory( 'wmStylesStorage', function() {
  var STORAGE_ID = 'wmStyles-';

  return {
    get: function() {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    },

    put: function( wmStyle ) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(wmStyle));
    }
  };
});
