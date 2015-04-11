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
  
  loadScript();
  
  window.initMap = function () {
    var mapObj = new AMap.Map("container", {
      view: new AMap.View2D({
        zoom: 4
      })
    });
    mapObj.plugin(["AMap.ToolBar"],function(){
      var toolBar = new AMap.ToolBar();
      mapObj.addControl(toolBar);		
    });
  };

  function loadScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://webapi.amap.com/maps?v=1.3&key=b1fc6abe324303d61dbccbe745be09de&callback=initMap";
    document.body.appendChild(script);
  }

}));

