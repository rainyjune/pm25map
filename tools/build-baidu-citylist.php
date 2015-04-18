<?php
$cityListArr = file("../data/BaiduMap_cityCode.txt");
$level1Cities = file("../data/level1.txt", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach($cityListArr as &$city) {
  $str = trim($city);
  $cityComponent = explode(" ", $str);
  $city = array(
    "code" => $cityComponent[0],
    "name" => $cityComponent[1],
    "level" => in_array($cityComponent[1], $level1Cities) ? 1 : 2
  );
}
usort($cityListArr, "cmp");
function cmp($a, $b)
{
    if ($a["level"] == $b["level"]) {
        return 0;
    }
    return ($a["level"] < $b["level"]) ? -1 : 1;
}

echo "<textarea style='width:100%;min-height: 500px;'>";
echo (json_encode($cityListArr, JSON_PRETTY_PRINT));
echo "</textarea>";