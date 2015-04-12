window.onload = initAll;
function initAll() {
  
  $.getJSON("../data/citylist.json", buildCityLocation);
  
  function buildCityLocation(citylist) {
    var citylistLocation = {};
    var f = 0;
    
    /* AMap Geocoder does not return correct location values for some cities. */
    var preDefinedLocation = {
      "台北市": {
        "lng": 121.519421,
        "lat": 25.036553,
      },
      "高雄市": {
        "lng": 120.283515,
        "lat": 22.638614
      }
    };
    
    AMap.service(["AMap.Geocoder"], function() {
      var geocoder = new AMap.Geocoder();
      for(var i = 0; i < citylist.length; i++) {
        (function(i){
          var thisCity = citylist[i];
          geocoder.getLocation(thisCity, function(status, result){
            f++;
            var predefinedThisCity = preDefinedLocation[thisCity];
            if(status === 'complete' && result.info === 'OK'){
              var thisLocation = predefinedThisCity ? predefinedThisCity : result.geocodes[0].location;
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
                  "y": predefinedThisCity ? predefinedThisCity.lat * 100000 : 0,
                  "x": predefinedThisCity ? predefinedThisCity.lng * 100000 : 0
                }
              };
            }
            if (f == citylist.length) {
              document.getElementById("container").value = JSON.stringify(citylistLocation);
            }
          });
        })(i);
      }
      
    });
  }
}
