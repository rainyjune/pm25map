(function(factory){
  if (typeof define !== "undefined" && define.cmd) {
    define(function(require, exports, module){
      var $ = require('zepto');
      factory($);
    });
  } else {
    var $ = Zepto;
    factory($);
  }
}(function($){
  
  var mapObj = null,
      citylocation = null;
  
  loadScript();
  
  
  window.initMap = function(){
    mapObj = new AMap.Map("container", {
      view: new AMap.View2D({
        zoom: 4
      })
    });
    mapObj.plugin(["AMap.ToolBar"],function(){
      var toolBar = new AMap.ToolBar();
      mapObj.addControl(toolBar);		
    });
  };

  $.getJSON("citylocation.baidu.json", function(data){
    citylocation = data;
    $.getJSON("citylist.baidu.json", getAQI);
  });

  function getAQI(citylist){
    $.each(citylist, function(index, item) {
      (function(city){
        $.ajax({
          url: "aqi.php",
          data: {cname: city.name, c: city.code},
          dataType: "json",
          success: function(data) {
            //console.log("#", city.name, data);
            showCityAQI(city.name, data.current_city);
          },
          error: function(){
            debugger;
          }
        });
      })(item);
      
    });
  }
  
  function showCityAQI(cityShortName, aqiData) {
    var cityLoc = citylocation[cityShortName]["point"];
    /*
    var infoWindow = new AMap.InfoWindow({  
      content: aqiData.aqi  //使用默认信息窗体框样式，显示信息内容
    }); 
    var cityLoc = citylocation[cityShortName]["point"];
    console.log(cityShortName, aqiData.aqi, cityLoc);
    infoWindow.open(mapObj, new AMap.LngLat(cityLoc.x/100000, cityLoc.y/100000));
    */
    var marker = new AMap.Marker({				  
				icon:"http://webapi.amap.com/images/marker_sprite.png",
				position: new AMap.LngLat(cityLoc.x/100000, cityLoc.y/100000)
			});
			marker.setMap(mapObj);  //在地图上添加点
      
  }
  
  function loadScript(){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://webapi.amap.com/maps?v=1.3&key=b1fc6abe324303d61dbccbe745be09de&callback=initMap";
    document.body.appendChild(script);
  }

}));

