window.onload = initAll;
function initAll() {
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
                "lat": thisLocation.lat * 100000,
                "lng": thisLocation.lng * 100000
              }
            };
          } else {
            console.warn("Error:", thisCity, i);
            citylistLocation[thisCity] = {
              "point": {
                "lat": 0,
                "lng": 0
              }
            };
          }
          if (f == citylist.length) {
            console.log(JSON.stringify(citylistLocation));
          }
        });
      })(i);
    }
    
  });
}
