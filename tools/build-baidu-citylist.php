<?php
$cityListArr = file("../data/BaiduMap_cityCode.txt");

foreach($cityListArr as &$city) {
  //var_dump(explode(" ", trim($city)));
  
  $str = trim($city);
  $cityComponent = explode(" ", $str);
  $city = array(
    "code" => $cityComponent[0],
    "name" => $cityComponent[1]
  );
  
}

echo "<textarea style='width:100%;min-height: 500px;'>";
echo (json_encode($cityListArr, JSON_PRETTY_PRINT));
echo "</textarea>";