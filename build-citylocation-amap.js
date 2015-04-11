window.onload = initAll;
function initAll() {
  var citylistLocation = new Array(citylist.length);
  var f = 0;
  
  AMap.service(["AMap.Geocoder"], function() {
    var geocoder = new AMap.Geocoder();
    for(var i = 0; i < citylist.length; i++) {
      (function(i){
        geocoder.getLocation(citylist[i], function(status, result){
          f++;
          if(status === 'complete' && result.info === 'OK'){
            var thisLocation = result.geocodes[0].location;
            citylistLocation[i] = {
              "lat": thisLocation.lat,
              "lng": thisLocation.lng
            };
          } else {
            console.warn("Error:", citylist[i], i);
            citylistLocation[i] = {
              "lat": 0,
              "lng": 0
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
