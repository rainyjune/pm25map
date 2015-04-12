<?php
$url = "http://datacenter.mep.gov.cn/report/air_daily/airCityMain.jsp";
$str = file_get_contents_utf8($url);
$matchResult = preg_match_all("/<a\s+href=\"http:\/\/datacenter\.mep\.gov\.cn.+\s+class=\"link\"\s+onmouseover=\".+\"\s+onmouseout=\".+\">(.+)<\/a>/", $str, $matches);
if ($matchResult === FALSE) {
  die("Something went wrong!");
} else {
  $specialCitys = array("香港特别行政区", "澳门特别行政区", "台北市", "高雄市");
  //echo $matchResult;
  $resultArr = array_merge($matches[1], $specialCitys);
  file_put_contents("../data/citylist.json", json_encode($resultArr));
}

function file_get_contents_utf8($fn) {
     $opts = array( 
         'http' => array( 
             'method'=>"GET", 
             'header'=>"Content-Type: text/html; charset=gb18030" 
         ) 
     ); 

     $context = stream_context_create($opts); 
     $result = @file_get_contents($fn,false,$context); 
     return mb_convert_encoding($result, "UTF-8", "GB18030"); 
 } 
