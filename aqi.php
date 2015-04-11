<?php
$cname = $_GET["cname"];
$c = $_GET["c"];
$url = "http://webmap2.map.bdimg.com/?qt=aqi&cname=".$cname."&c=".$c;
//var_dump($url);exit;
echo file_get_contents($url);