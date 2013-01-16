'use strict';

/**
 * Services that persists and retrieves data from localStorage.
 *
 * Active keys
 * 
 * wmStyles (wmClasses)
   wmRegions
   wmVarieties
   wmClosures
   wmBottleSize
   wmTasters

   wmWines
   wmCellar
   wmTastings
 */

wmMain.factory( 'wmParamStorage', function() {

  return {
    get: function(key) {
      return JSON.parse(localStorage.getItem(key) );//|| '[]'
    },

    put: function(key,data) {
      localStorage.setItem(key, JSON.stringify(data));
    },

    drop: function(key) {
      localStorage.removeItem(key);
    }

  };
});


