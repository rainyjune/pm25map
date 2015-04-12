<?php
$cname = $_GET["cname"];
$c = $_GET["c"];
if ( !$cname || !$c) {
  die(json_encode(array(
    "status" => 0,
    "info" => "Parameter missing"
  )));
}

$url = "http://webmap2.map.bdimg.com/?qt=aqi&cname=".$cname."&c=".$c;
$cacheLife = 3600; // Caching time, in seconds.
$cnameMd5 = md5($cname);
$cacheDir = "./data/cache/";
$cacheFile = $cacheDir.$cnameMd5.".json";
$filemtime = @filemtime($cacheFile);
if (file_exists($cacheFile) && (time() - $filemtime) < $cacheLife) {
  //echo "From cache:\n";
  echo file_get_contents($cacheFile);
} else {
  //echo "From remote:\n";
  $data = file_get_contents($url);
  $writeResult = file_put_contents($cacheFile, $data);
  if ($writeResult === FALSE) {
    die("Could not write into the file:".$cacheFile);
  } else {
    //echo "Write ok:\n";
    echo $data;
  }
}