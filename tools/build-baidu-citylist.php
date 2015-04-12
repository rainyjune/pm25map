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

echo "<textarea>";
echo (json_encode($cityListArr));
echo "</textarea>";