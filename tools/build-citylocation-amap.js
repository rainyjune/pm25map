window.onload = initAll;
function initAll() {
  
  $.getJSON("../data/citylist.json", buildCityLocation);
  
  function buildCityLocation(citylist) {
    var citylistLocation = {};
    var f = 0;
    
    AMap.service(["AMap.Geocoder"], function() {
      var geocoder = new AMap.Geocoder();
      for(var i = 0; i < citylist.length; i++) {
        (function(i){
          var thisCity = citylist[i];
          geocoder.getLocation(thisCity, function(status, result){
            f++;
            if(status === 'complete' && result.info === 'OK'){
              var thisLocation = result.geocodes[0].location;
              citylistLocation[thisCity] = {
                "point": {
                  "y": thisLocation.lat * 100000,
                  "x": thisLocation.lng * 100000
                }
              };
            } else {
              console.warn("Error:", thisCity, i);
              citylistLocation[thisCity] = {
                "point": {
                  "y": 0,
                  "x": 0
                }
              };
            }
            if (f == citylist.length) {
              console.log();
              document.getElementById("container").value = JSON.stringify(citylistLocation);
            }
          });
        })(i);
      }
      
    });
  }
}
